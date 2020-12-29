/**
 * Wait for `ms` amount of milliseconds
 * @param {number} ms
 */
const waitFor = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Validate email
 * @param {string} email
 */
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return re.test(email);
}

const kleur = require("kleur");
const formatLogColors = {
  epub: kleur.green,
  pdf: kleur.red,
  mobi: kleur.yellow,
};

module.exports = { waitFor, isValidEmail, formatLogColors };
