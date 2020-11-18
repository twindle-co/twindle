// @ts-check
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addThread(req, res) {
  /**
   * @type {{threadID: string}}
   */
  const { threadID } = req.body;

  console.log(threadID);

  // Do something
  res.send("Hello");
}

module.exports = { addThread };
