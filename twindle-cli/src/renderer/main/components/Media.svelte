<script>
  /**
   * @type {CustomMedia}
   */
  export let customMedia = undefined;
</script>

{#if customMedia}
  <section>
    {#each Object.values(customMedia) as media}
      {#each media as data, i}
        <a target="_blank" rel="noopener noreferrer" class="media-link" href={data.link}>
          <img
            class="tweet-img"
            src={data.preview_img_url}
            style="page-break-inside: avoid;"
            alt={'media' + i.toString()} />
        </a>
      {/each}
    {/each}
  </section>
{/if}
