const {convertHTML} = require('./convert')
const {jsonfetchData} = require('./jsonFetchData')
const fs = require('fs')
const path = require('path')


async function main(urlData){
    const url =  new URL(urlData)
    const readmeFileName = path.basename(url.pathname,'.md')
    const gituser = url.pathname.split('/')[1]
    const repoName = url.pathname.split('/')[2]
    const repoURL = `https://api.github.com/repos/${gituser}/${repoName}`
    const data = {
        common : await jsonfetchData(repoURL),
        html : await convertHTML(urlData)
    }
    fs.writeFileSync(`./jsonLibrary/${repoName}_${readmeFileName}.json`, JSON.stringify(data,null,2) )
    
}

main("https://github.com/ryanmcdermott/clean-code-javascript/blob/master/README.md")