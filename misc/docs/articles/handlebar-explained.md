### **Why do we need Handlebars?**

For converting twitter threads to PDFs, we initially need to compose HTML comprising of that twitter thread with some styling and then we can consequently convert it to PDF. 

> Twitter thread --> HTML --> PDF

To compose that HTML from twitter thread we cannot directly give tweet text to PDF because it would just look like a pile of text. So we will be using a template in which we can input this twitter thread content. For creating that HTML from a template and we will be using Handlebars

### **What is Handlebars?**

Handlebars is a simple templating language. It generates HTML from a template which contains placeholders containing Handlebars expressions. Lets see in detail.

For example, below is a template that has two two Handlebars expressions

```
<p>{{firstname}} {{lastname}}</p>
```
If applied to the input object

```
{
  firstname: "Vijaya",
  lastname: "Bhaskar",
}
```

the expressions will be replaced by the corresponding properties. The result is then

```
<p>Vijaya Bhaskar</p>
```

( React JS people can already feel familiar with this by props-components thing 😃 )

### **How to utilize Handlebars in Twindle project?**

Already @tolgaerdonmez has implemented Handlebars to create a HTML from a template. Lets decode his code 😄 
Following is the code from the template [Thread.hbs](https://github.com/twindle-co/twindle/blob/main/playground/cli/pdf-from-html-cli/templates/Thread.hbs)

```
<html>
   <body>
      <h1 id="title">Twindle Thread</h1>
      <ul>
         {{!-- uses the twit mock object from mock API --}}
         {{#each thread}}
         <li>
            <div class="tweetContainer">
               <div class="header">
                  <img src="{{image}}" alt="{{twitterHandle}}" />
                  <div>
                     <h3>{{name}} - <span>@{{twitterHandle}}</span></h3>
                     <p><span>{{createdAt}}</span></p>
                  </div>
               </div>
               <p>{{tweet}}</p>
            </div>
         </li>
         {{/each}}
      </ul>
   </body>
</html>
```

In the above code we can see expressions like {{image}} {{twiiterHandle}} {{tweet}} where we input content using a JSON here. This template when given the JSON input of twitter thread data generates HTML.


Now, lets see how the template rendering is done.
Following is the code from [render-template.js](https://github.com/twindle-co/twindle/blob/main/playground/cli/pdf-from-html-cli/render-template.js) 

```
const hbs = require("handlebars");
const fs = require("fs");
const path = require("path");

// renders the html template with the given data and returns the html string
function renderTemplate(data, templateName) {
	const html = fs.readFileSync(path.join(__dirname, `templates/${templateName}.hbs`), {
		encoding: "utf-8",
	});

	// creates the Handlebars template object
	const template = hbs.compile(html);

	// renders the html template with the given data
	const rendered = template(data);
	return rendered;
}

module.exports = renderTemplate;
```
In the above code there are three main blocks, lets see one by one.
<br>

Block 1: We are primarily are reading the file contents of the template here by giving the template name.
```
const html = fs.readFileSync(path.join(__dirname, `templates/${templateName}.hbs`), {
		encoding: "utf-8",
	});
```
<br>

Block 2: Compiling the template so it can be executed immediately.
```
const template = hbs.compile(html);
```
<br>

Block 3: When given input data it would generate the HTML using the template.
```
const rendered = template(data);
	return rendered;
```
<br>

And finally in [index.js](https://github.com/twindle-co/twindle/blob/main/playground/cli/pdf-from-html-cli/index.js), we are inputting "../mock/twit-thread.json" data to "Thread.hbs" Handlebars template to generate required html.

```
const htmlContent = renderTemplate({ thread: mockData }, "Thread");
```
<br>
Thanks to @tolgaerdonmez for the amazing code. <br/>Hope you understood Handlebars and how to render HTML using a template. <br/>
Let me know  :thumbsup: or :thumbsdown:
