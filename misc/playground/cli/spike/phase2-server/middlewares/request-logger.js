const log = require("debug")("requests");

module.exports.logger = (req, res, next) => {
 // Log request details and response code
 res.on("finish", () => {
  log(`${req.method}: ${req.path} ====== ${res.statusCode}`);
 });
 next();
};
