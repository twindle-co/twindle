const puppeteer = require("puppeteer");
const kleur = require("kleur");

// Creates a pdf document from htmlContent and saves it to outputPath
async function createPdf(outputPath, htmlContent) {
  // launchs a puppeteer browser instance and opens a new page
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  // sets the html of the page to htmlContent argument
  await page.setContent(htmlContent);

  // Prints the html page to pdf document and saves it to given outputPath
  await page.emulateMediaType("print");
  await page.pdf({ path: outputPath, format: "A4" });

  // Closing the puppeteer browser instance
  await browser.close();

  console.log(
    "Your " +
      kleur.cyan("tweets") +
      " are saved into " +
      kleur.red(options.output + ".pdf")
  );
}

module.exports = createPdf;
