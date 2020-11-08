const nodeFetch = require("node-fetch");
const { NetworkRequestError, TokenNotProvidedError } = require("./errors");

const fetch = (url, token) => {
  if (!token) throw new TokenNotProvidedError();

  return nodeFetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    redirect: "follow",
  }).then(async (response) => {
    if (response.status === 200)
      return {
        status: "ok",
        data: await response.json(),
      };
    else throw new NetworkRequestError();
  });
};

module.exports = {
  fetch,
};
