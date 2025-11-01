import clientPromise from "../lib/db/mongodb";
import { ObjectId } from "mongodb";

export interface Party {
  _id?: ObjectId;
  name: string;
  masterEmail: string;
  createdAt: Date;
  adventureText?: string;
}

export async function createParty(name: string, masterEmail: string) {
  const client = await clientPromise;
  const db = client.db();
  const party = {
    name,
    masterEmail,
    createdAt: new Date(),
    adventureText: "",
  };
  const result = await db.collection("parties").insertOne(party);
  return result.insertedId;
}
export async function updateAdventureText(partyId: string, adventureText: string) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("parties").updateOne(
    { _id: new ObjectId(partyId) },
    { $set: { adventureText } }
  );
}

export async function getPartiesByMaster(masterEmail: string) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("parties").find({ masterEmail }).toArray();
}

export async function getPartyById(id: string) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection("parties").findOne({ _id: new ObjectId(id) });
}
