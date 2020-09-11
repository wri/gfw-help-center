import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { GlobalStyles, Header, Footer, ContactUsModal } from 'gfw-components';

import HelpFooter from 'components/footer';

import Meta from './meta';

export default function Layout({ children, tools }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Meta />
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
        <main>{children}</main>
      </div>
      <HelpFooterWrapper>
        <HelpFooter tools={tools} openContactUsModal={() => setOpen(true)} />
      </HelpFooterWrapper>
      <Footer openContactUsModal={() => setOpen(true)} />
      <ContactUsModal open={open} onRequestClose={() => setOpen(false)} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  tools: PropTypes.array,
};

const HelpFooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 100px;
`;
