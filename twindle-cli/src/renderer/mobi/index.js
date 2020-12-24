const { Calibre } = require("node-calibre");
const { generateEpub } = require("../epub");
const { tmpdir } = require("os");
const { copyFile, unlink } = require("fs").promises;
const { join } = require("path");

/**
 * @param {CustomTweetsObject[]} srcData
 * @param {string} src
 * @param {string} outputPath
 */
async function generateMobi(srcData, src, outputPath) {
  // first creating a epub in the temp folder
  const tempEpubPath = join(tmpdir(), "temp_epub.epub");
  await generateEpub(srcData, src, tempEpubPath);

  // Converting the epub to mobi
  // Create Calibre instance
  const calibre = new Calibre();
  const tempMobiPath = await calibre.ebookConvert(tempEpubPath, "mobi");

  // copying the mobi file to TwindleLibrary
  await copyFile(tempMobiPath, outputPath);

  // deleting the temp files
  await unlink(tempMobiPath);
  await unlink(tempEpubPath);
}

module.exports = { generateMobi };
