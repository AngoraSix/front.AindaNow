import { getToken } from 'next-auth/jwt';
import { oauthFrameworkConfig } from '../../config/oauth';

export default async function handler(req, res) {
  const token = await getToken({
    req,
    secret: oauthFrameworkConfig.jwt.secret,
  });
  if (req.method === 'POST') {
    res.status(200).json({ ger: 'POST', token, body: req.body });
  } else {
    res.status(400).json({ ger: 'gergerGET', token, body: req.body });
  }
}
