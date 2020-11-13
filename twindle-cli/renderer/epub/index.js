const { renderTemplate, renderTemplateTemp } = require("../render-template");
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

async function generateEpub(tweets, outputPath) {
  const css = await readFile(__dirname + "/../templates/Epub.css");
  const threadContent = await renderTemplate({ thread: tweets.data }, "Tweets");
  const { tempPath: tocTempPath } = await renderTemplateTemp(
    { common: tweets.common },
    "Toc",
    "Toc"
  );

  const options = createOptions({
    title: tweets.common.user.name + "'s Thread",
    author: tweets.common.user.name,
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
