const { fetch } = require("../helpers/fetch");
const { getCommonFields } = require("../constants");
const { TweetIDNotProvidedError } = require("../helpers/errors");

const BASE_ENDPOINT = "https://api.twitter.com/2/tweets?ids=";

const getTweetById = (id, token) => {
  if (!id) throw new TweetIDNotProvidedError();

  const COMMON_FIELDS = getCommonFields();
  const url = `${BASE_ENDPOINT}${id}${COMMON_FIELDS}`;
  return fetch(url, token);
};

module.exports = {
  getTweetById,
};
