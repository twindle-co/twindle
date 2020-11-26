const { renderTemplate, renderTemplateTemp } = require("../render-template");
const { encodeImage } = require("../../utils/image");
const { readFile } = require("fs").promises;
const Epub = require("epub-gen");

const createOptions = ({ title, author, html, tocPath, css }) => ({
  title,
  author,
  content: [{ title: title, data: html }],
  appendChapterTitles: false,
  verbose: false,
  tocTitle: "Contents",
  publisher: "Twindle",
  customHtmlTocTemplatePath: tocPath,
  css,
});

/**
 * @param {CustomTweetsObject[]} tweets
 * @param {string} outputPath
 */
async function generateEpub(srcData, src, outputPath) {
  const css = await readFile(__dirname + "/" + src + "/Epub.css");
  

  for (let i = 0; i < srcData.length; i++) {
    srcData[i].common.user.profile_image_url = await encodeImage(
      srcData[i].common.user.profile_image_url
    );
  }

  const threadContent = await renderTemplate({ threads: srcData }, "/epub/" + src + "/Tweets");
  
  const { tempPath: tocTempPath } = await renderTemplateTemp(
    { commons: srcData.map(({ common }) => common) },
    "/epub/twitter/Toc",
    "Toc"
  );
  const authors = [];
  for(let thread of srcData) {
    if(thread.common && thread.common.user && thread.common.user.name)
      authors.push(thread.common.user.name);
  }
  const authorNames = authors.join(",");
  
  const options = createOptions({
    title: authorNames + "'s Thread",
    author: authorNames,
    html: threadContent,
    css,
    tocPath: tocTempPath,
  });

  try {
    const book = new Epub(options, outputPath).promise;
    await book;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateEpub };
