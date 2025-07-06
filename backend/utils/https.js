import https from "https";

/**
 *
 * @param {string} endpoint
 * @param {Object<string, string>}} params
 * @returns {Promise<string>}
 */
export async function get(endpoint, params) {
  const url =
    endpoint +
    "?" +
    Object.entries(params ?? {})
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  console.log(url);

  return new Promise((resolve, reject) => {
    let data = "";

    https
      .get(url, (response) => {
        response.on("data", (chunk) => (data += chunk));
        response.on("end", () => resolve(data));
      })
      .on("error", (error) => reject(error));
  });
}
