// @ts-check

const { dbInstance } = require('./helpers/connection');

/**
 * @typedef {{page: number | string; limit: number | string; by: 'popular:desc' | 'date:desc' | 'date:asc'}} By
 */

/**
 * Get the data related to the specific thread ID passed
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
async function getThreadsLists(req, res) {
  /** @type {By} */
  // @ts-ignore
  const { page = 1, limit = 20, by = 'popular:desc' } = req.query;

  /**
   * --------------- READ 👇 ----------------
   * Algorithm: `page` and `limit` are correlated. \
   * i.e, if page = 2, and limit=20, it's gonna go over and get the items from number 21-40
   */

  // First verify if `by` field has valid values
  const [prefix, suffix] = by
    .trim()
    .split(':')
    .map((item) => item.trim().toLowerCase());

  if (!['date', 'popular'].includes(prefix) || !['asc', 'desc'].includes(suffix)) {
    // Invalid format
    return void Response(
      'invalid-value-of-by',
      'Value of `by` parameter can only be popular:desc, popular.asc, date:desc, date:asc',
      [],
      res
    );
  }

  // Check page
  if (isNaN(+page) || !Number.isInteger(+page) || +page <= 0) {
    return void Response(
      'invalid-value-of-page',
      'page should be a integer greater than 0',
      [],
      res
    );
  }

  // Check `limit`
  if (isNaN(+limit) || !Number.isInteger(+limit) || +limit <= 0) {
    return void Response('invalid-value-of-limit', 'limit should be a number', [], res);
  }

  /** Columns and order, based on the query */
  const tokens = {
    column: prefix === 'popular' ? 'score' : 'last_updated',
    order: suffix.toUpperCase(),
  };

  try {
    const { connection } = await dbInstance();

    // Get items
    /** @type {[rows: import('mysql2').RowDataPacket[]]} */
    // @ts-ignore
    const [rows] = await connection.execute(
      `SELECT * FROM threads ORDER BY ${tokens.column} ${tokens.order} LIMIT ${+limit} OFFSET ${
        +limit * (+page - 1)
      }`
    );

    await connection.end();
    return void Response('', 'successful', rows, res);
  } catch (e) {
    console.log(e);
  }

  return void Response('unable-to-get-threads-list', '', [], res);
}

/**
 * @param {string} error
 * @param {string} message
 * @param {any[]} data
 * @param {import('express').Response} res
 */
function Response(error, message, data, res) {
  return res.json({ error, message, data });
}

module.exports = { getThreadsLists };
