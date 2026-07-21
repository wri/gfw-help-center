import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';

import ErrorBoundary from 'components/error-boundary';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </CacheProvider>
  );
}

export default MyApp;
