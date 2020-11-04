const fs = require("fs");
const { sendMail } = require("./send-email");
const { getFilenameFromPath } = require("../utils/path");

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
}

module.exports = { sendToKindle };
