<script>
  // @ts-check

  /**
   * @type {import("../../../twitter/types/types").CustomMedia}
   */
  export let customMedia;
</script>

<style>
  .media-link {
    width: 100%;
  }

  picture {
    width: 100%;

    height: 32rem;

    position: relative;
  }

  img {
    break-inside: avoid;

    max-width: 100%;

    display: block;

    object-fit: contain;

    border-radius: 0.5rem;
  }

  .play-button {
    position: absolute;
  }
</style>

{#if customMedia}
  <section>
    {#each Object.entries(customMedia) as [type, media]}
      {#each media as data, i}
        <a class="media-link" href={data.link}>
          <picture>
            <img class="tweet-img" src={data.preview_img_url} alt={'media #' + i} />
            {#if ['video', 'animated_gif'].includes(type)}
              <div class="play-button" />
            {/if}
          </picture>
        </a>
      {/each}
    {/each}
  </section>
{/if}
