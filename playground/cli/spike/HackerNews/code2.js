const fetch = require("node-fetch");
//only story ids
async function searchFor() {
  const frontStoryIDs = [];
  const url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
  const response = await fetch(url);
  const result = await response.json();
  const sliced = result.slice(0, 4);
  frontStoryIDs.push(sliced);

  return frontStoryIDs;
}
//response from all storyids
async function StoriesOnFrontPage() {
  const [frontStoryids] = await searchFor();
  const StoryIDs = [];
  const kidos = [];
  const Title = [];
  const Url = [];
  const requests = frontStoryids.map((x) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${x}.json?print=pretty`)
  );
  const response = await Promise.all(requests);
  const filter = await Promise.all(response.map((res) => res.json()));
  for (const [k, v] of filter.entries()) {
    StoryIDs.push(v.id);
    kidos.push(v.kids);
    Url.push(v.url);
    Title.push(v.title);
  }
  return [StoryIDs, kidos, Title, Url];
}

//front comment +id  with parentid=storyid
async function frontComments() {
  const CommentsText = [];
  const OwnId = []; //frontcomments own id
  const ParentId = []; //or storyid
  const Ownkids = []; //front comment kids
  const kidolen = [];
  const [, kidos, Title, Url] = await StoriesOnFrontPage();

  const allkids = [].concat(...kidos);

  const requests = allkids.map((x) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${x}.json?print=pretty`)
  );
  const response = await Promise.all(requests);
  const filter = await Promise.all(response.map((res) => res.json()));

  for (const [k, v] of filter.entries()) {
    if (v.deleted !== true) {
      CommentsText.push(v.text);
      OwnId.push(v.id);
      ParentId.push(v.parent);
      Ownkids.push(v.kids);
    } else {
      OwnId.push(v.id);
      ParentId.push(v.parent);
    }
  }

  return [OwnId, ParentId, Ownkids, CommentsText, kidolen];
  //OwnId:frontcomments own id
  //ParentId:or storyid
  //Ownkids:kids of front comment
}
//all frontend Comments are here in commentText();

async function midcomments() {
  const [
    OwnIdorSecondPartid,
    firstparentid,
    Ownkidsid,
    ,
  ] = await frontComments();
  const subsequentComments = [];
  const ourkids = [];
  const subparentid = [];
  const ownid2 = [];
  //const Ownkidlen = [];

  const furthercomments = [].concat(...Ownkidsid).filter((e) => e !== undefined);

  //fetch childrens of first comment
  const requests = furthercomments.map((x) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${x}.json?print=pretty`)
  );
  const response = await Promise.all(requests);
  const filter = await Promise.all(response.map((res) => res.json()));
  for (const [k, v] of filter.entries()) {
    if (v === null) {
      console.log("null val");
    } else if (v.deleted !== true) {
      subsequentComments.push(v.text);
      ownid2.push(v.id);
      subparentid.push(v.parent);
      ourkids.push(v.kids);
    } else {
        console.log("undefined");
        subparentid.push(v.parent)
        ownid2.push(v.id)
    }
    //return [ourkids,subparentid,subsequentComments]
    //subsequentcomments:childrens of front comments
    //subparent:frontcomments
  }
  return [ownid2, ourkids, subparentid, subsequentComments];
}
midcomments();

async function lastlayercomments() {
  const [, ourkids, ,] = await midcomments();
  const lastlayerComments = [];
  const ownid3 = [];
  const ownparentid = [];
  const secondlayer = [].concat(...ourkids).filter((e) => e !== undefined);
  const requests = secondlayer.map((x) =>
    fetch(`https://hacker-news.firebaseio.com/v0/item/${x}.json?print=pretty`)
  );
  const response = await Promise.all(requests);
  const filter = await Promise.all(response.map((res) => res.json()));
  for (const [k, v] of filter.entries()) {
    lastlayerComments.push(v.text);
    ownid3.push(v.id);
    ownparentid.push(v.parent);
  }
  return [ownid3, ownparentid, lastlayerComments];
}
lastlayercomments();

async function constructObjectArray() {
  const everything = [];
  const [StoryIDs, , Title, Url] = await StoriesOnFrontPage();
  const [OwnId, ParentId, , CommentsText] = await frontComments();
  const [ownid2, , subparentid, subsequentComments] = await midcomments();
  const [ownid3, ownparentid, lastlayerComments] = await lastlayercomments();
  //StoryIDs==ParentId(parent of 1st level comments)
  //Ownid(means 1st commment)==subparentid(parent of mid comments):means first comments are parent of midlevel ones
  //ownid2(mid comment)==ownparentid(parent of last layer) :
 
 //creating some key-value relationship between using parent and child ID
 //to align comments 
 
  const objfirstlevel = {};
  for (let i = 0; i < CommentsText.length; i++) {
    objfirstlevel[CommentsText[i]] = ParentId[i];
  }

  const attachfisttomiddle = {};
  for (let i = 0; i < OwnId.length; i++) {
    attachfisttomiddle[OwnId[i]] = ownid2[i];
  }

  const objmidlevel = {};
  for (let i = 0; i < subsequentComments.length; i++) {
    objmidlevel[subsequentComments[i]] = subparentid[i];
  }

  const attachmidtolast = {};
  for (let i = 0; i < ownid2.length; i++) {
    attachmidtolast[ownid2[i]] = ownid3[i];
  }

  const objlastlevel = {};
  for (let i = 0; i < lastlayerComments.length; i++) {
    objlastlevel[lastlayerComments[i]] = ownparentid[i];
  }
}

constructObjectArray();
