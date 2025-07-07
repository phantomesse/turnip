import * as mongo from "../services/mongo-db.js";
import { User } from "../models/user.js";

/**
 * Endpoint for adding a new user.
 *
 * @param {string} username
 */
export default async function addUser(username) {
  return mongo.addUser(username);
}
