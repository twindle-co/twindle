const { getTweetById } = require("./twitter-endpoints/tweets");
const { getConversationById } = require("./twitter-endpoints/search");

module.exports = {
  getTweetById,
  getConversationById,
};
