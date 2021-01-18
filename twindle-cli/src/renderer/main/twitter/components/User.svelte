<script>
  import VerifiedBadge from "./VerifiedBadge.svelte";

  /**@type {CommonData}*/
  export let common;

  const { count, user, created_at } = common;
</script>

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
            {#if user.description}
              <p>
                <span>
                  {@html user.description}
                </span>
              </p>
            {/if}
          {/if}
          <p>
            <span> &#8986; {created_at},</span>
            <span>
              &#35; {count}
              {#if count > 1}
                &nbsp;tweets
              {:else}
                &nbsp;tweet
              {/if}
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  .header div h3 {
    margin: 0px;
  }

  .header div p {
    margin: 0px;
  }
</style>
