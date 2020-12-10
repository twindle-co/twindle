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
  const twitterUser = twitterResponseJSON.includes.users[0];

  // Get the basic data
  const basicData = {
    text,
    conversation_id: threadID,
    likes: +public_metrics.like_count,
    retweets: +public_metrics.retweet_count,
    repliesCount: +public_metrics.reply_count,
  };

  const userData = {
    user_id: twitterUser.id,
    handle: twitterUser.username,
    name: twitterUser.name,
    profile_photo: twitterUser.profile_image_url.replace('_normal', '_reasonably_small'),
    verified: twitterUser.verified + '',
  };

  const { pool } = await dbInstance();

  try {
    // First check if this ID already in DB

    /** @type {[rows: import('mysql2').RowDataPacket[]]} */
    // @ts-ignore
    const [rows] = await pool.execute('SELECT * FROM twitter_threads WHERE conversation_id=?', [
      threadID,
    ]);

    if (rows.length) {
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

    // Do the checks
    /** @type {[rows: import('mysql2').RowDataPacket[]]} */
    // @ts-ignore
    const [checkUser__Rows] = await pool.execute('SELECT * FROM twitter_users WHERE user_id=?', [
      userData.user_id,
    ]);

    /**
     * NOTE: This part below looks super verbose and seems like can be deduplicated. That is the plan.
     * But not now. When Twindle Threads becomes stable, we'll be coming for this code.
     * @todo Deduplicate below part
     */
    if (checkUser__Rows.length) {
      await pool.execute(
        'UPDATE twitter_users SET handle=?, name=?, profile_photo=?, verified=? WHERE user_id=?',
        [
          userData.handle,
          userData.name,
          userData.profile_photo,
          userData.verified,
          userData.user_id,
        ]
      );
    } else {
      await pool.execute(
        'INSERT INTO twitter_users (user_id, handle, name, profile_photo, verified) VALUES (?, ?, ?, ?, ?)',
        [
          userData.user_id,
          userData.handle,
          userData.name,
          userData.profile_photo,
          userData.verified,
        ]
      );
    }

    // Do the thing
    await pool.execute(
      'INSERT INTO twitter_threads (conversation_id, user_id, text, likes, retweets, replies_count, score) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        basicData.conversation_id + '',
        userData.user_id + '',
        basicData.text,
        basicData.likes,
        basicData.retweets,
        basicData.repliesCount,
        score,
      ]
    );

    return void Response('', 'successful', res);
  } catch (e) {
    console.error(e);
  } finally {
    await pool.end();
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
