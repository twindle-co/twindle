const { renderTemplate } = require("./render-template");
const { createPdf } = require("./create-pdf");

// const mockData = require("../twitter/output/twitter-api-response.json");

async function generatePDF(srcData, src, outputPath) {
  const parameter = { threads: srcData };
  // creates the html content
  const htmlContent = await renderTemplate(parameter, src);

  // creates the pdf from html and saves it to Twindle.pdf
  if (srcData.length > 0) await createPdf(outputPath, htmlContent);

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
