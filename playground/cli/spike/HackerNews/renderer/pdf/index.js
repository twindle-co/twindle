const { renderTemplate } = require("../render-template");
const { createPdf } = require("./createpdf");


async function generatePDF(data, outputPath) {

  const parameter ={Story: data};
  // creates the html content
  const htmlContent = await renderTemplate(
    parameter,
    "template"
  );

  // creates the pdf from html and saves it to Twindle.pdf
   await createPdf(outputPath, htmlContent);

  return;
}
//generatePDF()
module.exports = { generatePDF };