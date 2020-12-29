<script>
  // @ts-check
  export let common;

  const { image, url, title, created_at, user, numComments, score, id } = common;
</script>

<style>
  #common-info {
    margin-left: auto;
    margin-right: auto;
    max-width: 700px;
    max-width: 720px;
  }

  .article-info {
    margin: 20px auto 10px;
    padding: 40px 30px;
    background: #191c1d;
    color: #fff;
  }

  .article-info .avatar {
    vertical-align: middle;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 10%;
    float: left;
  }

  .article-info-content {
    margin-left: 135px;
  }

  .clearfix::after {
    display: block;
    content: "";
    clear: both;
  }

  .avatar {
    position: absolute;
    top: 8px;
    left: 0;
  }

  .article-name {
    margin-top: 0;
    font-size: 24px;
    padding-top: 0;
    padding-bottom: 15px;
    text-transform: uppercase;
  }

  .author-bio-text {
    font-size: 16px;
    line-height: 24px;
    float: left;
    width: 100%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    padding-top: 20px;
  }

  .author-bio-text a,
  .author-bio-text a:hover {
    color: #f8b147;
    text-decoration: none;
    position: relative;
    white-space: nowrap;
  }

  .author-bio-text a::after {
    background: #f8b147;
  }

  .author-bio-text a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    background: #fcbc3e;
    width: 0;
  }
</style>

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
