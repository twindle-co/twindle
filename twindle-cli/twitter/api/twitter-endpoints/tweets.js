const { fetch } = require("./helpers/fetch");
const { getCommonFields } = require("./constants");

const BASE_ENDPOINT = "https://api.twitter.com/2/tweets?ids=";

const getTweetById = (id, token) => {
  const COMMON_FIELDS = getCommonFields();
  const url = `${BASE_ENDPOINT}${id}${COMMON_FIELDS}`;
  return fetch(url, token);
};

module.exports = {
  getTweetById,
};
