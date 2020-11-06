// @ts-check

const twemoji = require("twemoji");

/**
 * returns data to make the output look like a tweet
 * @param {any} tweetObj
 */
function processMediaFromTweet(tweetObj) {
  /** @type {{
   * [key in 'photo' | 'video' | 'animated_gif'] : {
   *  width: number;
   *  height: number;
   *  preview_img_url: string;
   *  link: string;
   * }[]
    }} */
  const mediaObj = {
    photo: [],
    video: [],
    animated_gif: [],
  };

  /** @type {string} */
  let tweetText = tweetObj.text;

  /** @type {string[]} */
  const mediaKeys = tweetObj.attachments && tweetObj.attachments.media_keys;

  if (!mediaKeys) return tweetObj;

  /** @type {any[]} */
  const expandedMediaIncludes = tweetObj.includes.media;

  for (let mediaKey of mediaKeys) {
    // Search for it in the expandedMedia
    const mediaInfo = expandedMediaIncludes.find(({ media_key }) => media_key === mediaKey);

    const { width, height, url, preview_image_url } = mediaInfo;

    // Now let's delete the url matching this media

    // Let's get the entitites
    /** @type {any[]} */
    const urls = tweetObj.entities.urls;

    const urlObjOfImage = urls.find(
      ({ expanded_url }) => expanded_url.includes("/photo/") || expanded_url.includes("/video/")
    );

    // Add to our list
    mediaObj[mediaInfo.type].push({
      width,
      height,
      preview_img_url: preview_image_url || url,
      link: urlObjOfImage.display_url,
    });

    // Get the actual short URL (t.co/[STUFF])
    const shortURL = urlObjOfImage.url;

    // Replace in the tweet text
    tweetText = tweetText.replace(shortURL, "");
  }

  // Modify the object
  tweetObj.text = tweetText;
  tweetObj.customMedia = mediaObj;

  // Return it
  return tweetObj;
}

/**
 * Fix user description
 */
function fixUserDescription(tweets) {
  const descriptionURLs = tweets.common.user.entities.description.urls;

  // Fix spaces
  tweets.common.user.description = twemoji.parse(
    tweets.common.user.description.replace(/\n/g, "<br />"),
    {
      folder: "svg",
      ext: ".svg",
    }
  );

  for (let descriptionURLObj of descriptionURLs) {
    tweets.common.user.description = tweets.common.user.description.replace(
      descriptionURLObj.url,
      `<a href="${descriptionURLObj.expanded_url}" class="description-link" rel="noopener noreferrer">${descriptionURLObj.display_url}</a>`
    );
  }

  return tweets;
}

module.exports = { processMediaFromTweet, fixUserDescription };
