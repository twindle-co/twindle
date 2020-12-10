<script>
  // @ts-check

  // PROPS
  export let disabled = false;

  /** @type {'small' | 'medium'} */
  export let size = 'small';

  /** @type {'default' | 'light' | 'primary'} */
  export let color = 'default';

  /** @type {string} */
  let classes;

  $: {
    const externalClass = $$props.class;
    delete $$props.class;

    classes = `color-${color} ${externalClass || ''}`;
  }
</script>

<style>
  button {
    /* Internal properties */
    --font-size: 1.25rem;
    --color: rgba(var(--button-color-dark-rgb), 0.6);
    --bgcolor: transparent;
    --focus-ring-color: transparent;

    /* External properties */
    --button-color-dark-rgb: var(--app-color-dark-rgb);
    --button-color-dark-light: var(--app-color-light-rgb);

    --button-color-primary: var(--app-color-primary);
    --button-color-primary-rgb: var(--app-color-primary-rgb);

    border: 0;
    border-radius: 50%;

    cursor: pointer;

    margin: 8px;
    padding: 0.5rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;

    position: relative;

    user-select: none;

    vertical-align: middle;

    font-size: var(--font-size);
    color: var(--color);
    fill: var(--color);
    text-decoration: none;
    text-align: center;

    background-color: var(--bgcolor);

    transition: background-color 150ms ease-in, box-shadow 150ms ease-in;
  }

  button:focus {
    box-shadow: 0 0 0 3px var(--focus-ring-color);
  }

  button.size-small {
    --font-size: 1.25rem;
  }

  button.size-medium {
    --font-size: 1.5rem;
  }

  button.color-light {
    --color: rgba(var(--button-color-dark-light), 0.6);
  }

  button.color-primary {
    --color: var(--button-color-primary);
  }

  button.color-default:hover {
    --bgcolor: rgba(var(--button-color-dark-rgb), 0.15);
  }

  button.color-light:hover {
    --bgcolor: rgba(var(--button-color-light-rgb), 0.15);
  }

  button.color-primary:hover {
    --bgcolor: rgba(var(--button-color-primary-rgb), 0.15);
  }

  button.color-default:focus {
    --focus-ring-color: rgba(var(--button-color-dark-rgb), 0.4)
  }

  button.color-light:focus {
    --focus-ring-color: rgba(var(--button-color-light-rgb), 0.4)
  }

  button.color-primary:focus {
    --focus-ring-color: rgba(var(--button-color-primary-rgb), 0.4)
  }

  :global(svg) {
    font-size: var(--font-size)
  }
</style>

<button
  class={classes}
  class:disabled
  class:size-medium={size === 'medium'}
  class:size-small={size === 'small'}
  {...$$props}
  >
  <slot />
</button>
