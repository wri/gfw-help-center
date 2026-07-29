import { ROOT_DOMAIN, GFW_DOMAIN, GFW_APP_DOMAIN } from './domain';

export { GFW_DOMAIN, GFW_APP_DOMAIN };

// Same root domain as GFW_DOMAIN, but a different subdomain — not confirmed
// to be part of the globalnaturewatch.org migration scope (PZB-1092).
export const PRO_URL = `https://pro.${ROOT_DOMAIN}`;
