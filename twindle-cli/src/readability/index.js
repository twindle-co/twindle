const { Readability } = require("@mozilla/readability");
const image = require("../utils/image");
const JSDOM = require("jsdom").JSDOM;

async function readURL(testUrl) {
  let urls = testUrl.split(",");
  let threads = [];
  for (let url of urls) {
    let windowDocument = await getJSDOM(url);
    let article = getParsedArticle(windowDocument);
    threads.push(getArticleJSON(article, url, windowDocument));
  }
  return threads;
}

async function getJSDOM(url) {
  let doc = await JSDOM.fromURL(url, {});
  return doc.window.document;
}

function getParsedArticle(windowDocument) {
  let reader = new Readability(windowDocument);
  return reader.parse();
}

function getArticleJSON(article, url, windowDocument) {
  let articleJSON = {};
  articleJSON.title = article.title;
  articleJSON.url = url;
  articleJSON.urldomain = getURLDomain(url);
  articleJSON.html = article.content;
  if (article.byline) articleJSON.author = article.byline;
  let imageTag = Array.from(windowDocument.head.getElementsByTagName("meta")).filter(
    (element) => element.getAttribute("property") === "og:image"
  )[0];
  if (imageTag) articleJSON.image = imageTag.getAttribute("content");
  return articleJSON;
}

function getURLDomain(url) {
  let urldetails = url.substring(url.indexOf("://") + 3);
  return urldetails.substring(0, urldetails.indexOf("/"));
}

module.exports = { readURL };
