const fs = require("fs");

const homeDirectory = (process.env.APPDATA || 
    (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : 
        process.env.HOME + "/.local/share")) + '/twindle.json';
let jsonConfig = undefined;
if(fs.existsSync(homeDirectory)) {
    jsonConfig = JSON.parse(fs.readFileSync(homeDirectory));
}

function getBearerToken() {
    if(jsonConfig === undefined) {
        return process.env.TWITTER_AUTH_TOKEN;
    } else return jsonConfig.token;
}


function getTwindleLibraryPath() {
    if(jsonConfig === undefined) {
        return process.env.TWINDLE_LIBRARY_PATH;
    } else return jsonConfig.twindleLibrary;
}

function getEmailConfig() {
    if(jsonConfig === undefined) { 
        const emailConfig = {};
        emailConfig.kindleEmail = process.env.KINDLE_EMAIL;
        emailConfig.senderEmail = process.env.EMAIL;
        emailConfig.password = process.env.PASS;
        emailConfig.host = process.env.HOST;
        emailConfig.port = process.env.PORT;
        return emailConfig;
    } else return jsonConfig;
}

module.exports = { getBearerToken, getTwindleLibraryPath, getEmailConfig };