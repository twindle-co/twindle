// @ts-check

/**
 * @typedef {{start: number; end: number; username: string}} TMention
 * @typedef {{start: number; end: number; tag: string}} THashtag
 */

const twemoji = require("twemoji");

/**
 * Render the images, videos and GIFs
 * @param {any} tweetObj
 */
function renderMedia(tweetObj) {
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
 * Renders the outsider links(i.e links that are not embedded tweets)
 * @param {*} tweetObj
 */
function renderOutsiderLinks(tweetObj) {
  /** @type {any[]} */

  if (!tweetObj.entities) return tweetObj;

  let urlObjs = tweetObj.entities.urls;

  if (!urlObjs) return tweetObj;

  /**
   * The final link whose image should be rendered
   */
  let linkWithImage = {};

  let linkWithImageChosen = false;

  // Tweet content
  /** @type {string} */
  const tweetText = tweetObj.text;

  // Filter images and retweets
  urlObjs = urlObjs.filter((urlObj) => !urlObj.expanded_url.includes("status"));

  for (let urlObj of urlObjs) {
    const isACard = "images" in urlObj;
    const hasCustomMedia = "customMedia" in tweetObj && !!tweetObj.customMedia;

    if (isACard && !linkWithImageChosen && !hasCustomMedia) {
      // Check if it is at the end or not
      if (tweetText.trim().substring(urlObj.start, urlObj.end + 1) === urlObj.url) {
        // Remove from the markup
        tweetObj.text = tweetText.replace(urlObj.url, "");
      }

      // console.log(urlObj)

      linkWithImage = {
        expanded_url: urlObj.expanded_url,
        images: urlObj.images,
        title: urlObj.title,
        description: urlObj.description,
        domain: new URL(urlObj.unwound_url).hostname,
      };

      linkWithImageChosen = true;
    }

    // Replace all short links with their shown links
    tweetObj.text = tweetObj.text.replace(
      urlObj.url,
      `<a target="_blank" rel="noopener noreferrer" href="${urlObj.expanded_url}">${urlObj.display_url}</a>`
    );
  }

  if (Object.entries(linkWithImage).length) tweetObj.linkWithImage = linkWithImage;

  return tweetObj;
}

/**
 * This function takes in the text, rather than a tweet object, and returns that string.
 * For portability across tweets and user descriptions
 * @param {Object} param
 * @param {string} param.text
 * @param {TMention[]} param.mentions
 * @param {THashtag[]} param.hashtags
 * @returns {string}
 */
function renderMentionsHashtags({ text = "", mentions = [], hashtags = [] }) {
  // Make the checks
  if (!mentions.length && !hashtags.length) return text;

  if (mentions.length) {
    // There are mentions
    for (let mention of mentions) {
      const { username } = mention;

      // Replace
      text = text.replace(
        `@${username}`,
        `<a href="https://twitter.com/${username}">@${username}</a>`
      );
    }
  }

  if (hashtags.length) {
    // There are hashtags
    for (let hashtag of hashtags) {
      const { tag } = hashtag;

      // Replace
      text = text.replace(`#${tag}`, `<a href="https://twitter.com/hashtag/${tag}">#${tag}</a>`);
    }
  }

  return text;
}

/**
 * Fix user description from multiple tweets combined obj. DO NOT COMPOSE IN THE RENDERRICHTWEETS FUNCTION
 */
function fixUserDescription(tweets) {
  // console.log(tweets.common.user.entities);
  if (!tweets.common.user.entities) return tweets;

  // Fix spaces
  tweets.common.user.description = twemoji.parse(
    tweets.common.user.description.replace(/\n/g, "<br />"),
    {
      folder: "svg",
      ext: ".svg",
    }
  );

  tweets.common.user.description = renderMentionsHashtags({
    text: tweets.common.user.description,
    hashtags: tweets.common.user.entities.description.hashtags,
    mentions: tweets.common.user.entities.description.mentions,
  });

  const descriptionURLs =
    tweets.common.user.entities.description && tweets.common.user.entities.description.urls;

  if (!descriptionURLs) return tweets;

  for (let descriptionURLObj of descriptionURLs) {
    tweets.common.user.description = tweets.common.user.description.replace(
      descriptionURLObj.url,
      `<a href="${descriptionURLObj.expanded_url}" class="description-link" rel="noopener noreferrer">${descriptionURLObj.display_url}</a>`
    );
  }

  return tweets;
}

/**
 * returns data to make the output look like a tweet
 * @param {any} tweetObj
 */
function renderRichTweets(tweetObj) {
  // NOTE Keep the order of the functions intact. Any wrong order can break the whole process

  tweetObj = renderMedia(tweetObj);
  tweetObj = renderOutsiderLinks(tweetObj);

  tweetObj.text = renderMentionsHashtags({
    text: tweetObj.text,
    mentions: tweetObj.entities.mentions,
    hashtags: tweetObj.entities.hashtags,
  });

  return tweetObj;
}

module.exports = { renderRichTweets, fixUserDescription };
