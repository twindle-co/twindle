const { TWITTER_API_URL, TWITTER_API_KEY } = require("../environment");

module.exports.http = (req, res, next) => {
 try {
  // Inject the Twitter api url into every request 
  req.twitterUrl = TWITTER_API_URL;

  // Inject the Twitter api key into every request
  req.twitterApiKey = TWITTER_API_KEY;

  // console.log(TWITTER_API_URL);

  // Inject options into every request. These options would be made available as configuration parameters to axios
  req.opts = {
   headers: {
    "Content-Type": "application/json"
   }
  };

  // Pass control to the next function
  next();
 } catch (error) {
  res.status(500).json({
   statusCode: 500,
   response: error.message
  });
 }
};
