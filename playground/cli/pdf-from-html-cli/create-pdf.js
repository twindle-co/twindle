const puppeteer = require("puppeteer");
const fs = require("fs");

// Creates a pdf document from htmlContent and saves it to outputPath
async function createPdf(outputPath, htmlContent) {
	// launchs a puppeteer browser instance and opens a new page
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// sets the html of the page to htmlContent argument
	await page.setContent(htmlContent);

	// Prints the html page to pdf document and saves it to given outputPath
	await page.emulateMediaType("print");
	await page.pdf({ path: outputPath, format: "A4" });

	// Closing the puppeteer browser instance
	await browser.close();
}

module.exports = createPdf;
