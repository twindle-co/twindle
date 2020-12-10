const fetch = require("node-fetch");
const { formatTimestamp } = require("../../utils/date");

const jsonfetchData = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((jsonData) => {
      const datajson = {
        repoName: jsonData.name,
        created_at: formatTimestamp(jsonData.created_at),
        user: {
          username: jsonData.owner.login,
          profile_image_url: jsonData.owner.avatar_url,
        },
      };

      return datajson;
    });

module.exports = { jsonfetchData };
