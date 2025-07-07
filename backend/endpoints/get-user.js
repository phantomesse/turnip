import { User, UserBook } from "../models/user.js";

/**
 * Endpoint for retrieving a user based on its id.
 *
 * @param {string} userId
 * @returns {User}
 */
export default async function getUser(userId) {
  return new Promise((resolve) => {
    resolve(
      new User(userId, "lauren", [
        new UserBook("A Court of Thorn and Roses", "Sarah J. Maas", 4, "read", [
          "Enemies to Lovers",
          "High Fantasy Romance",
          "Dangerous Deals",
        ]),
        new UserBook("The Perfect Fit", "Sadie Kincaid", 4, "read", [
          "Arranged Marriage",
          "Dark Romance",
          "Enemies-to-lovers",
          "Forced Proximity",
          "Power Dynamics",
        ]),
        new UserBook(
          "The Orphan and the Coachman: A Mail-Order Bride Story",
          "Amelia Smarts",
          5,
          "read",
          [
            "Mail-Order Bride",
            "Historical Romance",
            "Arranged Marriage",
            "Protective Hero",
          ]
        ),
      ])
    );
  });
}
