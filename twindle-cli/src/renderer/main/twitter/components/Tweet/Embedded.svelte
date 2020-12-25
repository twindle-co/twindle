<script>
  // @ts-check

  /** @type {EmbeddedTweetData}*/
  export let embeddedTweet;

  const { id, embeddedTweetUser, created_at, text, customMedia } = embeddedTweet || {};

  import Media from "../Media.svelte";
  import VerifiedBadge from "../VerifiedBadge.svelte";
</script>

<style>
  a {
    color: rgba(0, 0, 0, 0.9) !important;
    font-size: 1rem;
  }

  .container {
    width: 100%;

    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);

    border-radius: 0.5rem;

    margin: 0.5rem 0;

    break-inside: avoid;
  }

  .header {
    padding: 0.5rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header img {
    display: inline-block;

    width: 2rem;
    height: auto;

    border-radius: 50%;
  }

  .userhandle,
  .timestamp {
    color: rgba(0, 0, 0, 0.7);
  }

  .body {
    padding: 0.5rem;
    /* margin: 0 1rem 0 1rem; */
  }

  .flex {
    flex: 1 1 auto;
  }
</style>

{#if embeddedTweet}
  <section>
    <a href="https://twitter.com/{embeddedTweetUser.username}/status/{id}">
      <section class="container">
        <div class="header">
          <img src={embeddedTweetUser.profile_image_url} alt="profile" />
          <span class="name">
            <b> {embeddedTweetUser.name} </b>
            {#if embeddedTweetUser.verified}
              <VerifiedBadge />
            {/if}
          </span>
          <span class="userhandle"> {embeddedTweetUser.username} </span>
          <span class="flex" />
          <span class="timestamp"> {created_at} </span>
        </div>
        <div class="body">
          {@html text}
        </div>
        <Media {customMedia} />
      </section>
    </a>
  </section>
{/if}
