import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import {
  GlobalStyles,
  Loader,
  Header,
  Footer,
  ContactUsModal,
} from 'gfw-components';

import HelpFooter from 'components/footer';

import Meta from './meta';

export default function Layout({ children, tools, metaTags, hasPageData }) {
  const [open, setOpen] = useState(false);
  const { isFallback } = useRouter();

  return (
    <>
      <Meta metaTags={metaTags} />
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
          {!isFallback && !hasPageData && <ErrorPage statusCode={404} />}
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
        <HelpFooter tools={tools} openContactUsModal={() => setOpen(true)} />
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
  tools: PropTypes.array,
  metaTags: PropTypes.string,
  hasPageData: PropTypes.bool,
};

const HelpFooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 100px;
`;
