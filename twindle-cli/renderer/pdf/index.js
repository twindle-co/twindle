const { renderTemplate } = require("./render-template");
const { createPdf } = require("./create-pdf");

// const mockData = require("../twitter/output/twitter-api-response.json");

async function generatePDF(tweets, outputPath) {
  // creates the html content
  const htmlContent = await renderTemplate({ thread: tweets }, "Thread");

  // creates the pdf from html and saves it to Twindle.pdf
  await createPdf(outputPath, htmlContent);

  return;
}

// ------------------------------
/**
 * Not part of module
 * @param {string} outputPath
 */
async function createExample(outputPath) {
  // creates the html content
  const htmlContent = await renderTemplate({ thread: mockData }, "Thread");
  // creates the pdf from html and saves it to Twindle.pdf
  await createPdf(outputPath, htmlContent);
}
// ------------------------------

module.exports = { generatePDF };
