/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';

import {
  Header,
  GlobalStyles,
  Loader,
  Footer,
  ContactUsModal,
} from '@worldresources/gfw-components';

import { isProAuthenticated, proLogout } from 'utils/pro-checks';
import { useTrackPage } from 'utils/analytics';
import { LangProvider, getAPILangCode } from 'utils/lang';
import { appBasePath } from 'utils/path-resolver';
import { navMain } from 'utils/nav';

import ErrorPage from 'layouts/error';
import HelpFooter from 'components/footer';
import PreviewBanner from 'components/preview-banner';
import ProLogin from 'components/pro-login';

const isOsanoEnabled = process.env.NEXT_PUBLIC_OSANO_ENABLED === 'true';

const renderPage = (
  isError,
  statusCode,
  children,
  setOpen,
  preview,
  proAuthenticated,
  proVerificationRequired,
  proLoginRequired,
  lang
) => {
  if (proLoginRequired && (!proAuthenticated || proVerificationRequired)) {
    return (
      <PageWrapper>
        <ProLogin verificationRequired={proVerificationRequired} />
      </PageWrapper>
    );
  }

  return (
    <>
      {isError ? (
        <PageWrapper>
          <ErrorPage statusCode={statusCode || 404} />
        </PageWrapper>
      ) : (
        <PageWrapper>
          {preview && <PreviewBanner />}
          <LangProvider value={lang}>{children}</LangProvider>
          <HelpFooterWrapper>
            <HelpFooter openContactUsModal={() => setOpen(true)} />
          </HelpFooterWrapper>
        </PageWrapper>
      )}
    </>
  );
};
export default function Layout({
  children,
  metaTags,
  isError,
  proLoginRequired,
  statusCode,
  preview,
  noIndex,
  page,
  notifications = [],
}) {
  const [open, setOpen] = useState(false);
  const [proAuth, setProAuth] = useState(null);

  const [language, setLanguage] = useState('en');
  const router = useRouter();

  const currentLanguageRef = useRef(null);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    // DOM error prevention
    const originalRemoveChild = Node.prototype.removeChild;
    // eslint-disable-next-line func-names
    Node.prototype.removeChild = function (child) {
      try {
        // eslint-disable-next-line react/no-this-in-sfc
        if (this.contains && this.contains(child)) {
          return originalRemoveChild.call(this, child);
        }
        return child;
      } catch (error) {
        console.warn('Prevented removeChild error:', error.message);
        return child;
      }
    };

    // Check if we're in a translated state
    const isTranslated = () => {
      const storedLang = localStorage.getItem('transifex_current_language');
      return storedLang && storedLang !== 'en' && storedLang !== null;
    };

    // Handle navigation - force reload if translated
    const handleRouteChangeStart = (url) => {
      if (isNavigatingRef.current) return; // Prevent infinite loops

      if (isTranslated()) {
        isNavigatingRef.current = true;
        router.events.off('routeChangeStart', handleRouteChangeStart); // Remove listener temporarily

        // Force full page reload
        window.location.href = url;
        // eslint-disable-next-line no-throw-literal
        throw 'Route change aborted'; // Prevent Next.js navigation
      }
    };

    // Track current language
    const updateCurrentLanguage = () => {
      if (
        typeof window !== 'undefined' &&
        window.Transifex &&
        window.Transifex.live
      ) {
        try {
          const currentLang = window.Transifex.live.getSelectedLanguageCode();
          if (currentLang) {
            currentLanguageRef.current = currentLang;
            localStorage.setItem('transifex_current_language', currentLang);
          }
        } catch (e) {
          console.warn('Error getting current language:', e);
        }
      }
    };

    // Set up Transifex language change detection
    const setupLanguageDetection = () => {
      if (
        typeof window !== 'undefined' &&
        window.Transifex &&
        window.Transifex.live
      ) {
        try {
          // Override setLocale to track language changes
          if (window.Transifex.live.setLocale) {
            const originalSetLocale = window.Transifex.live.setLocale;
            window.Transifex.live.setLocale = function (locale) {
              console.log('Language changed to:', locale);
              localStorage.setItem('transifex_current_language', locale);
              currentLanguageRef.current = locale;
              return originalSetLocale.call(this, locale);
            };
          }

          // Also track the current language on initialization
          setTimeout(() => {
            updateCurrentLanguage();
          }, 1000);
        } catch (e) {
          console.warn('Error setting up language detection:', e);
        }
      }
    };

    // Initialize language detection
    if (typeof window !== 'undefined') {
      if (window.Transifex && window.Transifex.live) {
        setupLanguageDetection();
      } else {
        // Wait for Transifex to be ready
        const checkTransifex = setInterval(() => {
          if (window.Transifex && window.Transifex.live) {
            clearInterval(checkTransifex);
            setupLanguageDetection();
          }
        }, 100);

        // Cleanup interval after 10 seconds
        setTimeout(() => {
          clearInterval(checkTransifex);
        }, 10000);
      }
    }

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      Node.prototype.removeChild = originalRemoveChild;
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router]);

  useTrackPage();

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('txlive:selectedlang'));
    setLanguage(getAPILangCode(lang));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await isProAuthenticated();
      setProAuth(result);
    };
    fetchData();
  }, []);

  const handleLangSelect = (lang) => {
    const newLang = getAPILangCode(lang);
    if (page) {
      const translation = page?.translations_posts?.find((p) =>
        p?.locale?.includes(newLang)
      );
      if (translation) {
        router.push(translation.link);
      }
    }
    setLanguage(newLang);
  };

  const isProduction = process.env.NEXT_PUBLIC_FEATURE_ENV === 'production';

  const handleOsanoCookiePreferences = (e) => {
    e.preventDefault();

    if (isOsanoEnabled) {
      // eslint-disable-next-line no-undef
      Osano.cm.showDrawer('osano-cm-dom-info-dialog-open');
    }
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {metaTags && ReactHtmlParser(metaTags)}
        {(!isProduction || noIndex || isError) && (
          <meta name="robots" content="noindex,follow" />
        )}
      </Head>
      <GlobalStyles />
      <HeaderWrapper>
        <Header
          relative
          navMain={proLoginRequired && proAuth?.pro ? [] : navMain}
          theme={proAuth?.pro && proLoginRequired ? 'pro' : 'default'}
          onProLogout={async (e) => {
            e.preventDefault();
            await proLogout();
            window.location.reload();
          }}
          proAuthenticated={proAuth?.pro && proLoginRequired}
          pathname={`${appBasePath()}/help`}
          appUrl={appBasePath()}
          openContactUsModal={() => setOpen(true)}
          afterLangSelect={handleLangSelect}
          notifications={notifications}
        />
      </HeaderWrapper>
      <main>
        {router.isFallback || !proAuth ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          renderPage(
            isError,
            statusCode,
            children,
            setOpen,
            preview,
            proAuth?.pro,
            proAuth?.proVerificationRequired,
            proLoginRequired,
            language
          )
        )}
      </main>
      <Footer
        showCookiePreferencesLink={isOsanoEnabled}
        handleCookiePreferencesClick={handleOsanoCookiePreferences}
        openContactUsModal={() => setOpen(true)}
      />
      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
    </>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  margin-bottom: 20px;
`;

const PageWrapper = styled.div`
  padding-top: 56px;
`;

const LoaderWrapper = styled.div`
  position: relative;
  min-height: 400px;
`;

Layout.propTypes = {
  proLoginRequired: PropTypes.bool,
  children: PropTypes.node,
  metaTags: PropTypes.string,
  isError: PropTypes.bool,
  statusCode: PropTypes.number,
  preview: PropTypes.bool,
  noIndex: PropTypes.bool,
  page: PropTypes.object,
  notifications: PropTypes.array,
};

const HelpFooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 100px;
`;
