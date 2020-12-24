<script>
  // @ts-check
  export let comment;

  const { username, created_at, text, comments, level, index } = comment;

  const indented = level - 1 === 0 && !!index;

  const pageBreak = indented && comments.length > 0;

  const borderTop = indented && !comment.length;

  const nested = level - 1 > 0;
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
