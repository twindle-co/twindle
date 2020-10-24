const { default: Axios } = require("axios");

class API {
 static async getTwitterThread(req, res) {
  try {
   // Obtain variables injected into request alongside the request body. These injected variables are made available by the custom Twitter middleware.
   const { twitterUrl, twitterApiKey, opts, body } = req;
   const response = await Axios.get(twitterUrl + "/2/tweets/" + body.id, {
    headers: {
     ...opts.headers,
     "Authorization": `Bearer ${twitterApiKey}`
    }
   });
   res.status(200).json({
    statusCode: 200,
    response: response.data.data
   });
  } catch (error) {
   // console.log(error);
   res.status(500).json({
    statusCode: 500,
    response: error.message
   });
  }
 }
}

module.exports.API = API;
