import cookie from 'cookie';
import { addHours } from 'date-fns';
import has from 'lodash/has';

const PRO_LOGIN_ENDPOINT = 'https://pro.globalforestwatch.org/auth/signinpost';

function setCookie() {
  const expires = addHours(new Date(), 4);
  const secure = process.env.NODE_ENV === 'production' ? 'Secure' : '';
  const cookieString = [
    'pro-x=true',
    'HttpOnly',
    'Path=/',
    'SameSite=Strict',
    secure,
    `expires=${expires}`,
  ];
  return cookieString.join(';');
}

const authenticatePro = async (body) => {
  try {
    const req = await fetch(PRO_LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    });

    const response = await req.text();
    return response.toLowerCase() === 'authenticated';
  } catch (e) {
    console.error('Pro login error', e); // eslint-disable-line
  }
  return false;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const proAuth = await authenticatePro(JSON.parse(req.body));
    if (proAuth) {
      res.setHeader('Set-Cookie', setCookie());
      res.status(200).json({ pro: true });
    } else {
      res.status(401).json({ pro: false });
    }
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
