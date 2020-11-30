const showdown  = require('showdown')
const fs =require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { createPdf } = require('../renderer/pdf/create-pdf')

const converter = new showdown.Converter()

let pdfFileName ;

const convertHTML = (fetchURL)=>{
const url = new URL(fetchURL)
const readmeFileName = path.basename(url.pathname,'.md')
const repoName = url.pathname.split('/')[2]
const rawFile = fetchURL.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")
const libraryPath = path.join(__dirname,'/../../TwindleLibrary/')
pdfFileName = `${libraryPath}${repoName}_${readmeFileName}.pdf`

fetch(rawFile)
    .then(res => res.text())
    .then(body => {
        html = converter.makeHtml(body);
        createPdf(pdfFileName,html)
    }).catch((e)=>console.log(e))

    return pdfFileName

}

module.exports = convertHTML