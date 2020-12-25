<script>
  /**
   * @type {CustomTweetData}
   */
  export let data;

  import Media from "../Media.svelte";
  import ImageLink from "../ImageLink.svelte";
  import Embedded from "./Embedded.svelte";

  const { customMedia, tweet, linkWithImage, embeddedTweet } = data;
</script>

<section>
  <p>
    {@html tweet}
  </p>

  <Media {customMedia} />
  <ImageLink {linkWithImage} />
  <Embedded {embeddedTweet} />
</section>
