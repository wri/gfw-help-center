const next = require('next');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect').default;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Redirects non-www urls to www urls
 */
function handleNonWwwToWwwRedirect(req, res) {
  try {
    const host = req.header('host');
    if (!host.match(/^www\..*/i)) {
      res.redirect(301, `https://www.${host}${req.url}`);
    }
  } catch (_i) {
    // Ignore by default
  }
}

app.prepare().then(() => {
  const server = express();

  // Redirect from http to https when NODE_ENV is set to `production`.
  server.use(sslRedirect(['production'], 301));

  server.all(/.*/, (req, res) => {
    // Redirect from non-www to www, but only on actual `production`.
    // Note that we cannot use `NODE_ENV` for this. Instead we need to use
    //  the `NEXT_PUBLIC_FEATURE_ENV` environment variable.
    if (process.env.NEXT_PUBLIC_FEATURE_ENV === 'production') {
      handleNonWwwToWwwRedirect(req, res);
    }

    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
  });
});
