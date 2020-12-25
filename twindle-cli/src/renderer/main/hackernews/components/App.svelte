<script>
  // @ts-check
  import Common from "./Common.svelte";
  import Comment from "./Comment.svelte";

  export let threads;
</script>

<style>
  /* page layout structure */
  #w {
    display: block;
    width: 720px;
    margin: 0 auto;
    padding-top: 35px;
  }

  #container {
    display: block;
    width: 100%;
    background: #fff;
    border-radius: 4px;
  }

  /* comments area */
  #comments {
    display: block;
  }
</style>

{#each threads as { comments, common }}
  <Common {common} />
  <div id="w">
    <div id="container">
      {#if comments}
        <ul id="comments">
          {#each comments as comment}
            <Comment {comment} />
          {/each}
        </ul>
      {/if}
    </div>
  </div>
{/each}
