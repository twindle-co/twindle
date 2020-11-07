const puppeteer = require("puppeteer");
const { waitFor } = require("../utils/helpers");

/**
 * Get tweets(even older than 7 days) using puppeteer
 * @param {string} tweetID
 */
const getTweet = async (tweetID) => {
  const pageURL = `https://twitter.com/anyone/status/${tweetID}`;

  try {
    // Modify this variable to control the size of viewport
    const factor = 0.1;
    const height = Math.floor(2000 / factor);
    const width = Math.floor(1700 / factor);

    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: {
        width,
        height,
      },
      args: [`--force-device-scale-factor=${factor}`, `--window-size=${width},${height}`],
    });

    const page = await browser.newPage();

    await page.goto(pageURL, {
      waitUntil: "networkidle2",
    });

    await waitFor(4000);

    // page.on("popup", (e) => console.log(e));

    // await page.waitForNavigation({ waitUntil: "domcontentloaded" });

    const session = await page.target().createCDPSession();
    await session.send("Emulation.setPageScaleFactor", {
      pageScaleFactor: 0.5, // 400%
    });

    const tweets = await page.evaluate(() => {
      const tweetNodes = Array.from(document.querySelectorAll('div[lang]:not([lang=""])'));
      const data = tweetNodes.map((node) => ({
        tweet: node.innerText,
      }));
      return data;
    });

    // console.log(tweets);

    return { data: tweets };
  } catch (e) {
    console.error(e);
  }
};

module.exports = { getTweet };
