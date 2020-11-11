// @ts-check

const twemoji = require("twemoji");
const { getTweetById } = require("../api/twitter-endpoints/tweets");
const { formatTimestamp } = require("../utils/date");
const { getTweetObject } = require("./helpers");

/**
 * @typedef {import("../types/types").Mention} TMention
 * @typedef {import("../types/types").Hashtag} THashtag
 */

/**
 * Render the images, videos and GIFs
 * @param {TwitterConversationData} tweetObj
 */
function renderMedia(tweetObj) {
  /** @type {import("../types/types").CustomMedia} */
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

  const expandedMediaIncludes = tweetObj.includes.media;

  for (let mediaKey of mediaKeys) {
    // Search for it in the expandedMedia
    const mediaInfo = expandedMediaIncludes.find(({ media_key }) => media_key === mediaKey);

    const { width, height, url, preview_image_url } = mediaInfo;

    // Now let's delete the url matching this media

    // Let's get the entitites
    const urls = tweetObj.entities.urls;

    const urlObjOfImageIndex = urls.findIndex(
      ({ expanded_url }) => expanded_url.includes("/photo/") || expanded_url.includes("/video/")
    );

    const urlObjOfImage = urls[urlObjOfImageIndex];

    // Add to our list
    mediaObj[mediaInfo.type].push({
      width,
      height,
      preview_img_url: preview_image_url || url,
      link: urlObjOfImage.expanded_url,
    });

    // Get the actual short URL (t.co/[STUFF])
    const shortURL = urlObjOfImage.url;

    // Replace in the tweet text
    tweetText = tweetText.replace(shortURL, "");

    delete tweetObj.entities.urls[urlObjOfImageIndex];
  }

  // Modify the object
  tweetObj.text = tweetText;

  tweetObj.customMedia = mediaObj;

  // Return it
  return tweetObj;
}

/**
 * Renders the outsider links(i.e links that are not embedded tweets)
 * @param {TwitterConversationData} tweetObj
 * @param {boolean} embedded
 */
function renderOutsiderLinks(tweetObj, embedded) {
  /** @type {any[]} */

  if (!tweetObj.entities) return tweetObj;

  let urlObjs = tweetObj.entities.urls;

  if (!urlObjs) return tweetObj;

  /**
   * The final link whose image should be rendered
   * @type {Partial<import("../types/types").LinkWithImage>}
   */
  let linkWithImage = {};

  let linkWithImageChosen = false;

  // Tweet content
  /** @type {string} */
  const tweetText = tweetObj.text;

  // Filter images and retweets
  // urlObjs = urlObjs.filter((urlObj) => !urlObj.expanded_url.includes("status"));

  for (let urlObj of urlObjs) {
    if (!urlObj) continue;

    const isACard = "images" in urlObj;
    const hasCustomMedia = "customMedia" in tweetObj && !!tweetObj.customMedia;

    const isStatusLink = urlObj.expanded_url.includes("/status/");

    if (isACard && !linkWithImageChosen && !hasCustomMedia && !embedded) {
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
    if (!isStatusLink) {
      tweetObj.text = tweetObj.text.replace(
        urlObj.url,
        `<a target="_blank" rel="noopener noreferrer" href="${urlObj.expanded_url}">${urlObj.expanded_url}</a>`
      );
    }
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
 * @param {CustomTweetsObject} tweets
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

  const entitiesDescription = tweets.common.user.entities.description;

  tweets.common.user.description = renderMentionsHashtags({
    text: tweets.common.user.description,
    hashtags: (entitiesDescription && entitiesDescription.hashtags) || [],
    mentions: (entitiesDescription && entitiesDescription.mentions) || [],
  });

  const descriptionURLs = entitiesDescription && entitiesDescription.urls;

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
 * @param {TwitterConversationData} tweetObj
 * @param {boolean} embedded
 */
function _renderRichTweets(tweetObj, embedded = false) {
  // NOTE Keep the order of the functions intact. Any wrong order can break the whole process

  tweetObj = renderMedia(tweetObj);
  tweetObj = renderOutsiderLinks(tweetObj, embedded);

  if (tweetObj.entities) {
    tweetObj.text = renderMentionsHashtags({
      text: tweetObj.text,
      mentions: tweetObj.entities.mentions || [],
      hashtags: tweetObj.entities.hashtags || [],
    });
  }

  return tweetObj;
}

/** @param {TwitterConversationData} tweetObj */
function sanitizeForHandlebars(tweetObj) {
  // Remove unnecessary data for the handlebars

  if (tweetObj.embeddedTweet) {
    delete tweetObj.linkWithImage;
    return tweetObj;
  }

  // Combine conditions
  if (tweetObj.embeddedTweet && tweetObj.customMedia) {
    tweetObj.embeddedTweet.embeddedTweetCardSize = "large";
  }

  return tweetObj;
}

/**
 *
 * @param {TwitterConversationData} tweetObj
 * @param {string} token
 */
async function _renderEmbeddedTweets(tweetObj, token) {
  // Now work on the embedded tweets
  // Check
  if (!tweetObj.referenced_tweets) return tweetObj;

  if (tweetObj.referenced_tweets[0].type === "replied_to") return tweetObj;

  const tweetID = tweetObj.referenced_tweets[0].id;

  // Now do the thing
  const { data } = await getTweetById(tweetID, token);

  // @ts-ignore
  if (data.errors) return tweetObj;

  // Now render stuff
  const tweet = getTweetObject(data);

  const richEmbeddedTweet = _renderRichTweets(tweet, true);

  richEmbeddedTweet.embeddedTweetUser = tweet.includes.users.find(
    (user) => user.id === richEmbeddedTweet.author_id
  );

  richEmbeddedTweet.embeddedTweetUser.username = `@${richEmbeddedTweet.embeddedTweetUser.username}`;

  richEmbeddedTweet.created_at = formatTimestamp(richEmbeddedTweet.created_at);

  tweetObj.embeddedTweet = richEmbeddedTweet;

  // Delete the irrelevant URLS

  const url = tweetObj.entities.urls.find((url) =>
    url.expanded_url.replace("?s=20", "").includes(tweetID)
  ).url;

  tweetObj.text = tweetObj.text.replace(url, "");

  // Replace rest of status URLS with their displayed version
  const urls = tweetObj.entities.urls
    .filter((url) => url.expanded_url.includes("/status/"))
    .filter((url) => !url.expanded_url.includes(tweetID));

  for (let { url, expanded_url } of urls) {
    // Replace with the display url
    tweetObj.text = tweetObj.text.replace(url, expanded_url);
  }

  return tweetObj;
}

/**
 *
 * @param {TwitterConversationData} tweetObj
 * @param {string} token
 */
async function renderRichTweets(tweetObj, token) {
  tweetObj = _renderRichTweets(tweetObj);
  tweetObj = await _renderEmbeddedTweets(tweetObj, token);

  return sanitizeForHandlebars(tweetObj);
}

module.exports = { renderRichTweets, fixUserDescription };
