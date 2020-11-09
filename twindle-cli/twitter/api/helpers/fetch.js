// @ts-check
const nodeFetch = require("node-fetch").default;
const { ApiErrors } = require("../../error");

/**
 * @param {string} url Twitter endpoint to send request to
 * @param {string} token Bearer token. Should be provided from the .env file
 */
const fetch = async (url, token) => {
  if (!token) throw new ApiErrors.TokenNotProvidedError();

  const response = await nodeFetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    redirect: "follow",
  });

  // REVIEW WANTED: What should we do when its not 200? This below is just a workaround for now
  if (response.status !== 200) throw new ApiErrors.NetworkRequestError();

  /** @type {TwitterConversationResponse} */
  const data = await response.json();

  return {
    status: "ok",
    data,
  };
};

module.exports = {
  fetch,
};
