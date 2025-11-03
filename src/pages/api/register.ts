import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/model/userModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email et mot de passe requis' });
  try {
    await createUser(email, password);
    return res.status(201).json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur lors de la création';
    return res.status(400).json({ error: message });
  }
}
