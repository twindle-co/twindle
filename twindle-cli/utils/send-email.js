const nodemailer = require("nodemailer");
const {UserError} = require("./../helpers/error");

const emailConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
};

async function sendMail({ subject, emailTo, attachments }) {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(emailConfig);

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: emailConfig.auth.user, // sender address
      to: emailTo, // list of receivers
      subject, // Subject line
      text: "Here is your twindle thread",
      attachments: [
        ...attachments,
        // {
        // 	filename: "twindle.epub",
        // 	content: Buffer.from(file, "base64"),
        // 	contentType: "application/epub+zip",
        // },
      ],
    });
    console.devLog("Email sent: %s", info.messageId);
  } catch(e) {
    throw new UserError(
      "sending-email-error",
      "Sending Email failed. Please check Mail server credentials"
    )
  }
}

module.exports = { sendMail };
