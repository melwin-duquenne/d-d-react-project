import clientPromise from "../lib/db/mongodb";
import { PlayerCardData } from "./playerCardTemplate";

const DB_NAME = "dnd";
const COLLECTION = "playerCards";

export interface PlayerCard {
  // ... autres champs ...
  partyId?: string; // ID de la partie à laquelle la carte est liée
}

export async function getAllPlayerCards() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION).find({}).toArray();
}

export async function createPlayerCard(data: PlayerCardData) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION).insertOne(data);
}

export async function getPlayerCardByName(name: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION).findOne({ name });
}

export async function updatePlayerCard(name: string, update: Partial<PlayerCardData>) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION).updateOne({ name }, { $set: update });
}

export async function deletePlayerCard(name: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION).deleteOne({ name });
}
