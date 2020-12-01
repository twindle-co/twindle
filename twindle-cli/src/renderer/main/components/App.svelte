<script>
  /**
   * @type {CustomTweetsObject}
   */
  export let threads;

  import Tweet from "./Tweet/Tweet.svelte";
</script>

<main>
  <h1>A Twindle Thread</h1>
  {#each threads as { common, data }}
    {#each data as tweet}
      <Tweet data={tweet} />
    {/each}
  {/each}
</main>
