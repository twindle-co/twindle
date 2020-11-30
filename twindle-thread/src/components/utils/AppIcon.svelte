<script>
  // @ts-check

  /** @type {number} */
  export let size = 24;

  /** @type {string} */
  export let path;
</script>

<svg
  {...$$props}
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox={`0 0 24 24`}>
  <path d={path} />
</svg>
