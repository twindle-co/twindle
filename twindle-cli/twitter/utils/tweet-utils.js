const extractTweetId = tweet_url => tweet_url.substring(tweet_url.lastIndexOf("/") + 1);
const extractScreenName = tweet_url =>
	tweet_url.substring(0, tweet_url.lastIndexOf("/status")).substring(tweet_url.lastIndexOf("/") + 1);

const getTweetObject = responseJSON => responseJSON.data[0];
const getTweetArray = responseJSON => responseJSON.data || [];
const getUserObject = responseJSON => responseJSON.includes.users[0];

const createCustomTweet = (tweet_object, user_object) => {
	return {
		id: tweet_object.id,
		name: user_object.name,
		twitterHandle: user_object.username,
		image: user_object.profile_image_url,
		createdAt: tweet_object.created_at,
		tweet: tweet_object.text,
	};
};

const checkIfRequestSuccessful = response => {
	// console.log(response.status);
	if (response.status != 200) {
		console.log("error", { type: "error", status: response.status, statusText: response.statusText });
		return false;
	}
	return true;
};

module.exports = {
	extractTweetId,
	extractScreenName,
	getTweetObject,
	getTweetArray,
	getUserObject,
	createCustomTweet,
	checkIfRequestSuccessful,
};
