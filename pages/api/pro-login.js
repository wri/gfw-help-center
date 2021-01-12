import { addHours } from 'date-fns';

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
    res.status(200).json({ name: 'Test' });
  }
  res.status(401);
}
