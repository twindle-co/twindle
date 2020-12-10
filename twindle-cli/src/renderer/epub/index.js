const { renderTemplate } = require("./render-template");
const Epub = require("epub-gen");

const createOptions = ({ title, author, html, tocPath, css }) => ({
  title,
  author,
  cover: "./renderer/templates/resources/twindle_logo.jpg",
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
  const parameter = { threads: srcData };
  const optionDetails = await renderTemplate(parameter, src);
  const options = createOptions(optionDetails);
  try {
    const book = new Epub(options, outputPath).promise;
    await book;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateEpub };
