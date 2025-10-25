import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser, validateUser } from '../../model/userModel';
import jwt from 'jsonwebtoken';

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
    return res.status(200).json({ success: true, token, user: { email: user.email } });
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
