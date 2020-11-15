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
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const kleur = require("kleur");
const formatLogColors = {
  epub: kleur.green,
  pdf: kleur.red,
};

module.exports = { waitFor, isValidEmail, formatLogColors };
