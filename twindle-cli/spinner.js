const ora = require("ora");

const spinner = ora({ text: "Loading    ", color: "green", spinner: 'dots' });

module.exports = spinner;
