const { renderTemplate } = require("../render-template");
const Epub = require("epub-gen");

const createOptions = (title, author, html) => ({
  title,
  author,
  content: [
    {
      data: html,
    },
  ],
});

async function generateEpub(tweets, outputPath) {
  const htmlContent = await renderTemplate(
    { thread: tweets.data, common: tweets.common },
    "Thread-epub"
  );
  const options = createOptions(tweets.common.user.name, tweets.common.user.name, htmlContent);

  try {
    const book = new Epub(options, outputPath).promise;
    await book;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateEpub };
