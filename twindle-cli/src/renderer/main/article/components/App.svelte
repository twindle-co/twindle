<script>
  // @ts-check
  import Header from "./Header.svelte";
  export let threads;
</script>

<style>
  :root {
    --body-padding: 64px;
    --popup-border: rgba(0, 0, 0, 0.12);
    --opaque-popup-border: #e0e0e0;
    --popup-shadow: rgba(49, 49, 49, 0.3);
    --grey-90-a10: rgba(12, 12, 13, 0.1);
    --grey-90-a20: rgba(12, 12, 13, 0.2);
    --grey-90-a30: rgba(12, 12, 13, 0.3);
    --grey-90-a80: rgba(12, 12, 13, 0.8);
    --grey-30: #d7d7db;
    --blue-40: #45a1ff;
    --blue-40-a30: rgba(69, 161, 255, 0.3);
    --blue-60: #0060df;
    --active-color: #0b83ff;
    --font-size: 6px;
    --content-width: 100em;
    --line-height: 1.6em;
    --tooltip-background: var(--grey-90-a80);
    --tooltip-foreground: white;
    --toolbar-button-hover: var(--grey-90-a10);
    --toolbar-button-active: var(--grey-90-a20);
  }

  :global(main) {
    --main-background: #fff;
    --main-foreground: #333;
    --toolbar-border: var(--grey-90-a20);
    --toolbar-box-shadow: var(--grey-90-a10);
    --popup-button-hover: hsla(0, 0%, 70%, 0.4);
    --popup-button-active: hsla(240, 5%, 5%, 0.15);
    --popup-bgcolor: white;
    --popup-button: #edecf0;
    --selected-fonttype-background: var(--blue-40-a30);
    --selected-border: var(--blue-40);
    --popup-line: var(--grey-30);
    --font-value-border: var(--grey-30);
    --font-color: #000000;
    --icon-fill: #3b3b3c;
    --icon-disabled-fill: #8080807f;
    /* light colours */
  }
  :global(main) {
    margin: 0;
    /* padding: var(--body-padding); */
    background-color: var(--main-background);
    color: var(--main-foreground);
    transition: color 0.4s, background-color 0.4s;
    font-family: Helvetica, Arial, sans-serif;
  }
  :global(.container) {
    margin: 0 auto;
    font-size: var(--font-size);
    max-width: var(--content-width);
    line-height: var(--line-height);
  }

  /* Override some controls and content styles based on color scheme */

  :global(main > .container > .header > .domain) {
    border-bottom-color: #333333 !important;
  }

  :global(main blockquote) {
    border-inline-start: 2px solid #333333 !important;
  }
  /*======= Article content =======*/

  /* Note that any class names from the original article that we want to match on
   * must be added to CLASSES_TO_PRESERVE in ReaderMode.jsm, so that
   * Readability.js doesn't strip them out */

  :global(.moz-reader-content) {
    /*display: none;*/
    font-size: 1em;
  }

  @media print {
    :global(.moz-reader-content p, .moz-reader-content code, .moz-reader-content
        pre, .moz-reader-content blockquote, .moz-reader-content ul, .moz-reader-content
        ol, .moz-reader-content li, .moz-reader-content figure, .moz-reader-content .wp-caption) {
      margin: 0 0 10px !important;
      padding: 0 !important;
    }
  }

  :global(.moz-reader-content h1, .moz-reader-content h2, .moz-reader-content h3) {
    font-weight: bold;
  }

  :global(.moz-reader-content h1) {
    font-size: 1.6em;
    line-height: 1.25em;
  }

  :global(.moz-reader-content h2) {
    font-size: 1.2em;
    line-height: 1.51em;
  }

  :global(.moz-reader-content h3) {
    font-size: 1em;
    line-height: 1.66em;
  }

  :global(.moz-reader-content a:link) {
    text-decoration: underline;
    font-weight: normal;
  }

  :global(.moz-reader-content a:link, .moz-reader-content a:link:hover, .moz-reader-content
      a:link:active) {
    color: #0095dd;
  }

  :global(.moz-reader-content a:visited) {
    color: #c2e;
  }

  :global(.moz-reader-content *) {
    max-width: 100%;
    height: auto;
  }

  :global(.moz-reader-content p, .moz-reader-content p, .moz-reader-content
      code, .moz-reader-content pre, .moz-reader-content blockquote, .moz-reader-content
      ul, .moz-reader-content ol, .moz-reader-content li, .moz-reader-content
      figure, .moz-reader-content .wp-caption) {
    margin: -10px -10px 20px;
    padding: 10px;
    border-radius: 5px;
  }

  :global(.moz-reader-content li) {
    margin-bottom: 0;
  }

  :global(.moz-reader-content li > ul, .moz-reader-content li > ol) {
    margin-bottom: -10px;
  }

  :global(.moz-reader-content p > img:only-child, .moz-reader-content
      p
      > a:only-child
      > img:only-child, .moz-reader-content .wp-caption img, .moz-reader-content figure img) {
    display: block;
  }

  :global(.moz-reader-content img[moz-reader-center]) {
    margin-inline: auto;
  }

  :global(.moz-reader-content .caption, .moz-reader-content
      .wp-caption-text
      .moz-reader-content
      figcaption) {
    font-size: 0.9em;
    line-height: 1.48em;
    font-style: italic;
  }

  :global(.moz-reader-content code, .moz-reader-content pre) {
    white-space: pre-wrap;
    font-size: 0.8em;
    line-height: 0.8em;
  }

  :global(.moz-reader-content blockquote) {
    padding: 0;
    padding-inline-start: 16px;
  }

  :global(.moz-reader-content ul, .moz-reader-content ol) {
    padding: 0;
  }

  :global(.moz-reader-content ul) {
    padding-inline-start: 30px;
    list-style: disc;
  }

  :global(.moz-reader-content ol) {
    padding-inline-start: 30px;
    list-style: decimal;
  }

  :global(table, th, td) {
    border: 1px solid currentColor;
    border-collapse: collapse;
    padding: 6px;
    vertical-align: top;
  }

  :global(table) {
    margin: 5px;
  }

  /* Visually hide (but don't display: none) screen reader elements */
  :global(.moz-reader-content .visually-hidden, .moz-reader-content
      .visuallyhidden, .moz-reader-content .sr-only) {
    display: inline-block;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    border-width: 0;
  }

  /* Hide elements with common "hidden" class names */
  :global(.moz-reader-content .hidden, .moz-reader-content .invisible) {
    display: none;
  }

  /* Enforce wordpress and similar emoji/smileys aren't sized to be full-width,
   * see bug 1399616 for context. */
  :global(.moz-reader-content img.wp-smiley, .moz-reader-content img.emoji) {
    display: inline-block;
    border-width: 0;
    /* height: auto is implied from `.moz-reader-content *` rule. */
    width: 1em;
    margin: 0 0.07em;
    padding: 0;
  }

  :global(.reader-show-element) {
    display: initial;
  }
</style>

<main style="--font-size:16px;">
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
</main>
