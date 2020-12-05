// @ts-check

const { dbInstance } = require('./helpers/connection');

/**
 * Get the data related to the specific thread ID passed
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
async function getThreadsLists(req, res) {
  /** @type {{page: number; limit: number; by: 'popular:desc' | 'date:desc' | 'date:asc'}} */
  const { page, limit, by } = req.query;

  const fallbackResponseObj = {
    message: '',
    error: '',
    data: [],
  };

  const { connection } = await dbInstance();
  
}

/**
 * @param {string} error
 * @param {string} message
 * @param {Array} data
 * @param {import('express').Response} res
 */
function Response(error, message, data, res) {
  return res.json({ error, message, data });
}

module.exports = { getThreadsLists };
