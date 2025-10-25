import clientPromise from "../lib/db/mongodb";
import { hash, compare } from "bcryptjs";

const DB_NAME = "dnd";
const COLLECTION = "users";

export interface User {
  email: string;
  password: string; // hashed
}

export async function createUser(email: string, password: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const hashed = await hash(password, 10);
  return db.collection(COLLECTION).insertOne({ email, password: hashed });
}

export async function getUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(COLLECTION).findOne({ email });
}

export async function validateUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return false;
  const valid = await compare(password, user.password);
  return valid ? user : false;
}
