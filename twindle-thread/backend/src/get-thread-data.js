// @ts-check

const { dbInstance } = require('./helpers/connection');

/**
 * Get the data related to the specific thread ID passed
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
async function getThreadData(req, res) {
  const { id } = req.params;

  try {
    const { connection } = await dbInstance();

    /** @type {[rows: import('mysql2').RowDataPacket[]]} */
    // @ts-ignore
    const [rows] = await connection.execute('SELECT * FROM threads WHERE id=?', [id]);

    if (!rows.length) {
      // Empty result
      await connection.end();
      return void Response('thread-not-in-database', '', {}, res);
    }

    await connection.end();
    return void Response('', 'successful', rows[0], res);
  } catch (e) {
    console.log(e);
  }

  return void Response('unable-to-get-thread-data', '', {}, res);
}

/**
 * @param {string} error
 * @param {string} message
 * @param {Object} data
 * @param {import('express').Response} res
 */
async function Response(error, message, data, res) {
  return res.json({ error, message, data });
}

module.exports = { getThreadData };
