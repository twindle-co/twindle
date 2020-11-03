const { Calibre } = require("node-calibre");
const { getLibraryPath } = require("./library");
const { sendMail } = require("./send-email");
const fs = require("fs");

const calibre = new Calibre({ library: getLibraryPath() });

async function sendToKindle(kindleEmail) {
	const book = getLibraryPath("deneme.pdf");
	const convertedPath = await calibre.ebookConvert(book, "epub");
	const file = fs.readFileSync(convertedPath);

	await sendMail({
		emailTo: [kindleEmail],
		subject: "From Twindle " + new Date().toLocaleDateString(),
		attachments: [
			{
				filename: "twindle.epub",
				content: Buffer.from(file, "base64"),
				contentType: "application/epub+zip",
				// encoding: "base64",
			},
		],
	});
}

module.exports = { sendToKindle };
