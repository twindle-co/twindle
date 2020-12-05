// @ts-check

/**
 * Source: https://jkchu.com/2016/02/17/designing-and-implementing-a-ranking-algorithm/
 * @param {number} likes
 * @param {number} retweets
 * @param {number} repliesCount
 * @param {string} dateCreatedStr
 * @param {string} lastUpdatedStr
 */
function calculateTwitterScore(likes, retweets, repliesCount, dateCreatedStr, lastUpdatedStr) {
  const timeSinceCreated = +new Date() - +new Date(dateCreatedStr);
  const lastUpdateTimeDiff = +new Date() - +new Date(lastUpdatedStr);

  const numerator = likes + 0.5 * repliesCount + 0.2 * retweets;

  const denominator = 1 + timeSinceCreated ** 1.8 - (timeSinceCreated - lastUpdateTimeDiff) ** 1.2;

  return ((numerator / denominator) * 1e4).toFixed(10);
}

module.exports = { calculateTwitterScore };
