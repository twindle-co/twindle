const showdown  = require('showdown')
const fs =require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { createPdf } = require('../renderer/pdf/create-pdf')

const converter = new showdown.Converter()

const convertHTML = (fetchURL)=>{
const url = new URL(fetchURL)
const readmeFileName = path.basename(url.pathname,'.md')
const repoName = url.pathname.split('/')[2]
const rawFile = fetchURL.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/")

fetch(rawFile)
    .then(res => res.text())
    .then(body => {
        html = converter.makeHtml(body);
        const libraryPath = path.join(__dirname,'/../../TwindleLibrary/')
        createPdf(`${libraryPath}${repoName}_${readmeFileName}.pdf`,html)
    }).catch((e)=>console.log(e))

}

module.exports = convertHTML