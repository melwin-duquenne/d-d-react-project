import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser, validateUser } from '../../model/userModel';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    // Inscription
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });
    await createUser(email, password);
    return res.status(201).json({ success: true });
  }

  if (method === 'PUT') {
    // Connexion
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });
    const user = await validateUser(email, password);
    if (!user) return res.status(401).json({ error: 'Identifiants invalides' });
    // Générer un token JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "1d" });
    // Cookie toujours sécurisé : HTTPS requis même en local
    res.setHeader('Set-Cookie', serialize('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    }));
    return res.status(200).json({ success: true, user: { email: user.email } });
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
