import type { NextApiRequest, NextApiResponse } from 'next';
import {
  createPlayerCard,
  getPlayerCardByName,
  updatePlayerCard,
  deletePlayerCard,
  getAllPlayerCards
} from '../../model/playerCardModel';
import { ObjectId } from 'mongodb';
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
    // Récupérer toutes les fiches joueurs si all=true
    if (req.query.all === 'true') {
      const players = await getAllPlayerCards();
      return res.status(200).json(players);
    }
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
    const { _id, ...update } = req.body;
    if (!_id || typeof _id !== 'string') {
      return res.status(400).json({ error: '_id is required' });
    }
    const client = await import('../../lib/db/mongodb').then(m => m.default);
    const db = (await client).db('dnd');
    const result = await db.collection('playerCards').updateOne({ _id: new ObjectId(_id) }, { $set: update });
    return res.status(200).json({ modifiedCount: result.modifiedCount });
  }

  if (method === 'DELETE') {
    // Supprimer une fiche joueur par _id
    const { _id } = req.body;
    if (!_id || typeof _id !== 'string') {
      return res.status(400).json({ error: '_id is required' });
    }
    const client = await import('../../lib/db/mongodb').then(m => m.default);
    const db = (await client).db('dnd');
    const result = await db.collection('playerCards').deleteOne({ _id: new ObjectId(_id) });
    return res.status(200).json({ deletedCount: result.deletedCount });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
