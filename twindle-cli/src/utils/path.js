const path = require("path");
const { getLibraryPath } = require("./library");

const getOutputFilePath = (outputFilename, outputFormat) => {
  const n = outputFilename.split(".");
  const includesFormat = n.length > 1 && n[1].includes(outputFormat);
  let outputFilePath = getLibraryPath(outputFilename);

  if (!includesFormat) outputFilePath += "." + outputFormat;
  console.log(outputFilePath);
  return outputFilePath;
};

const getFilenameFromPath = (filename) => filename.split(path.sep).reverse()[0];

module.exports = { getFilenameFromPath, getOutputFilePath };
