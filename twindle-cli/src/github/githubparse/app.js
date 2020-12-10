const { convertHTML } = require("./convert");
const { jsonfetchData } = require("./jsonFetchData");
const fs = require("fs");
const path = require("path");
const { UserError } = require("../../helpers/error");

async function getHtml(urlData) {
  const dataArray = [];
  var data = [];
  if (/[,\-]/.test(urlData)) {
    dataArray.push(urlData.split(","));
  }
  for (let element of dataArray[0]) {
    const url = new URL(element);
    const urlExtension = path.extname(url.pathname);
    if (urlExtension !== ".md") {
      throw new UserError("invalid-file-format-github", "Can currently only read MD files");
    }
    const readmeFileName = path.basename(url.pathname, ".md");
    const gituser = url.pathname.split("/")[1];
    const repoName = url.pathname.split("/")[2];
    const branch = url.pathname.split("/")[4];
    const fileName = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    const repoURL = `https://api.github.com/repos/${gituser}/${repoName}`;
    const repoResponse = {
      common: await jsonfetchData(repoURL),
      htmlValue: await convertHTML(element),
    };
    repoResponse.common.branch = branch;
    repoResponse.common.fileName = fileName;

    data.push(repoResponse);
  }
  //fs.writeFileSync(`${__dirname}/jsonLibrary/test.json`, JSON.stringify(data,null,2) )

  return data;
}

//getHtml("https://github.com/ryanmcdermott/clean-code-javascript/blob/master/README.md , https://github.com/kentcdodds/react-fundamentals/blob/main/src/exercise/02.md")

module.exports = { getHtml };
