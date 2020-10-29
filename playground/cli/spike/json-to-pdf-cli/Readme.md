# Theme

 - Simple nodejs CLI application for convert the JSON files to PDF

# Requirements

 - Node.js 10.x.x

# workflow
  - Convert JSON to HTML
  - Convert HTML to PDF

# npm modules used

  - # create-html
        used to convert content to html file
  - # mustache
         Mustache is a logic-less template syntax. It can be used for HTML, config files, source code - anything
  - # html-to-pdf
        used to convert a html file to pdf

### Installation

Install the dependencies:
- npm i
- npm start

### Options:  
Options:  

--version: Show version number  

-o, --option: twindle command line options, choices ['pdf', 'epub', 'mobi', 'md'] 

-f, --file path: file path of the json that is to be converted  

-h, --help: Show help        

# Usage
`node script -f <file path of the json> -o <file type>`

# Example:
`node script -f ./twit_thread.json -o pdf`  
PDF Succesfully saved in F:\Projects\JS\Twindle\fetch-json-data\output.pdf
