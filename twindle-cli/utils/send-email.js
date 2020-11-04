const nodemailer = require("nodemailer");
const emailConfig = require("../nodemailer.config.json");

async function sendMail({ subject, emailTo, attachments }) {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport(emailConfig);

  console.log(attachments);

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: emailConfig.auth.user, // sender address
    to: emailTo, // list of receivers
    subject, // Subject line
    attachments: [
			{
				
			},
      ...attachments,
      // {
      // 	filename: "twindle.epub",
      // 	content: Buffer.from(file, "base64"),
      // 	contentType: "application/epub+zip",
      // },
    ],
  });

  console.devLog("Email sent: %s", info.messageId);
}

module.exports = { sendMail };
