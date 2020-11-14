const { format } = require("date-fns");

/**
 * Formats date into the format of `Nov 12, 2020`
 * @param {string} timestamp
 */
const formatTimestamp = (timestamp) => format(new Date(timestamp), "MMM d, yyyy");

module.exports = {
  formatTimestamp,
};
