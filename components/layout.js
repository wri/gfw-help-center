import PropTypes from 'prop-types';

import { GlobalStyles, Header, Footer } from 'gfw-components';

import Meta from './meta';

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <GlobalStyles />
      <Header />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
