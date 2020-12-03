const {convertHTML} = require('./convert')
const {jsonfetchData} = require('./jsonFetchData')
const fs = require('fs')
const path = require('path');
const { UserError } = require('../../helpers/error');


async function getHtml(urlData){
    const url =  new URL(urlData);
    const urlExtension = path.extname(url.pathname);
    if(urlExtension !== ".md"){
        throw new UserError("invalid-file-format-github", "Can currently only read MD files");
    }
    const readmeFileName = path.basename(url.pathname,'.md')
    const gituser = url.pathname.split('/')[1]
    const repoName = url.pathname.split('/')[2]
    const branch = url.pathname.split('/')[4];
    const repoURL = `https://api.github.com/repos/${gituser}/${repoName}`
    const data = [];
    const repoResponse = {
        common : await jsonfetchData(repoURL),
        htmlValue : await convertHTML(urlData)
    };
    repoResponse.common.branch = branch;

    data.push(repoResponse);
    fs.writeFileSync(`${__dirname}/jsonLibrary/${repoName}_${readmeFileName}.json`, JSON.stringify(data,null,2) )
    return data;    
}

//main("https://github.com/ryanmcdermott/clean-code-javascript/blob/master/README.md")

module.exports = {getHtml};