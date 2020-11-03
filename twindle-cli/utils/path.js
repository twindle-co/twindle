const path = require("path");
const { getLibraryPath } = require("./library");

const getOutputFilePath = outputFilename => {
	const filenameEndsInPdf = outputFilename.includes("pdf");
	let outputFilePath = getLibraryPath(outputFilename);

	if (!filenameEndsInPdf) outputFilePath += ".pdf";

	return outputFilePath;
};

module.exports = { getOutputFilePath };
