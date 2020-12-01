<script>
  /**
   * @type {CustomMedia | undefined}
   */
  export let customMedia = undefined;
</script>

<section>
  {#if customMedia}
    {#each customMedia.photo as media, i}
      <a target="_blank" rel="noopener noreferrer" class="media-link" href={media.link}>
        <img
          class="tweet-img"
          src={media.preview_img_url}
          style="page-break-inside: avoid;"
          alt={'media' + i.toString()} />
      </a>
    {/each}
  {/if}
</section>
