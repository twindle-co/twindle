async function writeTweets(tweets) {
  try {
    await writeFile("../output/twitter-api-response.json", JSON.stringify(tweets));
  } catch (err) {
    console.error(err);
  }
}
