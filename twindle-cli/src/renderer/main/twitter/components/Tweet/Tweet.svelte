<script>
  /**
   * @type {CustomTweetData}
   */
  export let data;

  import Media from "../Media.svelte";
  import ImageLink from "../ImageLink.svelte";
  import Embedded from "./Embedded.svelte";

  const { customMedia, tweet, linkWithImage, embeddedTweet, created_at } = data;
</script>

<section>
  <p>
    {#if created_at}
      {created_at}
    {/if}
    {@html tweet}
  </p>

  <Media {customMedia} />
  <ImageLink {linkWithImage} />
  <Embedded {embeddedTweet} />
</section>
