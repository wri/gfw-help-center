// CommonJS on purpose: next-sitemap.js requires this directly as a plain
// Node script during build, so it can't load an ES module. Once
// globalnaturewatch.org is serving the app, this is the only line that
// needs to change.
const ROOT_DOMAIN = 'globalforestwatch.org';

const GFW_DOMAIN = `https://www.${ROOT_DOMAIN}`;

// Bare (no "www.") form used for the app's own base path (see
// utils/path-resolver.js). Kept distinct from GFW_DOMAIN rather than
// normalized, since collapsing them would change either the sitemap's or
// the app's current URL form.
const GFW_APP_DOMAIN = `https://${ROOT_DOMAIN}`;

module.exports = { ROOT_DOMAIN, GFW_DOMAIN, GFW_APP_DOMAIN };
