import React, { useState, useEffect } from 'react';
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
import Cookies from 'components/cookies';
import ProLogin from 'components/pro-login';

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
  const { isFallback, push } = useRouter();
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
        push(translation.link);
      }
    }
    setLanguage(newLang);
  };

  const isProduction = process.env.NEXT_PUBLIC_FEATURE_ENV === 'production';

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
        {isFallback || !proAuth ? (
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
      <Footer openContactUsModal={() => setOpen(true)} />
      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
      <Cookies />
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
