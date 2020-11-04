const { SMTPClient } = require("smtp-client");
const emailConfig = require("../nodemailer.config.json");

let s = new SMTPClient({
	host: emailConfig.host,
	port: emailConfig.port,
});

async function sendMail(emailTo) {
	await s.connect();
	await s.greet({ hostname: emailConfig.host }); // runs EHLO command or HELO as a fallback
	await s.authLogin({ username: emailConfig.auth.user, password: emailConfig.auth.pass }); // authenticates a user
	await s.mail({ from: emailConfig.auth.user }); // runs MAIL FROM command
	await s.rcpt({ to: emailTo }); // runs RCPT TO command (run this multiple times to add more recii)
	await s.data("Hello from twindle"); // runs DATA command and streams email source
	await s.quit(); // runs QUIT command
}

module.exports = { sendMail };
