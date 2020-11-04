const path = require("path");
const { getLibraryPath } = require("./library");

const getOutputFilePath = (outputFilename) => {
  const filenameEndsInPdf = outputFilename.includes("pdf");
  let outputFilePath = getLibraryPath(outputFilename);

  if (!filenameEndsInPdf) outputFilePath += ".pdf";

  return outputFilePath;
};

const getFilenameFromPath = (filename) => filename.split(path.sep).reverse()[0];

module.exports = { getFilenameFromPath, getOutputFilePath };
