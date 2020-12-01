<script>
  /**
   * @type {CustomTweetData}
   */
  export let data;

  import Media from "./Media.svelte";
  import ImageLink from "./ImageLink.svelte";

  const { customMedia, tweet, linkWithImage } = data;
  console.log(customMedia);
</script>

<section>
  <p>{tweet}</p>

  <Media {customMedia} />
  <ImageLink {linkWithImage} />
</section>
