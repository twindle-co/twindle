<script>
  // @ts-check
  /**
   * @type {import("../../../twitter/types/types").CustomTweets[]}
   */
  export let threads;

  import Tweet from "./Tweet/Tweet.svelte";
  import Reply from "./Tweet/Reply.svelte";
  import User from "./User.svelte";
</script>

<style>
  :global(*) {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
  }
  :global(body) {
    margin: 10px 10px 20px 10px;
    font-size: 108%;
  }

  :global(a[href]) {
    text-decoration: none !important;
  }

  :global([href]:not(.link-box-anchor):not(.embedded-tweet-anchor)) {
    color: rgb(29, 161, 242);
    text-decoration: none;
    background-image: linear-gradient(
      transparent 0%,
      transparent 35%,
      rgba(29, 161, 242, 0.3) 35%,
      rgba(29, 161, 242, 0.3) 100%
    );
    background-size: 100% 200%;
    background-position: 0px 0px;
    word-break: break-word;
  }

  :global(#title) {
    text-align: center;
  }

  :global(.tweetContainer) {
    /*display: flex;
  flex-direction: column;*/
    width: 100%;
  }

  :global(.tweetContainer) * {
    margin: 0;
    padding: 0;
  }

  :global(.tweetContainer .tweet-img) {
    margin: 10px 0;

    border-radius: 0.5rem;

    max-width: 100%;
    height: auto;
  }

  :global(.tweetContainer .header) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  :global(.tweetContainer .header img) {
    max-width: 75px;
    border-radius: 50%;
    margin-right: 10px;
  }

  :global(.tweetContainer .header > div) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  :global(.tweetContainer .header > div p) {
    font-size: 14px;
  }

  :global(.tweetContainer .header > div span) {
    font-style: italic;
    color: rgb(45, 45, 45);
  }

  :global(img.emoji) {
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
  }

  :global(.user-handle) {
    color: rgba(0, 0, 0, 0.5) !important;
  }

  ul {
    list-style-type: none;

    /*display: flex;*/
    align-items: center;
    justify-content: stretch;
    /*flex-direction: column;*/
    padding: 0;
  }

  ul li {
    margin: 0;

    width: 100%;

    padding: 1rem 0;
  }

  ul li:not(:last-child) {
    border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  }
</style>

<main>
  <ul>
    {#each threads as { common, data }}
      <User {common} />
      {#each data as tweet}
        <li>
          <Tweet data={tweet} />
        </li>
        {#if tweet.replies}
          <h2>Replies</h2>
          {#each tweet.replies as reply}
            <li>
              <Reply {reply} {common} />
            </li>
          {/each}
        {/if}
      {/each}
    {/each}
  </ul>
</main>
