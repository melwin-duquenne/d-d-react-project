import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Vérifie le cookie JWT
    const token = req.cookies.token;
    if (!token) return res.status(200).json({ connected: false });
    try {
      jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
      return res.status(200).json({ connected: true });
    } catch {
      return res.status(200).json({ connected: false });
    }
  }
  res.status(405).end();
}
