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

module.exports = { generatePDF };
