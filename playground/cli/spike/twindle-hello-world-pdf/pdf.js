//pdfjs is a pdf generation npm module that is easy to use and has alot of features
const pdf = require('pdfjs')

//fs is the default node js filesystem module
const fs = require('fs')

//create a new pdf document object and pass in some options
const doc = new pdf.Document({
    font:    require('pdfjs/font/Helvetica'),
    padding: 10,
    fontSize: 20,
    properties: {
        title: "Hello World",
        author: "Michaelcosj@Twindle"
    }
  })

  //pipe means to pass information from one process to another
  //here the newly created write stream is passed to the doc object
  doc.pipe(fs.createWriteStream('helloworld.pdf'));

  //pass a text to the doc object, the link property makes the text link to a url
  doc.text("Hello World!", {link: "https://github.com/twindle-co/twindle"});
  
  //finish writing the pdf document
  doc.end()
