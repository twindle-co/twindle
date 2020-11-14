const fs = require("fs");
const { sendMail } = require("./send-email");
const { getFilenameFromPath } = require("../utils/path");
const { blue, red } = require("kleur");

async function sendToKindle(kindleEmail, filePath) {
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
  console.log(
    `Your file ${red(filename)} has been sent to Kindle email address ${blue(kindleEmail)}`
  );
}

module.exports = { sendToKindle };
