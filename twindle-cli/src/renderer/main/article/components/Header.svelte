<script>
    // @ts-check
    export let thread;
    const { url, urldomain, title, author, image } = thread;
</script>

<main>
    <div class="header reader-header">
        <a class="domain reader-domain" href='{url}'>{urldomain}</a>
        <div class="domain-border"></div>
        <h1 class="reader-title">{title}</h1>
        {#if author}
        <div class="credits reader-credits">{author}</div>
        {/if}
        {#if image}
        <div class="banner">
          <img src="{image}" style='width:100%' />
        </div>
        {/if}
        <div class="meta-data">
          <div class="reader-estimated-time"></div>
        </div>
      </div>
</main>