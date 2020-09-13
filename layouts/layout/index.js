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

import { initAnalytics, handlePageTrack } from 'analytics';

import HelpFooter from 'components/footer';

export default function Layout({ children, metaTags }) {
  const [open, setOpen] = useState(false);
  const { isFallback, asPath } = useRouter();

  useEffect(() => {
    if (!window.ANALYTICS_INITIALIZED) {
      initAnalytics();
      window.ANALYTICS_INITIALIZED = true;
    }
    handlePageTrack();
  }, [asPath]);

  return (
    <>
      <Head>{metaTags && ReactHtmlParser(metaTags)}</Head>
      <GlobalStyles />
      <Header
        relative
        pathname="https://www.globalforestwatch.org/help"
        openContactUsModal={() => setOpen(true)}
        navMain={[
          { label: 'Map', href: '/map' },
          { label: 'Dashboard', href: '/dashboards/global' },
          {
            label: 'Topics',
            href: '/topics',
            submenu: [
              {
                label: 'Biodiversity',
                as: '/topics/biodiversity',
                href: '/topics/[topic]',
              },
              {
                label: 'Climate',
                as: '/topics/climate',
                href: '/topics/[topic]',
              },
              {
                label: 'Commodities',
                as: '/topics/commodities',
                href: '/topics/[topic]',
              },
              {
                label: 'Water',
                as: '/topics/water',
                href: '/topics/[topic]',
              },
            ],
          },
          { label: 'Blog', extLink: 'https://blog.globalforestwatch.org/' },
          { label: 'About', href: '/about' },
          {
            label: 'Help',
            extLink: 'https://www.globalforestwatch.org/help',
          },
        ]}
      />
      <div>
        <main>
          {isFallback ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            children
          )}
        </main>
      </div>
      <HelpFooterWrapper>
        <HelpFooter openContactUsModal={() => setOpen(true)} />
      </HelpFooterWrapper>
      <Footer openContactUsModal={() => setOpen(true)} />
      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
    </>
  );
}

const LoaderWrapper = styled.div`
  position: relative;
  min-height: 400px;
`;

Layout.propTypes = {
  children: PropTypes.node,
  metaTags: PropTypes.string,
};

const HelpFooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 100px;
`;
