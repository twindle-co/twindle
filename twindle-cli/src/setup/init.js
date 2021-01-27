const prompt = require('prompt');
const fs = require("fs");
const path = require('path');
const homeDirectory = (process.env.APPDATA || 
                        (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : 
                            process.env.HOME + "/.local/share")) + '/twindle.json';
    
console.log('Welcome to Twindle setup!');
console.log('--------------------------------------------------------------------------------------');
console.log('To convert Twitter threads/tweets to PDF you need a Twitter API Bearer Token.\n'
            + 'Please apply for Twitter Developer Access to obtain one.\n' 
            + 'You can follow this link for more directions: https://github.com/twindle-co/twindle/wiki/Applying-for-Developer-Access-from-Twitter');

console.log('--------------------------------------------------------------------------------------');
console.log('Any file generated using Twindle can be sent to your Kindle device for leisure reading\n'
            + 'To be able to send the files to Kindle, you must configure your Kindle account to whitelist a sender email address.\n'
            + 'Follow this link for more directions: https://www.amazon.com/gp/sendtokindle/email');
console.log('--------------------------------------------------------------------------------------');


const envResult = {};
const properties = [
    {
        name: 'token',
        description: 'Please enter the Twitter Bearer Token that you have obtained'
    },
    {
        name: 'kindleEmail',
        description: 'Please enter the Kindle email address of the device where you want to receive the document',
        validator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
        warning: 'Please enter a valid email address'
    },
    {
        name: 'senderEmail',
        description: 'Please enter the whitelisted sender email address that has been authorized on the Kindle account',
        validator: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
        warning: 'Please enter a valid email address'
    },
    {
        name: 'password',
        description: 'Please enter the password of the above email address',
        hidden: true
    },
    {
        name: 'host',
        description: 'Please enter the smtp host that you want to use to send the email(smtp.gmail.com)',
        validator: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
        warning: 'Please enter a valid host name',
        default: 'smtp.gmail.com'
    }, 
    {
        name: 'port',
        description: 'Please enter the port that you want to use to send the email(465)',
        type: 'number',
        warning: 'Port number must be valid',
        default: 465
    },
    {
        name: 'twindleLibrary',
        description: 'Please enter the Twindle Library Path where the documents must be stored',
        default:''
    }
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    //console.log('Command-line input received:');
    //console.log(result);
    //console.log(homeDirectory);
    fs.writeFileSync(homeDirectory, JSON.stringify(result,null,2) );
    //const json = JSON.parse(fs.readFileSync(homeDirectory));
    //console.log(json);
});

function onErr(err) {
    console.log(err);
    return 1;
}