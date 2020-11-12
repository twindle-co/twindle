import { sep } from "path";
import { getLibraryPath } from "./library";

const getOutputFilePath = (outputFilename, outputFormat) => {
  const n = outputFilename.split(".");
  const includesFormat = n.length > 1 && n[1].includes(outputFormat);
  let outputFilePath = getLibraryPath(outputFilename);

  if (!includesFormat) outputFilePath += "." + outputFormat;
  console.log(outputFilePath);
  return outputFilePath;
};

const getFilenameFromPath = (filename) => filename.split(sep).reverse()[0];

export { getFilenameFromPath, getOutputFilePath };
