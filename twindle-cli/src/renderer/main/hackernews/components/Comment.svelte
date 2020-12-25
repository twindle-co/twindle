<script>
  // @ts-check
  export let comment;

  const { username, created_at, text, comments, level, index } = comment;

  const indented = level - 1 === 0 && !!index;

  const pageBreak = indented && comments.length > 0;

  const borderTop = indented && !comment.length;

  const nested = !indented && level - 1 > 0;
</script>

<style>
  .page-break {
    page-break-before: always;
  }

  .border-top {
    border-top: 1px solid #ddd;
  }

  .padding-left {
    padding-left: 35px;
  }

  .cmmnt,
  :global(ul .cmmnt, ul ul .cmmnt) {
    display: block;
    position: relative; /*padding-left: 35px; border-top: 1px solid #ddd;*/
  }

  .cmmnt .cmmnt-content {
    padding: 0px 3px;
    padding-bottom: 12px;
    padding-top: 8px;
  }

  .cmmnt .cmmnt-content header {
    font-size: 2em;
    display: block;
    margin-bottom: 8px;
  }
  .cmmnt .cmmnt-content header .pubdate {
    color: #777;
  }
  .cmmnt .cmmnt-content header .userlink {
    font-weight: bold;
  }

  .cmmnt .replies {
    margin-bottom: 7px;
  }
</style>

<div class:page-break={pageBreak} class:border-top={borderTop} class:padding-left={nested}>
  <li class="cmmnt">
    <div class="cmmnt-content">
      <header>
        <a class="userlink" href="https://news.ycombinator.com/user?id={username}">{username}</a>
        -
        <span class="pubdate">{created_at}</span>
      </header>
      <p>
        {@html text}
      </p>
    </div>
    {#if comments}
      <ul class="replies">
        {#each comments as comment}
          <svelte:self {comment} />
        {/each}
      </ul>
    {/if}
  </li>
</div>
