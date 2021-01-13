import cookie from 'cookie';
import { addHours } from 'date-fns';
import has from 'lodash/has';

function setCookie() {
  const expires = addHours(new Date(), 4);
  const secure = process.env.NODE_ENV === 'production' ? 'Secure' : '';
  const cookie = [
    'pro-x=true',
    'HttpOnly',
    'Path=/',
    'SameSite=Strict',
    secure,
    `expires=${expires}`
  ]
  return cookie.join(';');
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    // TODO: Perform actual auth
    res.setHeader('Set-Cookie', setCookie());
    res.status(200).json({ pro: true });
    return;
  }

  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie || '');
    if (cookies && has(cookies, 'pro-x')) {
      res.status(200).json({ pro: true });
      return;
    }

    res.status(401).json({ pro: false });
    return;
  }

  res.status(401).json({ pro: false });
}
