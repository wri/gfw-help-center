import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';

import {
  GlobalStyles,
  Loader,
  Header,
  Footer,
  ContactUsModal,
} from 'gfw-components';

import { useTrackPage } from 'utils/analytics';
import { LangProvider, getAPILangCode } from 'utils/lang';

import ErrorPage from 'layouts/error';
import HelpFooter from 'components/footer';
import PreviewBanner from 'components/preview-banner';
import Cookies from 'components/cookies';
import ProLogin from 'components/pro-login';

const renderPage = (isError, statusCode, children, setOpen, preview, proAuthenticated, proLoginRequired, lang) => {
  if (proLoginRequired && !proAuthenticated) {
    return (
      <PageWrapper>
        <ProLogin />
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
  )
}
export default function Layout({
  children,
  metaTags,
  isError,
  proAuthenticated,
  proLoginRequired,
  statusCode,
  preview,
  noIndex,
  page,
}) {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const { isFallback, push } = useRouter();
  useTrackPage();

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('txlive:selectedlang'));
    setLanguage(getAPILangCode(lang));
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

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        {(noIndex || isError) && (
          <meta name="robots" content="noindex,follow" />
        )}
        {metaTags && ReactHtmlParser(metaTags)}
      </Head>
      <GlobalStyles />
      <HeaderWrapper>
        <Header
          relative
          pathname="https://www.globalforestwatch.org/help/"
          openContactUsModal={() => setOpen(true)}
          afterLangSelect={handleLangSelect}
        />
      </HeaderWrapper>
      <main>
        {isFallback ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : (
          renderPage(isError, statusCode, children, setOpen, preview, proAuthenticated, proLoginRequired, language)
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
  children: PropTypes.node,
  metaTags: PropTypes.string,
  isError: PropTypes.bool,
  statusCode: PropTypes.number,
  preview: PropTypes.bool,
  noIndex: PropTypes.bool,
  page: PropTypes.object,
};

const HelpFooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 100px;
`;
