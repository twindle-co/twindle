const puppeteer = require("puppeteer");
const { waitFor } = require("../../utils/helpers");

/**
 * Get tweets(even older than 7 days) using puppeteer
 * @param {string} tweetID
 */
const getTweetIDs = async (tweetID) => {
  const pageURL = `https://twitter.com/anyone/status/${tweetID}`;

  // Modify this variable to control the size of viewport
  const factor = 0.2;
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
    timeout: 5 * 60 * 1000,
  });

  await waitFor(4000);

  const tweetIDs = await page.evaluate(async () => {
    const ids = [];

    /**
     * Wait for `ms` amount of milliseconds
     * @param {number} ms
     */
    const waitFor = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Find the first Show thread button and click it
    const showRepliesButton = [...document.querySelectorAll('div[dir="auto"]')]
      .filter((node) => node.children[0] && node.children[0].tagName === "SPAN")
      .find((node) => node.children[0].innerHTML === "Show replies");

    if (showRepliesButton) {
      showRepliesButton.click();

      await waitFor(2000);
    }

    const timeNodes = Array.from(document.querySelectorAll("time"));

    for (let timeNode of timeNodes) {
      /** @type {HTMLAnchorElement | HTMLSpanElement} */
      const timeContainerAnchor = timeNode.parentElement;

      if (timeContainerAnchor.tagName === "SPAN") continue;

      const id = timeContainerAnchor.href.split("/").reverse()[0];

      ids.push(id);
    }

    return ids;
  });

  await browser.close();

  return [tweetID, ...tweetIDs];
};

module.exports = { getTweetIDs };
