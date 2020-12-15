<script>
  import VerifiedBadge from "./VerifiedBadge.svelte";

  /**@type {CommonData}*/
  export let common;

  const { count, user, created_at } = common;
</script>

<style>
</style>

{#if common}
  <section>
    <div class="tweetContainer" style="page-break-before: always;">
      <div class="header">
        {#if user}<img src={user.profile_image_url} alt={user.username} class="userImage" />{/if}
        <div>
          {#if user}
            <h3>
              {user.name}
              {#if user.verified}
                <VerifiedBadge />
              {/if}
              <span class="user-handle">
                <a href="https://twitter.com/{user.username}/">{user.username}</a>
              </span>
            </h3>
            <p>
              <span>
                {@html user.description}
              </span>
            </p>
          {/if}
          <p><span> Number of tweets: {count} </span></p>
          <p><span> Thread created: {created_at} </span></p>
        </div>
      </div>
    </div>
  </section>
{/if}
