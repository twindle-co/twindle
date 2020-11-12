import { generateEpub } from "./epub";
import { generatePDF } from "./pdf";
import spinner from "../spinner";

const render = async (tweets, format, outputFilePath) => {
  switch (format) {
    case "pdf":
      return generatePDF(tweets, outputFilePath);
    case "epub":
      return generateEpub(tweets, outputFilePath);
    default:
      spinner.fail("Error: This renderer is not implemented yet");
    //console.error("Error: This renderer is not implemented yet");
  }
};

export default { render };
