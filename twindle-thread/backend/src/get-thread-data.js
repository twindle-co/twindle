const { dbInstance } = require('./helpers/connection');

/**
 * Get the data related to the specific thread ID passed
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
async function getThreadData(req, res) {
  const { id } = req.params;

  const { pool } = await dbInstance();
  try {
    /** @type {[rows: import('mysql2').RowDataPacket[]]} */
    // @ts-ignore
    const [rows] = await pool.execute(
      `SELECT tt.*, tu.* FROM twitter_threads tt 
        INNER JOIN twitter_users tu 
        ON tt.user_id = tu.user_id 
        WHERE id=?
        GROUP BY tt.user_id
        `,
      [id]
    );

    if (!rows.length) {
      // Empty result
      return void Response('thread-not-in-database', '', {}, res);
    }

    const finalData = rows.map(
      ({
        conversation_id,
        date_created,
        last_updated,
        id,
        likes,
        replies_count,
        retweets,
        score,
        text,
        user_id,
        verified,
        handle,
        name,
        profile_photo,
      }) => ({
        conversation_id,
        date_created,
        last_updated,
        id,
        likes,
        replies_count,
        retweets,
        score,
        text,
        user: {
          user_id,
          verified,
          handle,
          name,
          profile_photo,
        },
      })
    );

    return void Response('', 'successful', finalData[0], res);
  } catch (e) {
    console.log(e);
  } finally {
    await pool.end();
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
