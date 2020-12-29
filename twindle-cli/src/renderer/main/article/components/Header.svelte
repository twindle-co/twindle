<script>
  // @ts-check
  export let thread;
  const { url, urldomain, title, author, image } = thread;
</script>
<style>
/* Header */

:global(.header) {
  text-align: start;
  /*display: none;*/
}

:global(.domain) {
  font-size: 0.9em;
  line-height: 1.48em;
  padding-bottom: 4px;
  font-family: Helvetica, Arial, sans-serif;
  text-decoration: none;
  border-bottom: 1px solid;
  color: #0095dd;
}

:global(.header > h1) {
  font-size: 1.6em;
  line-height: 1.25em;
  width: 100%;
  margin: 30px 0;
  padding: 0;
}

:global(.header > .credits) {
  font-size: 0.9em;
  line-height: 1.48em;
  margin: 0 0 10px;
  padding: 0;
  font-style: italic;
}

:global(.header > .meta-data) {
  font-size: 0.65em;
  margin: 0 0 15px;
}

:global(.reader-estimated-time) {
  text-align: match-parent;
}

</style>

<div class="header reader-header">
  <a class="domain reader-domain" href={url}>{urldomain}</a>
  <div class="domain-border" />
  <h1 class="reader-title">{title}</h1>
  {#if author}
    <div class="credits reader-credits">{author}</div>
  {/if}
  {#if image}
    <div class="banner"><img src={image} alt="Not found" style="width:100%" /></div>
  {/if}
  <div class="meta-data">
    <div class="reader-estimated-time" />
  </div>
</div>

