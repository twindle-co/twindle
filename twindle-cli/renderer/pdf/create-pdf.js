// @ts-check
const puppeteer = require("puppeteer");
const kleur = require("kleur");

/**
 * Creates a pdf document from htmlContent and saves it to outputPath
 * @param {string} outputPath
 * @param {string} htmlContent
 */
async function createPdf(outputPath, htmlContent) {
  try {
    // launches a headless puppeteer browser instance and opens a new page
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true,
    });

    const page = await browser.newPage();

    // sets the html of the page to htmlContent argument
    await page.setContent(htmlContent);

    // Prints the html page to pdf document and saves it to given outputPath
    await page.emulateMediaType("print");

    console.log(outputPath);
    await page.pdf({ path: outputPath, format: "A5" });

    // Closing the puppeteer browser instance
    await browser.close();

    const [fileName] = outputPath.split("/").reverse();

    console.log("Your " + kleur.cyan("tweets") + " are saved into " + kleur.red(fileName));
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createPdf };
