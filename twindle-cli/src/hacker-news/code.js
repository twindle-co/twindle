var cheerio = require("cheerio");
const fetch = require("node-fetch");
const { formatTimestamp } = require("../utils/date");

async function fetchItem(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

async function getStories(storyId, numTopComments, numCommentLevels) {
  let ids = storyId.split(",");
  let stories = [];
  const requests = ids.map((id) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
  );
  const response = await Promise.all(requests);
  const filter = await Promise.all(response.map((res) => res.json()));
  for (let result of filter) {
    const story = await getStoryObject(result);
    await appendComments(story, numTopComments, 1, numCommentLevels);
    stories.push(story);
  }
  return stories;
}

async function appendComments(parent, numTopComments, iterationLevel, numCommentLevels) {
  if (iterationLevel <= numCommentLevels && parent.kids && parent.kids.length > 0) {
    const filter = await getCommentResponses(parent, numTopComments);
    for (let result of filter) {
      let comment = await getCommentObject(result, iterationLevel);
      comment = await appendComments(comment, numTopComments, iterationLevel + 1, numCommentLevels);
      comment.index = parent.comments.length;
      parent.comments.push(comment);
    }
  }
  return parent;
}

async function getCommentResponses(parent, numTopComments) {
  if (parent.kids.length > 0) {
    const kids =
      parent.kids.length <= numTopComments ? parent.kids : parent.kids.slice(0, numTopComments);
    const requests = kids.map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    );
    kids.forEach((k) => parent.kids.shift(k));
    const response = await Promise.all(requests);
    let filter = await Promise.all(response.map((res) => res.json()));
    filter = filter.filter((result) => !result.deleted);
    if (filter.length == numTopComments || parent.kids.length == 0) return filter;
    else {
      let newFilter = await getCommentResponses(parent, numTopComments - filter.length);
      newFilter.forEach((result) => filter.push(result));
      return filter;
    }
  }
}

async function getStoryObject(result) {
  const story = {};
  story.common = {};
  story.common.id = result.id;
  story.common.created_at = formatTimestamp(new Date(result.time * 1000));
  story.common.title = result.title;
  story.common.url = result.url;
  const response = await fetch(result.url);
  const responseText = await response.text();
  var $ = cheerio.load(responseText);
  var title = $('meta[property="og:title"]').attr("content");
  if (!title) title = $("title").attr("content");
  story.common.siteTitle = title;
  var image = $('meta[property="og:image"]').attr("content");
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

async function getCommentObject(result, iterationLevel) {
  const comment = {};
  comment.id = result.id;
  comment.username = result.by;
  comment.kids = result.kids;
  comment.parent = result.parent;
  comment.text = result.text;
  comment.created_at = formatTimestamp(new Date(result.time * 1000));
  comment.level = iterationLevel;
  comment.comments = [];
  return comment;
}

async function getUser(author) {
  const url = `https://hacker-news.firebaseio.com/v0/user/${author}.json?print=pretty`;
  const result = await fetchItem(url);
  return { username: result.id, desc: result.about, karma: result.karma };
}

module.exports = { getStories, getUser };
