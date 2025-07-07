import { ObjectId } from "mongodb";
import { User } from "../models/user.js";
import * as mongo from "../services/mongo-db.js";

/**
 * Endpoint for retrieving a user based on its id.
 *
 * @param {string} userId
 * @returns {User}
 */
export default async function getUser(userId) {
  return mongo.getUser(new ObjectId(userId));
}
