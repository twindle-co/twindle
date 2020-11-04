const { Calibre } = require("node-calibre");
const { getLibraryPath } = require("./library");
const { sendMail } = require("./send-email");
const nodemailer = require("nodemailer");
const fs = require("fs");

const calibre = new Calibre({ library: getLibraryPath() });

async function sendToKindle(kindleEmail) {
  const book = getLibraryPath("puru.pdf");
  console.log(book);
  // const convertedPath = await calibre.ebookConvert(book, "mobi");
  const file = fs.readFileSync(book);

  await sendMail({
    emailTo: [kindleEmail],
    subject: "Convert",
    attachments: [
      {
        filename: "Twindle.pdf",
        // content: Buffer.from(file, "base64"),
        path: book,
        contentType: "application/pdf",
        disposition: "attachment",
        // streamSource: fs.createReadStream(book)
        // encoding: "base64",
      },
    ],
  });
}

module.exports = { sendToKindle };
