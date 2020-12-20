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
  * {
    user-select: none;
  }

  div {
    --placeholder-bgcolor: rgba(var(--app-color-dark-rgb), 0.15);
    --avatar-color-primary: var(--app-color-primary);

    --easing: var(--app-easing, cubic-bezier(0, 0, 0.2, 1));

    display: inline-block;

    /** --size here comes from inline styling in style attribute of element itself, not defined here
     * See the root element of this component
     */
    width: var(--size);
    height: var(--size);

    background-color: var(--placeholder-bgcolor);

    border-radius: 50%;
    /* box-shadow: 0 0 0 4px var(--avatar-color-primary); */
  }

  img {
    width: 100%;

    object-fit: cover;

    border-radius: inherit;

    transition: opacity 150ms var(--easing);
  }

  img.lazyload {
    opacity: 0;
  }

  div :global(img.lazyloaded) {
    opacity: 1;
  }
</style>

<div style="--size: {size}px">
  <img class:lazyload={lazy} alt="User Avatar" src={!lazy && src} data-src={lazy && src} />
</div>
