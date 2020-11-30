<script>
  // @ts-check

  /** @type {number} */
  export let size = 24;

  /** @type {string} */
  export let path;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  style="width: {size / 16}rem; height: auto;"
  viewBox={`0 0 24 24`}
  {...$$props}>
  <path d={path} />
</svg>
