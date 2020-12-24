<script>
  // @ts-check
  export let common;

  const { image, url, title, created_at, user, numComments, score, id } = common;
</script>

{#if common}
  <div id="common-info">
    <div class="article-info clearfix">
      <img alt="" src={image} class="avatar avatar-114 photo" width="114" height="114" />
      <div class="article-info-content">
        <h2 class="article-name"><a href={url}>{title}</a></h2>
        <h3 class="article-name">{created_at}</h3>
      </div>
      <div class="author-bio-text">
        <a
          data-title="user-name"
          href="https://news.ycombinator.com/user?id={user.username}">{user.username}</a>
        <span style="padding-left:20px"><a
            data-title="hacker-news-link"
            href="https://news.ycombinator.com/item?id={id}">&#128279;Hacker News</a></span>
        <span style="float:right">&#8618;{numComments}</span>
        <span style="padding-left:20px">&#9733;{score}</span>
      </div>
    </div>
  </div>
{/if}
