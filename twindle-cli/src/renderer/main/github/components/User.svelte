<script>
  export let common;

  const { repoName, created_at, user } = common;
</script>

<style>
</style>

<main>
  {#if common}
    <div class="tweetContainer" style="page-break-before: always;">
      <div class="header">
        {#if user}<img src={user.profile_image_url} alt={user.username} />{/if}
        <div>
          {#if user}
            <h3>
              {user.username}
              <span class="user-handle">
                <a href="https://github.com/{user.username}/{repoName}">{repoName}</a>
              </span>
            </h3>
          {/if}
          <p><span> Repository created: {created_at} </span></p>
        </div>
      </div>
    </div>
  {/if}
</main>
