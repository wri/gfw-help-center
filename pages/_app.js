import PropTypes from 'prop-types';

import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.shape({}),
};

export default MyApp;
