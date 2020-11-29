// @ts-check

const { getTweetById } = require('./twitter');
const { dbInstance } = require('./helpers/connection');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addThread(req, res) {
  const { threadID } = req.body;

  const responseObj = {
    message: '',
    error: 'unable-to-add-thread',
  };

  const { connection } = await dbInstance();

  // FUTURE: Do some checking here
  // Get basic info about the tweet
  const { data: twitterResponseJSON } = await getTweetById(
    threadID,
    process.env.TWITTER_AUTH_TOKEN
  );

  if (twitterResponseJSON.errors) {
    responseObj.error = 'tweet-does-not-exists';
    return res.json(responseObj);
  }

  const { text, public_metrics } = twitterResponseJSON.data[0];

  // Get the basic data
  const basicData = {
    text,
    conversation_id: threadID,
    likes: public_metrics.like_count,
    retweets: public_metrics.retweet_count,
  };

  try {
    // First check if this ID already in DB

    /**
     * @type {[rows: import('mysql2').RowDataPacket[]]}
     */
    // @ts-ignore
    const [rows] = await connection.execute('SELECT * FROM threads WHERE conversation_id=?', [
      threadID,
    ]);

    if (rows.length) {
      responseObj.error = 'thread-id-already-in-database';
      responseObj.message = '';

      return void res.json(responseObj);
    }

    // Do the thing
    await connection.execute(
      'INSERT INTO threads (conversation_id, text, likes, retweets) VALUES (?, ?, ?, ?) ',
      [basicData.conversation_id + '', basicData.text, basicData.likes, basicData.retweets]
    );

    responseObj.error = '';
    responseObj.message = 'successful';
    return res.json(responseObj);
  } catch (e) {
    console.error(e);
  }

  return res.json(responseObj);
}

module.exports = { addThread };
