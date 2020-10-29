const renderTemplate = require("./render-template");
const createPdf = require("./create-pdf");
// const fs = require("fs");
const mockData = require("../../mock/twit-thread.json");

async function main() {
	// creates the html content
	const htmlContent = renderTemplate({ thread: mockData }, "Thread");
	// creates the pdf from html and saves it to Twindle.pdf
	await createPdf("Twindle.pdf", htmlContent);

	// example line for saving the html version
	// fs.writeFileSync("Twindle.html", htmlContent);
}

main();
