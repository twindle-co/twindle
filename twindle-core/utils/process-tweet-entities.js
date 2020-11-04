/**
 * returns data to make the output look like a tweet
 * @param {any} responseJSON
 */
async function processTweetEntities(responseJSON) {
  const mediaObj = {};

  /** @type {string[]} */
  const mediaKeys = responseJSON.data[0].attachments.mediaKeys;
  const expandedMediaIncludes = responseJSON.includes.media;

  for (let mediaKey of mediaKeys) {
  }
}

module.exports = { processTweetEntities };
