const Mustache = require("mustache"); 
const fs = require('fs')
const createHTML = require('create-html')
const htmlToPdf = require('html-to-pdf');

main();
function main(){   
    let data;
    //get the data from json
    data=require("./twit_thread.json"); 
    //console.log(data);
    let tweetData={
      tweets:data
    }
    //console.log(tweetData);
    //get external mustache template 
    fs.readFile("tweet_template.mustache",'utf8',function(err,data){
        if(err)
        {
            console.log(err);
            return;
        }
    //render the View data in the Mustache template
    let info=Mustache.render(data,tweetData);
    //create an HTMLContent
    let htmlContent = createHTML({
        title: 'Twindle',
        body:info,
        css:"output.css"
    })
    getPdf(htmlContent);
    })

}

function getPdf(htmlContent){
    //console.log("HTML ",htmlContent);
    //create html file and write the htmlcontent which we are getting from Mustache template
    fs.writeFile('output.html',htmlContent,function (err) {
      if (err){
        console.log(err)
        return;
      }
    })
    //convert the HTML Content/HTML Page to PDF
    htmlToPdf.convertHTMLFile('output.html', 'output.pdf',
    function (error, data) {
       if (error) {
            console.log("Error Occured ",error);
            return;
        }
        console.log("PDF Succesfully saved in "+process.cwd()+"\\output.pdf");
    })        
}




