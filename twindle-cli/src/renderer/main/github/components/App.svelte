<script>
 // @ts-check

 export let threads;
 import User from "./User.svelte";
</script>

<style>
:global(.markdown-body) {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
}

:global(.markdown-body h1) {
    padding-bottom: 0.3em;
    font-size: 2em;
    border-bottom: 1px solid #eaecef;
}

:global(.markdown-body h2) {
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid #eaecef;
}

:global(.markdown-body h3) {
    font-size: 1.25em;
}

:global(.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6) {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
}

:global(.markdown-body ul, .markdown-body ol) {
    padding-left: 2em;
}

:global(a) {
    color: #0366d6;
    text-decoration: none;
}

:global(.markdown-body blockquote) {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
}

:global(.markdown-body p, .markdown-body blockquote, .markdown-body ul, .markdown-body ol, .markdown-body dl, .markdown-body table, .markdown-body pre) {
    margin-top: 0;
    margin-bottom: 16px;
}

:global(.markdown-body .highlight) {
    margin-bottom: 16px;
}

:global(.highlight) {
    background-color: #f8f8f8;
}

:global(.markdown-body .highlight pre, .markdown-body pre) {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
}

:global(.markdown-body .highlight pre) {
    margin-bottom: 0;
    word-break: normal;
}

:global(.markdown-body .highlight) {
    margin-bottom: 16px;
}
:global(.markdown-body pre) {
    word-wrap: normal;
        overflow-wrap: normal;
}

:global(.markdown-body table) {
    display: block;
    width: 100%;
    overflow: auto;
}

:global(.markdown-body table tr) {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
}

:global(.markdown-body table th, .markdown-body table td) {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

:global(.markdown-body table img) {
    background-color: transparent;
}

:global(.markdown-body img) {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
}

:global(sub) {
    bottom: -0.25em;
}

:global(sup) {
    top:-0.5em
}

:global(sub, sup) {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

:global(b, strong) {
    font-weight: 600;
}
</style>
<div class="container markdown-body">
    {#each threads as { common, htmlValue }}
        <User {common} />
        <br />
        {@html htmlValue}
    {/each}
</div>
  