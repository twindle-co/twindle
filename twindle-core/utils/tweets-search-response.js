const { addTweet, writeTweets } = require("./tweet-info");
const { createCustomTweet, getUserObject, getTweetArray } = require("./tweet-utils");
async function processSearchResponse(responseJSON) {
	var directReplies = getTweetArray(responseJSON).filter(
		tweet =>
			tweet.referenced_tweets.filter(ref => ref.type == "replied_to" && ref.id == tweet.conversation_id).length >
			0
	);
	while (directReplies.length > 0) {
		var reply_id = directReplies[0].id;
		addTweet(createCustomTweet(directReplies[0], getUserObject(responseJSON)));
		directReplies = getTweetArray(responseJSON).filter(
			tweet => tweet.referenced_tweets.filter(ref => ref.type == "replied_to" && ref.id == reply_id).length > 0
		);
	}
}
module.exports = { processSearchResponse };
