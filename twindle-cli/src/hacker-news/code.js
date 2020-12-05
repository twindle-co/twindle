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

async function getStories(storyId, numCommentLevels) {
    let ids = storyId.split(",");
    let stories = [];
    const requests = ids.map((id) => 
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`));
    const response = await Promise.all(requests);
    const filter = await Promise.all(response.map((res) => res.json()));
    for(let result of filter) {
        const story = await getStoryObject(result);
        await appendComments(story, 1, numCommentLevels);
        stories.push(story);
    }
    return stories;
}

async function appendComments(parent, iterationLevel, numCommentLevels) {
    if((iterationLevel <= numCommentLevels) && parent.kids) {
        const requests = parent.kids.map((id) => 
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`));
        const response = await Promise.all(requests);
        const filter = await Promise.all(response.map((res) => res.json()));
        for(let result of filter) {
            let comment = await getCommentObject(result, iterationLevel);            
            comment = await appendComments(comment, iterationLevel+1, numCommentLevels);
            parent.comments.push(comment);
        }        
    }
    return parent;
}

async function getStoryObject(result) {
    const story = {};
    story.common = {};
    story.common.id = result.id;
    story.common.created_at = formatTimestamp(new Date(result.time * 1000));
    story.common.title = result.title;
    story.common.url = result.url;
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
    return { "username" : result.id, "desc" : result.about, "karma" : result.karma };
}


module.exports = { getStories };