import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createPlayerCard,
  getPlayerCardByName,
  updatePlayerCard,
  deletePlayerCard
} from '../../model/playerCardModel';
import { PlayerCardData } from '../../model/playerCardTemplate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    // Créer une fiche joueur
    const data: PlayerCardData = req.body;
    const result = await createPlayerCard(data);
    return res.status(201).json({ insertedId: result.insertedId });
  }

  if (method === 'GET') {
    // Récupérer une fiche joueur par nom
    const { name } = req.query;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required' });
    }
    const player = await getPlayerCardByName(name);
    if (!player) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json(player);
  }

  if (method === 'PUT') {
    // Mettre à jour une fiche joueur
    const { name, ...update } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required' });
    }
    const result = await updatePlayerCard(name, update);
    return res.status(200).json({ modifiedCount: result.modifiedCount });
  }

  if (method === 'DELETE') {
    // Supprimer une fiche joueur
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required' });
    }
    const result = await deletePlayerCard(name);
    return res.status(200).json({ deletedCount: result.deletedCount });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
