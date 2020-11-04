/**
 * returns data to make the output look like a tweet
 * @param {any} responseJSON
 */
async function processTweetEntities(responseJSON) {
  const mediaObj = {};

  /** @type {string[]} */
  const mediaKeys = responseJSON.data[0].attachments;
  const expandedMediaIncludes = responseJSON.includes.media;
  console.log(mediaKeys);

  for (let mediaKey of mediaKeys) {
  }
}

module.exports = { processTweetEntities };
