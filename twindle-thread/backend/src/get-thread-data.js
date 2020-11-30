// @ts-check

const { dbInstance } = require('../connection');

/**
 * Get the data related to the specific thread ID passed
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
async function getThreadData(req, res) {
  const { id } = req.params;

  const responseObj = {
    message: '',
    error: 'unable-to-get-thread-data',
    data: {},
  };

  const { connection } = await dbInstance();

  try {
    /**
     * @type {[rows: import('mysql2').RowDataPacket[]]}
     */
    // @ts-ignore
    const [rows] = await connection.execute('SELECT * FROM threads WHERE id=?', [id]);

    if (!rows.length) {
      // Empty result
      responseObj.error = 'thread-not-in-database';
      responseObj.message = '';
      return void res.json(responseObj);
    }

    responseObj.error = '';
    responseObj.message = 'successful';
    responseObj.data = rows[0];
  } catch (e) {
    console.log(e);
  }

  return void res.json(responseObj);
}

module.exports = { getThreadData };
