const { sendMail } = require("./send-email");
const fs = require("fs");

async function sendToKindle(kindleEmail, filePath) {
	const file = fs.readFileSync(filePath);

	await sendMail({
		emailTo: [kindleEmail],
		subject: "From Twindle " + new Date().toLocaleDateString(),
		attachments: [
			{
				filename: "twindle.pdf",
				content: Buffer.from(file, "base64"),
				contentType: "application/pdf",
				encoding: "base64",
			},
		],
	});
}

<<<<<<< HEAD
=======

>>>>>>> upstream/main
module.exports = { sendToKindle };
