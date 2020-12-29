<script>
  export let common;

  const { repoName, created_at, user } = common;
</script>

<style>
:global(.tweetContainer) {
  /*display: flex;
  flex-direction: column;*/
  width: 100%;
}

:global(.tweetContainer *) {
  margin: 0;
  padding: 0;
}

:global(.tweetContainer a.media-link) {
  width: 100%;
}

:global(.tweetContainer .tweet-img) {
  margin: 10px 0;

  border-radius: 0.5rem;

  max-width: 100%;
  height: auto;
}

:global(.tweetContainer .header) {
  display: flex;
  flex-direction: row;
  align-items: center;
}

:global(.tweetContainer .header img) {
  max-width: 75px;
  border-radius: 50%;
  margin-right: 10px;
}

:global(.tweetContainer .header > div) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

:global(.tweetContainer .header > div p) {
  font-size: 14px;
}

:global(.tweetContainer .header > div span) {
  font-style: italic;
  color: rgb(45, 45, 45);
}

:global(img.emoji,
.verified-badge) {
  height: 1em;
  width: 1em;
  margin: 0 0.05em 0 0.1em;
  vertical-align: -0.1em;
}

:global(.user-handle) {
  color: rgba(0, 0, 0, 0.5) !important;
}

</style>


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
          <p><span> &#8986; {created_at} </span></p>
        </div>
      </div>
    </div>
  {/if}

