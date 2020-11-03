// const { generateEpub } = require("./epub/epub");
const { generatePDF } = require("./pdf");

const render = (tweets, format, outputFilePath) => {
	switch (format) {
		case "pdf":
			return generatePDF(tweets, outputFilePath);
		default:
			console.error("Error: This renderer is not implemented yet");
	}
};

module.exports = {
	render,
};
