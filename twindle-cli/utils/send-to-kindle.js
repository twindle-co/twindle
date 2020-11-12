import { sendMail } from "./send-email";
import { getFilenameFromPath } from "../utils/path";
import { blue, red } from "kleur";

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

export { sendToKindle };
