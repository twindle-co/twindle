const fetch = require("node-fetch");

/**
 * Encode images from given url to base64
 * @param {string} url
 * @returns {Promise<string>} base64 encoded image string
 */
async function encodeImage(url) {
  const data = await fetch(url).then((r) => r.arrayBuffer());
  const b = Buffer.from(data);

  const format = url.split(".")[1];
  const encoded = `data:image/${format};base64,` + b.toString("base64");

  return encoded;
}

module.exports = { encodeImage };
