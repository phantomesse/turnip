import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { User } from "../models/user.js";

dotenv.config();
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = process.env.MONGO_URI.replace("<password>", password);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * @param {string} username
 * @returns {User|null} user if successful, null if not successful
 */
export async function addUser(username) {
  try {
    await client.connect();

    const db = client.db("turnip");
    const collection = db.collection("users");

    // Make sure that the username is unique.
    if ((await collection.findOne({ username })) !== null) {
      console.error(
        `Could not add user: ${username} because username is already taken.`
      );
      return null;
    }

    const userId = (await collection.insertOne({ username })).insertedId;
    return getUser(userId);
  } catch (error) {
    console.error(`Could not add user: ${username}`, error);
    return null;
  } finally {
    await client.close();
  }
}

/**
 * @param {ObjectId} userId
 * @returns {User|null} user if successful, null if not successful
 */
export async function getUser(userId) {
  try {
    await client.connect();

    const db = client.db("turnip");
    const collection = db.collection("users");

    const row = await collection.findOne({ _id: userId });
    return new User(row._id, row.username, row.books ?? []);
  } catch (error) {
    console.error(`Could not get user: ${userId}`, error);
    return null;
  } finally {
    await client.close();
  }
}
