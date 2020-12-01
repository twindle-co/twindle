const fetch = require("node-fetch");

async function searchFor(searchTerm) {
  const queryResult = [];
  const url = `http://hn.algolia.com/api/v1/search?query=${searchTerm}&tags=story`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  queryResult.push(result);

  return queryResult[0].hits;
}

async function captureCommentsId(keyword) {
  const elements = await searchFor(`${keyword}`);
  const Time = [];
  const Titles = [];
  const Urls = [];
  const StoryIds = [];
  for (const [k] of elements.entries()) {
    Time.push(elements[k].created_at);
    Titles.push(elements[k].title);
    Urls.push(elements[k].url);
    StoryIds.push(elements[k].objectID);
  }
  return [Time, Titles, Urls, StoryIds];
}

async function searchForStoriesComments(keyword) {
  const [Time, Titles, Urls, StoryId] = await captureCommentsId(`${keyword}`);
  const commentsDump = [];
  for (const [, value] of StoryId.entries()) {
    const api = `https://hn.algolia.com/api/v1/search?tags=comment,story_${value}`;
    const response = await fetch(api);
    const Page = await response.json();
    commentsDump.push(Page);
  }
  return [commentsDump, Titles, Urls, Time];
}
//searchForStoriesComments()

async function dumpEverything(keyword) {
  const [comments, Titles, Urls, Time] = await searchForStoriesComments(
    `${keyword}`
  );
  const commentsText = [];
  for (const [, element] of comments.entries()) {
    //console.log(`${id} and ${element}`)
    const single = element.hits;
    for (const [, val] of single.entries()) {
      //console.log(`${key} and ${val}`)
      let commentval = val.comment_text;
      commentsText.push(commentval);
    }
  }
  return [commentsText, Titles, Urls, Time];
}
//dumpEverything()

async function constructObjectArray(keyword) {
  const [Comments, Titles, Urls, Time] = await dumpEverything(`${keyword}`);
  const arrayOfStories = [];
  for (let i = 0; i < Titles.length; i++) {
    if (i != 0) {
      spin(Comments, 20);
    }

    arrayOfStories.push({
      Story: Titles[i],
      Date: Time[i],
      Website: Urls[i],
      discussion: Comments.slice(0, 20),
    });
  }
  //console.log(arrayOfStories);
  return arrayOfStories;
}

//constructObjectArray();

function spin(array, window) {
  const gone = array.splice(0, window);
  return [...array, ...gone];
}

module.exports = { constructObjectArray };
