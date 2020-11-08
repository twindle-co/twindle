const nodeFetch = require("node-fetch");
const { ApiErrors } = require("../../error");

const fetch = (url, token) => {
  if (!token) throw new ApiErrors.TokenNotProvidedError();

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
    else throw new ApiErrors.NetworkRequestError();
  });
};

module.exports = {
  fetch,
};
