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
async function generateEpub(tweets, outputPath) {
  const css = await readFile(__dirname + "/../templates/Epub.css");

  for (let i = 0; i < tweets.length; i++) {
    tweets[i].common.user.profile_image_url = await encodeImage(
      tweets[i].common.user.profile_image_url
    );
  }

  const threadContent = await renderTemplate({ threads: tweets }, "Tweets");
  const { tempPath: tocTempPath } = await renderTemplateTemp(
    { commons: tweets.map(({ common }) => common) },
    "Toc",
    "Toc"
  );

  const authors = tweets.reduce((p, c) =>
    p ? p.common.user.name + " & " + c.common.user.name : c.common.user.name
  );

  const options = createOptions({
    title: authors + "'s Thread",
    author: authors,
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
