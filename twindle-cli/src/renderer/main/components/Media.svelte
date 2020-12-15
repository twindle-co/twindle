<script>
  // @ts-check

  /**
   * @type {CustomMedia}
   */
  export let customMedia = undefined;
</script>

<style>
  .media-link {
    width: 100%;
  }

  img {
    break-inside: avoid;

    max-width: 100%;
  }
</style>

{#if customMedia}
  <section>
    {#each Object.values(customMedia) as media}
      {#each media as data, i}
        <a class="media-link" href={data.link}>
          <img class="tweet-img" src={data.preview_img_url} alt={'media #' + i.toString()} />
        </a>
      {/each}
    {/each}
  </section>
{/if}
