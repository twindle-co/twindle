const Mustache = require("mustache")
const fs = require('fs')
const createHTML = require('create-html')
const pdf = require('html-pdf')

 
main();
async function main(){
    let data;
    //getting the json file and then console
    data= await require("./twit_thread.json");
    console.log(data);
    let tweetData={
      tweets:data
    }
    console.log(tweetData);
    //template for Mustache ,
    let tweetTemplate='<div> {{#tweets}}<h2>Hello {{tweet}}</h2> <br></br> {{name}}{{/tweets}} </div>'
    //render the View data in the Mustache template
    let info=Mustache.render(tweetTemplate,tweetData);
    //console.log("HTML CODE-->",info) 
    //create an HTML
    let htmlContent = createHTML({
        title: 'Twindle',
        body:info
    })
    console.log("HTML ",htmlContent);
    // fs.writeFile('output.html', html, function (err) {
    //   if (err) console.log(err)
    // })
    let options = { format: 'Letter' };
    //convert the HTML Content/HTML Page to PDF
    pdf.create(htmlContent, options).toFile('./output.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log("file Path"+res.filename);
    });
        
}


