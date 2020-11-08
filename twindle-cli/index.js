// Entry program
require("./helpers/logger");
require("dotenv").config();
const { getCommandlineArgs, prepareCli } = require("./cli");
const Renderer = require("./renderer");
const { getTweetsFromTweetId, getTweetsFromTweetArray } = require("./twitter");
const { getOutputFilePath } = require("./utils/path");
const { sendToKindle } = require("./utils/send-to-kindle");
const { formatLogColors } = require("./utils/helpers");
const kleur = require("kleur");

async function main() {
	prepareCli();

	const {
		format,
		outputFilename,
		tweetId,
		kindleEmail: _kindleEmail,
		sendEmail,
		mock,
		shouldUsePuppeteer,
	} = getCommandlineArgs(process.argv);

	try {
		// this next line is wrong
		let tweets = require("./twitter/twitter-mock-responses/only-links.json");

		if (!mock) {
			if (shouldUsePuppeteer) tweets = await getTweet(tweetId);
			else tweets = await getTweetsFromTweetId(tweetId);
		}

		const intelligentOutputFileName = `${
			(tweets && tweets.common && tweets.common.user && tweets.common.user.username) || "twindle"
		}-${(tweets && tweets.common && tweets.common.created_at.replace(/,/g, "").replace(/ /g, "-")) || "thread"}`;

		const outputFilePath = getOutputFilePath(outputFilename || intelligentOutputFileName, format);
		await Renderer.render(tweets, format, outputFilePath);

		let kindleEmail = process.env.KINDLE_EMAIL || _kindleEmail;
		if (sendEmail && kindleEmail) {
			console.devLog("sending to kindle", kindleEmail);
			await sendToKindle(kindleEmail, outputFilePath);
		}

		const [fileName] = outputFilePath.split("/").reverse();
		console.log("Your " + kleur.cyan("tweets") + " are saved into " + formatLogColors[format](fileName));
	} catch (e) {
		console.error(e);
	}

	// If not for this line, the script never finishes
	process.exit();
}

// Execute it
main();
