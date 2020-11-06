/**
 * Wait for `ms` amount of milliseconds
 * @param {number} ms
 */
const waitFor = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = { waitFor };
