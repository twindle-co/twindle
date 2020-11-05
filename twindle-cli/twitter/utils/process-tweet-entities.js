/**
 * returns data to make the output look like a tweet
 * @param {any} responseJSON
 */
async function processMediaFromTweet(responseJSON) {
  const mediaObj = {
    photo: [],
    video: [],
  };

  /** @type {string[]} */
  const mediaKeys = responseJSON.data[0].attachments && responseJSON.data[0].attachments.media_keys;

  if (!mediaKeys) return;

  /** @type {any[]} */
  const expandedMediaIncludes = responseJSON.includes.media;
  // console.log(mediaKeys);

  for (let mediaKey of mediaKeys) {
    // Search for it in the expandedMedia
    const mediaInfo = expandedMediaIncludes.find(({ media_key }) => media_key === mediaKey);

    if (mediaInfo.type === "photo") {
      mediaObj.photos;
    }
  }
}

module.exports = { processMediaFromTweet };
