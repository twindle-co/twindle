const { generateEpub } = require("./epub/index");
const { generatePDF } = require("./pdf");
const spinner = require("../spinner");

const render = async (data, src, format, outputFilePath) => {
  switch (format) {
    case "pdf":
      return generatePDF(data, src, outputFilePath);
    case "epub":
      return generateEpub(data, src, outputFilePath);
    default:
      spinner.fail("Error: This renderer is not implemented yet");
    //console.error("Error: This renderer is not implemented yet");
  }
};

module.exports = {
  render,
};
