<script>
  // @ts-check
  import Header from "./Header.svelte";
  export let threads;
</script>

<style>
</style>

<body class="light sans-serif loaded" style="--font-size:14px;">
  {#each threads as thread}
    <div class="container" style="--line-height:1.6em;" dir="ltr">
      <Header {thread} />
      <hr />

      <div class="content">
        <div class="moz-reader-content">
          {@html thread.html}
        </div>
      </div>
    </div>
    <div style="page-break-after:always" />
  {/each}
</body>
