import https from 'https';
import cookie from 'cookie';
import { addHours } from 'date-fns';
import has from 'lodash/has';

const generateCookie = (name, expires, secure, remember) => {
  const cookieString = [
    name,
    'HttpOnly',
    'Path=/',
    'SameSite=Strict',
    secure,
    remember ? `expires=${expires}` : null,
  ];
  return cookieString.filter(Boolean).join(';');
};

function setCookie(needsVerify = false, remember) {
  const expires = addHours(new Date(), 4);
  const secure = process.env.NODE_ENV === 'production' ? 'Secure' : '';

  if (needsVerify) {
    return generateCookie(
      'pro-x-verification-required=true',
      expires,
      secure,
      remember
    );
  }

  return generateCookie('pro-x=true', expires, secure, remember);
}

const authenticatePro = async (body) => {
  try {
    const req = await fetch(process.env.NEXT_PUBLIC_PRO_AUTH_ENDPOINT, {
      method: 'POST',
      agent: new https.Agent({
        rejectUnauthorized: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    });

    const response = await req.json();
    if (response.success) {
      // XXX: Should we do something with the token?
      return true;
    }
    return false;
  } catch (e) {
    console.error('Pro login error', e); // eslint-disable-line
  }
  return false;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body);
    const proAuth = await authenticatePro(body);
    if (proAuth) {
      res.setHeader('Set-Cookie', setCookie(false, has(body, 'remember')));
      res.status(200).json({ pro: true });
    } else {
      res.status(401).json({ pro: false });
    }

    return;
  }

  if (req.method === 'GET') {
    if (has(req.query, 'logout')) {
      res.setHeader(
        'Set-Cookie',
        'pro-x=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      );
      res.status(200).json({ pro: false });
      return;
    }

    const cookies = cookie.parse(req.headers.cookie || '');
    if (cookies && has(cookies, 'pro-x-verification-required')) {
      res.status(200).json({ proVerificationRequired: true });
      return;
    }
    if (cookies && has(cookies, 'pro-x')) {
      res.status(200).json({ pro: true });
      return;
    }

    res.status(401).json({ pro: false });
    return;
  }

  res.status(401).json({ pro: false });
}
