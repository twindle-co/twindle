const path = require("path");

const getOutputFilePath = (outputFilename) => {
  const filenameEndsInPdf = outputFilename.includes("pdf");
  let outputFilePath = `${process.cwd()}${path.sep}${outputFilename}`;

  if (!filenameEndsInPdf) outputFilePath += ".pdf";

  return outputFilePath;
};

module.exports = { getOutputFilePath };
