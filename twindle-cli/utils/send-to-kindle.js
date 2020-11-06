<<<<<<< HEAD
const { sendMail } = require("./send-email");
=======
>>>>>>> upstream/main
const fs = require("fs");
const { sendMail } = require("./send-email");
const { getFilenameFromPath } = require("../utils/path");

async function sendToKindle(kindleEmail, filePath) {
<<<<<<< HEAD
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
=======
  const filename = getFilenameFromPath(filePath);
  await sendMail({
    emailTo: [kindleEmail],
    subject: "From Twindle " + new Date().toLocaleDateString(),
    attachments: [
      {
        filename,
        path: filePath,
      },
    ],
  });
  console.log(`Your file ${filename} has been sent to Kindle email address ${kindleEmail}`);
}

>>>>>>> upstream/main
module.exports = { sendToKindle };
