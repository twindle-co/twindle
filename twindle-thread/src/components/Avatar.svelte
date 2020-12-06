<script>
  import { onMount } from 'svelte';

  /** @type {string} */
  export let src;

  /** @type {boolean} */
  export let lazy = true;

  /** @type {number} */
  export let size = 48;

  onMount(() => {
    if (lazy) {
      import('lazysizes');
    }
  });
</script>

<style>
  div {
    display: inline-block;

    width: var(--size);
    height: var(--size) !important;

    border-radius: 50%;

    object-fit: cover;

    margin: 0.5rem;
  }

  img {
    max-width: 100%;

    border-radius: inherit;
  }
</style>

<div>
  <img
    class:lazyload={lazy}
    alt="User Avatar"
    src={!lazy && src}
    data-src={lazy && src}
    style="--size: {size}px" />
</div>
