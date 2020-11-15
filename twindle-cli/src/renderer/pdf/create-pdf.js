// @ts-check
const puppeteer = require("puppeteer");

function footerMarkup() {
  return `
  <div class="footer" style="width: 100%;font-size: 10px !important;display: flex;justify-content: center;">
    <span>
      <span style="font-size: 10px !important;" class="pageNumber"></span>
        of
      <span style="font-size: 10px !important;" class="totalPages"></span>
    </span>
  </div>
  `;
}

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

    await page.pdf({
      path: outputPath,
      format: "A5",
      margin: {
        bottom: 52, // minimum required for footer msg to display
        left: 20,
        right: 20,
        top: 10,
      },
      printBackground: true,
      displayHeaderFooter: true,
      footerTemplate: footerMarkup(),
      headerTemplate: "<div></div>",
    });

    // Closing the puppeteer browser instance
    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createPdf };
