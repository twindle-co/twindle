// @ts-check

import fetchRetry from 'fetch-retry';

const Fetch = fetchRetry(fetch);

/**
 * Custom GET implementation of fetch in web worker
 * @param {string} url The base URL to which to make the requests
 * @param {RequestInit} options Options to be passed to the fetch API
 * @param {{[key: string]: string | number}} params
 */
export async function getFetch(url, params = {}, options = {}) {
  // Construct params from the `params` object
  const param =
    '?' +
    Object.keys(params)
      .map((prop) => `${encodeURI(prop)}=${encodeURI(params[prop] + '')}`)
      .join('&');

  return await Fetch(url + param, { ...options }).then((res) => res.json());
}

/**
 * Custom web worker implementation of fetch this app primarily needs
 * @param {string} url The URL to make the request to
 * @param {any} data Data to pass as body. Should be a key value pair
 * @param {RequestInit} options Options to be passed to the fetch API
 */
export async function postFetch(url, data, options = {}) {
  const response = await Fetch(url, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    }),
    ...options,
  });

  return await response.json();
}
