<script>
  /** @type {Reply}*/
  export let reply;

  import Tweet from "./Tweet.svelte";
  import Media from "../Media.svelte";

  const { user, tweet, id } = reply;
</script>

<section>
  <a class="embedded-tweet-anchor" href="https://twitter.com/{user.username}/status/{id}">
    <section class="embedded-tweet-container" style="page-break-inside: avoid;">
      <div class="embedded-tweet-container__header">
        <img src={user.profile_image_url} alt="profile" />
        <span class="embedded-tweet-container__header__name"> <b> {user.name} </b> </span>
        <span class="embedded-tweet-container__header__userhandle"> {user.username} </span>
        <span class="flex" />
        {#if reply.created_at}
          <span class="embedded-tweet-container__header__timestamp"> {reply.created_at} </span>
        {/if}
      </div>
      <div class="embedded-tweet-container__body">
        {@html tweet}
      </div>
      <Media customMedia={reply.customMedia} />
    </section>
  </a>
  {#if reply.answer}
    <Tweet data={reply.answer} />
  {/if}
</section>
