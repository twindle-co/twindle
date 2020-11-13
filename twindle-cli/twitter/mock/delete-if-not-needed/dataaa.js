const tweetLookupApiResponse = {
  data: [
    {
      conversation_id: "1324561342292897792",
      text:
        "Don't let perfection and fear of rejection hold you back from making progress! A thread 👇🧵\n\n1/ I used to be a perfectionist. I would polish and polish and polish. No, I would polish and get frustrated by my lack of progress and quit.",
      lang: "en",
      created_at: "2020-11-06T03:56:47.000Z",
      source: "Twitter Web App",
      public_metrics: {
        retweet_count: 8,
        reply_count: 3,
        like_count: 30,
        quote_count: 0,
      },
      possibly_sensitive: false,
      id: "1324561342292897792",
      author_id: "391224534",
    },
  ],
  includes: {
    users: [
      {
        location: "Find me online here 👉",
        name: "Kenny Jacob ⚡",
        username: "johnjacobkenny",
        pinned_tweet_id: "1287729624068132866",
        description:
          "Christian ❤️\nMentor @twindleco\nDM me for any help 👨‍💻 ❤️ JS, React, Typescript\n🎹 Musician ❤️ Linux 🎨 Inkscape\n❤️ Arsenal FC fan 😅",
        verified: false,
        protected: false,
        profile_image_url:
          "https://pbs.twimg.com/profile_images/1115624775290839040/9TlEqVgi_normal.jpg",
        url: "https://t.co/SUkzxmt7Gx",
        created_at: "2011-10-15T07:29:31.000Z",
        entities: {
          url: {
            urls: [
              {
                start: 0,
                end: 23,
                url: "https://t.co/SUkzxmt7Gx",
                expanded_url: "https://kennyj.me/",
                display_url: "kennyj.me",
              },
            ],
          },
          description: {
            mentions: [{ start: 20, end: 30, username: "twindleco" }],
          },
        },
        public_metrics: {
          followers_count: 690,
          following_count: 718,
          tweet_count: 2649,
          listed_count: 11,
        },
        id: "391224534",
      },
    ],
  },
};

const tweetLookupApiProcessed = {
  common: {
    created_at: "Nov 6, 2020",
    count: 4,
    user: {
      description:
        'Christian <img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/v/13.0.1/svg/2764.svg"/><br />Mentor <a href="https://twitter.com/twindleco">@twindleco</a><br />DM me for any help <img class="emoji" draggable="false" alt="👨‍💻" src="https://twemoji.maxcdn.com/v/13.0.1/svg/1f468-200d-1f4bb.svg"/> <img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/v/13.0.1/svg/2764.svg"/> JS, React, Typescript<br /><img class="emoji" draggable="false" alt="🎹" src="https://twemoji.maxcdn.com/v/13.0.1/svg/1f3b9.svg"/> Musician <img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/v/13.0.1/svg/2764.svg"/> Linux <img class="emoji" draggable="false" alt="🎨" src="https://twemoji.maxcdn.com/v/13.0.1/svg/1f3a8.svg"/> Inkscape<br /><img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/v/13.0.1/svg/2764.svg"/> Arsenal FC fan <img class="emoji" draggable="false" alt="😅" src="https://twemoji.maxcdn.com/v/13.0.1/svg/1f605.svg"/>',
      location: "Find me online here 👉",
      id: "391224534",
      created_at: "2011-10-15T07:29:31.000Z",
      pinned_tweet_id: "1287729624068132866",
      public_metrics: {
        followers_count: 690,
        following_count: 718,
        tweet_count: 2650,
        listed_count: 11,
      },
      verified: false,
      username: "johnjacobkenny",
      name: "Kenny Jacob ⚡",
      protected: false,
      url: "https://t.co/SUkzxmt7Gx",
      profile_image_url: "https://pbs.twimg.com/profile_images/1115624775290839040/9TlEqVgi.jpg",
      entities: {
        url: {
          urls: [
            {
              start: 0,
              end: 23,
              url: "https://t.co/SUkzxmt7Gx",
              expanded_url: "https://kennyj.me/",
              display_url: "kennyj.me",
            },
          ],
        },
        description: {
          mentions: [{ start: 20, end: 30, username: "twindleco" }],
        },
      },
    },
  },
  data: [
    {
      id: "1324561342292897792",
      createdAt: "Nov 6, 2020  9:26 a.m.",
      tweet:
        'Don\'t let perfection and fear of rejection hold you back from making progress! A thread <img class="emoji" draggable="false" alt="👇" src="https://twemoji.maxcdn.com/v/13.0.1/svg/1f447.svg"/><img class="emoji" draggable="false" alt="🧵" src="https://twemoji.maxcdn.com/v/13.0.1/svg/1f9f5.svg"/><br /><br />1/ I used to be a perfectionist. I would polish and polish and polish. No, I would polish and get frustrated by my lack of progress and quit.',
    },
    {
      id: "1324561344935284736",
      createdAt: "Nov 6, 2020  9:26 a.m.",
      tweet:
        "2/ The frustration and my fear of not being perfect held me back all these years. From writing, from building useful products. I feared being ridiculed for being imperfect.<br /><br />Now I understand that there is no perfection (at least in the short term).",
    },
    {
      id: "1324561347330273281",
      createdAt: "Nov 6, 2020  9:26 a.m.",
      tweet:
        "3/  What we create will always have flaws in someone else's view because of their different experiences in life. So how do we make something perfect?<br /><br />The only thing that matters is to make progress. Iteratively improve, refine your thought processes, your coding, etc.",
    },
    {
      id: "1324561349662236673",
      createdAt: "Nov 6, 2020  9:26 a.m.",
      tweet:
        '4/ Make "progress" your metric. Perfection will follow in its own time. <img class="emoji" draggable="false" alt="❤️" src="https://twemoji.maxcdn.com/v/13.0.1/svg/2764.svg"/>',
    },
  ],
};
module.exports = {
  tweetLookupApiResponse,
  tweetLookupApiProcessed,
};
