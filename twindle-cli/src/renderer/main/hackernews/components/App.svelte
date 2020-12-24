<script>
  // @ts-check
  import Common from "./Common.svelte";
  import Comment from "./Comment.svelte";

  export let threads;
</script>

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
