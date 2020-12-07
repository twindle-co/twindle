<script>
  /**
   * @type {CustomTweetsObject}
   */
  export let threads;

  import Tweet from "./Tweet/Tweet.svelte";
  import Reply from "./Tweet/Reply.svelte";
  import User from "./User.svelte";
</script>

<main>
  <ul>
    {#each threads as { common, data }}
      <User {common} />
      {#each data as tweet}
        <li>
          <Tweet data={tweet} />
        </li>
        {#if tweet.replies}
          {#each tweet.replies as reply}
            <li>
              <Reply {reply} />
            </li>
          {/each}
        {/if}
      {/each}
    {/each}
  </ul>
</main>
