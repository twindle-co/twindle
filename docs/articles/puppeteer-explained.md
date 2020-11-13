### **What is Puppeteer?**

<img src="https://user-images.githubusercontent.com/5336488/96694886-a2195480-13a6-11eb-9311-29ce9a6680e4.png" alt="Puppeteer" width="174" height="253">

From the documentation

> Puppeteer is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol.

In other words, it is a Node library that we can use to control a headless Chrome instance. That means we are actually using Chrome, but programmatically using JavaScript. And "headless Chrome" is Chrome without the graphical user interface.

(OK, thats alot of Chromes :hammer: :grinning: )

### **Why do we need Puppeteer?**

We know that using Twindle we convert long twitter threads to readable PDFs/ePubs. So in that process we create HTML from Twitter thread content and then convert that HTML to PDFs

> Twitter thread --> HTML --> PDF

[Previously](https://github.com/twindle-co/twindle/issues/415) we have seen how we can use Handlebars to compose HTML from Twitter thread content and will now convert that HTML to PDF with the help of Puppeteer ( atleast for now :grinning: )

> We need Puppeteer to render the HTML content in the headless browser so that we can perform print operation to convert the content to PDF.

### **How to utilize Puppeteer in Twindle project?**

Already @tolgaerdonmez has implemented Puppeteer to generate PDF from HTML. Lets dissect the code :grinning: :hocho: 
Following is the code from [create-pdf.js](https://github.com/twindle-co/twindle/blob/main/playground/cli/pdf-from-html-cli/create-pdf.js)

```
const puppeteer = require("puppeteer");
const fs = require("fs");

// Creates a pdf document from htmlContent and saves it to outputPath
async function createPdf(outputPath, htmlContent) {
	// launchs a puppeteer browser instance and opens a new page
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// sets the html of the page to htmlContent argument
	await page.setContent(htmlContent);

	// Prints the html page to pdf document and saves it to given outputPath
	await page.emulateMediaType("print");
	await page.pdf({ path: outputPath, format: "A4" });

	// Closing the puppeteer browser instance
	await browser.close();
}

module.exports = createPdf;
```

In the code above we are basically using headless Chrome browser to print content to PDF.
Though the code is self explanatory, let me explain it ( atleast for the sake of this issue :grimacing: )

Firstly we are including modules:

puppeteer -- for rendering HTML and printing to PDF.
fs -- Node.js file system module to work with the file system on your computer.

And we are creating an async function here with await as we have to perform each step after execution of the previous one.
As simple as we cannot print content without first loading the content. Lets see the process in 3 simple steps.

Step 1: Launching a new browser instance and then opening a new page.

```
const browser = await puppeteer.launch();
	const page = await browser.newPage();
```
<br>
Step 2: Setting the page content to our HTML content.
<br><br>


```
	await page.setContent(htmlContent);
```
<br>
Step 3: Setting media type to print that enables the page to be in print mode and next step would be printing the page in given "outputPath" and format of the print "A5". At the end, closing the browser.
<br> <br>

```
await page.emulateMediaType("print");
	await page.pdf({ path: outputPath, format: "A5" });
	await browser.close();
```
<br>

And finally in [index.js](https://github.com/twindle-co/twindle/blob/main/playground/cli/pdf-from-html-cli/index.js), we are creating PDF using below code that will generate Twindle.pdf with the twitter thread content.

```
await createPdf("Twindle.pdf", htmlContent);
```


### **What are Pros, Cons and Alternatives for Puppeteer?**
**Pros**

- As Puppeteer is a Chrome automation tool written in NodeJS, the generated PDF is by Chrome itself and its hard to find a better PDF generation tool for web than this.
- Fully functional and robust.
- Popular and maintained by Chrome DevTools team and used internally by Google.

**Cons**
- The only disadvantage is that using Puppeteer means we are installing a full Chrome browser in server and it might have a larger footprint. Though there is "puppeteer-core" which is a lightweight version of Puppeteer, we need a browser installation already or a remote one for connecting which again might not fully relieve from server load.

**Alternatives for Puppeteer**

- [PhantomJS](https://github.com/ariya/phantomjs) is the only alternative to Puppeteer with ~ 28k stars on Github but it has been [archived](https://github.com/ariya/phantomjs/issues/15344) and its not maintained.


Thanks to @tolgaerdonmez  for the amazing code.
Hope you understood Puppeteer and how to generate PDFs using rendered HTML.
Let me know 👍 or 👎
