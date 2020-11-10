const kleur = require("kleur");
const { generateEpub } = require("./epub");
const { generatePDF } = require("./pdf");

const render = async (tweets, format, outputFilePath) => {
	switch (format) {
		case "pdf":
			return generatePDF(tweets, outputFilePath);
		case "epub":
			return generateEpub(tweets, outputFilePath);
		default:
			console.error("Error: This renderer is not implemented yet");
	}
};

module.exports = {
	render,
};
