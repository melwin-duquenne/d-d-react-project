import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || ""; // Mets ta vraie URI Atlas dans .env.local
const options = {};


const clientPromise: Promise<MongoClient> = global._mongoClientPromise
  ? global._mongoClientPromise
  : (global._mongoClientPromise = new MongoClient(uri, options).connect());

export default clientPromise;
