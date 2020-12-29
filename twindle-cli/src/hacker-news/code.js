// @ts-check
const cheerio = require("cheerio");
const fetch = require("node-fetch").default;
const { formatTimestamp } = require("../utils/date");

/**
 * @typedef {{
 *  common: {
 *    id: number;
 *    created_at: string;
 *    title: string;
 *    url: string;
 *    siteTitle: string;
 *    image: string;
 *    user: {
 *      username: string;
 *      desc: string;
 *      karma: number;
 *    }
 *   numComments: number;
 *   score: number;
 * }
 * kids: number[];
 * comments: any[];
 * }} Story
 */

/**
 * @param {string} url
 */
async function fetchItem(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();

  return result;
}

/**
 *
 * @param {string} storyId
 * @param {number} numTopComments
 * @param {number} numCommentLevels
 */
async function getStories(storyId, numTopComments, numCommentLevels) {
  let ids = storyId.split(",");

  /**
   * @type {Story[]}
   */
  let stories = [];

  /** @type {import('hacker-news-api-types').IItem[]} */
  const filter = [];

  for (let id of ids) {
    /** @type {import('hacker-news-api-types').IItem} */
    const filterData = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    ).then((req) => req.json());

    filter.push(filterData);
  }

  for (let result of filter) {
    const story = await getStoryObject(result);
    await appendComments(story, numTopComments, 1, numCommentLevels);
    stories.push(story);
  }

  return stories;
}

/**
 *
 * @param {Story} parent
 * @param {number} numTopComments
 * @param {number} iterationLevel
 * @param {number} numCommentLevels
 */
async function appendComments(parent, numTopComments, iterationLevel, numCommentLevels) {
  if (iterationLevel <= numCommentLevels && parent.kids && parent.kids.length > 0) {
    const filter = await getCommentResponses(parent, numTopComments);

    for (let result of filter) {
      let comment = await getCommentObject(result, iterationLevel);
      // @ts-ignore
      comment = await appendComments(comment, numTopComments, iterationLevel + 1, numCommentLevels);
      comment.index = parent.comments.length;
      parent.comments.push(comment);
    }
  }

  return parent;
}

/**
 * @param {Story} parent
 * @param {number} numTopComments
 */
async function getCommentResponses(parent, numTopComments) {
  if (parent.kids.length > 0) {
    const kids =
      parent.kids.length <= numTopComments ? parent.kids : parent.kids.slice(0, numTopComments);

    const requests = kids.map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    );

    while (parent.kids.length) {
      parent.kids.shift();
    }

    const response = await Promise.all(requests);

    /** @type {import('hacker-news-api-types').IItem[]} */
    let filter = await Promise.all(response.map((res) => res.json()));

    filter = filter.filter((result) => !result.deleted);

    if (filter.length == numTopComments || parent.kids.length == 0) {
      return filter;
    } else {
      let newFilter = await getCommentResponses(parent, numTopComments - filter.length);
      newFilter.forEach((result) => filter.push(result));
      return filter;
    }
  }
}

/**
 *
 * @param {import('hacker-news-api-types').IItem} result
 */
async function getStoryObject(result) {
  const story = {};

  story.common = {};

  story.common.id = result.id;
  story.common.created_at = formatTimestamp(new Date(result.time * 1000) + "");
  story.common.title = result.title;
  story.common.url = result.url;

  const response = await fetch(result.url);
  const responseText = await response.text();

  const $ = cheerio.load(responseText);

  let title = $('meta[property="og:title"]').attr("content");
  if (!title) title = $("title").attr("content");

  story.common.siteTitle = title;

  let image = $('meta[property="og:image"]').attr("content");

  if (!image) image = $("image").attr("content");
  if (!image) image = "https://news.ycombinator.com/favicon.ico";

  story.common.image = image;
  story.common.user = await getUser(result.by);
  story.common.numComments = result.descendants;
  story.common.score = result.score;

  story.kids = result.kids;
  story.comments = [];

  return story;
}

/**
 *
 * @param {import("hacker-news-api-types").IItem} result
 * @param {number} iterationLevel
 */
async function getCommentObject(result, iterationLevel) {
  const comment = {};

  comment.id = result.id;
  comment.username = result.by;
  comment.kids = result.kids;
  comment.parent = result.parent;
  comment.text = result.text;
  comment.created_at = formatTimestamp(new Date(result.time * 1000) + "");
  comment.level = iterationLevel;
  comment.comments = [];
  return comment;
}

/**
 * Takes in author ID, churns out data about the author
 * @param {string} author
 */
async function getUser(author) {
  const url = `https://hacker-news.firebaseio.com/v0/user/${author}.json?print=pretty`;

  /** @type {import('hacker-news-api-types').IUser} */
  const result = await fetchItem(url);

  return { username: result.id, desc: result.about, karma: result.karma };
}

module.exports = { getStories, getUser };
