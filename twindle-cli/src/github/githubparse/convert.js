const showdown  = require('showdown')
const path = require('path')
const fetch = require('node-fetch')
const converter = new showdown.Converter()



function convertHTML(fetchURL){
var url =  new URL(fetchURL)
const extension =  path.extname(url.pathname)
if(extension !== ".md"){
    return console.log("Please enter another URL as it does not have markdown extension");
}
const gituser = url.pathname.split('/')[1]
const repoName = url.pathname.split('/')[2]
const rawFile = fetchURL.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")

return fetch(rawFile)
    .then(response => response.text())
    .then((body)=>{
        const dataJSON = converter.makeHtml(body)
        
       return dataJSON
    }
    ).catch((e)=>console.log(e))



}

module.exports = {convertHTML}