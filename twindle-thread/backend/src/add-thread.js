// @ts-check

const { getTweetById } = require('./twitter');
const { dbInstance } = require('./helpers/connection');
const { calculateTwitterScore } = require('./helpers/score');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
async function addThread(req, res) {
  const { threadID } = req.body;

  // FUTURE: Do some checking here
  // Get basic info about the tweet
  const { data: twitterResponseJSON } = await getTweetById(
    threadID,
    process.env.TWITTER_AUTH_TOKEN
  );

  if (twitterResponseJSON.errors) {
    return void Response('tweet-does-not-exists', '', res);
  }

  const { text, public_metrics } = twitterResponseJSON.data[0];
  const { profile_image_url } = twitterResponseJSON.includes.users[0];

  // Get the basic data
  const basicData = {
    text,
    conversation_id: threadID,
    likes: +public_metrics.like_count,
    retweets: +public_metrics.retweet_count,
    repliesCount: +public_metrics.reply_count,
    user_profile_photo: profile_image_url,
  };

  try {
    const { connection } = await dbInstance();

    // First check if this ID already in DB

    /** @type {[rows: import('mysql2').RowDataPacket[]]} */
    // @ts-ignore
    const [rows] = await connection.execute('SELECT * FROM threads WHERE conversation_id=?', [
      threadID,
    ]);

    if (rows.length) {
      await connection.end();
      return void Response('thread-id-already-in-database', '', res);
    }

    // Calculate the score
    const score = calculateTwitterScore(
      basicData.likes,
      basicData.retweets,
      basicData.repliesCount,
      new Date() + '',
      new Date() + ''
    );

    // Do the thing
    await connection.execute(
      'INSERT INTO threads (conversation_id, user_profile_photo, text, likes, retweets, replies_count, score) VALUES (?, ?, ?, ?, ?, ?, ?) ',
      [
        basicData.conversation_id + '',
        basicData.user_profile_photo,
        basicData.text,
        basicData.likes,
        basicData.retweets,
        basicData.repliesCount,
        score,
      ]
    );

    await connection.end();
    return void Response('', 'successful', res);
  } catch (e) {
    console.error(e);
  }

  return void Response('unable-to-add-thread', '', res);
}

/**
 * @param {string} error
 * @param {string} message
 * @param {import('express').Response} res
 */
function Response(error, message, res) {
  return res.json({ error, message });
}

module.exports = { addThread };
