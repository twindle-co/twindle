<script>
  /** @type {EmbeddedTweetData}*/
  export let embeddedTweet;

  import Media from "../Media.svelte";
</script>

{#if embeddedTweet}
  <section>
    <a
      class="embedded-tweet-anchor"
      href="https://twitter.com/{embeddedTweet.embeddedTweetUser.username}/status/{embeddedTweet.id}">
      <section class="embedded-tweet-container" style="page-break-inside: avoid;">
        <div class="embedded-tweet-container__header">
          <img src={embeddedTweet.embeddedTweetUser.profile_image_url} alt="profile" />
          <span class="embedded-tweet-container__header__name">
            <b> {embeddedTweet.embeddedTweetUser.name} </b>
          </span>
          <span class="embedded-tweet-container__header__userhandle">
            {embeddedTweet.embeddedTweetUser.username}
          </span>
          <span class="flex" />
          <span class="embedded-tweet-container__header__timestamp">
            {embeddedTweet.created_at}
          </span>
        </div>
        <div class="embedded-tweet-container__body">{embeddedTweet.text}</div>
        <Media customMedia={embeddedTweet.customMedia} />
      </section>
    </a>
  </section>
{/if}
