<script>
  // @ts-check

  // PROPS
  /** @type {'text' | 'contained' | 'outlined'} */
  export let variant = 'text';

  /** @type {'primary' | 'light' | 'default'} */
  export let color = 'default';

  /** @type {boolean} */
  export let disabled = false;

  /** @type {(e: MouseEvent) => void} */
  export let onClick = null;

  /** @type {string} */
  let classes;

  $: {
    // basic processing
    const externalClasses = $$props.class;
    delete $$props.class;

    classes = `button-variant-${variant} button-color-${color} ${externalClasses || ''}`;
  }
</script>

<style>
  button {
    --bgcolor: none;
    --color: var(--app-color-dark);
    --border-color: transparent;

    font-family: var(--app-main-font-family);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color);

    cursor: pointer;

    padding: 0.375rem 1rem;
    margin: 8px;

    background-color: var(--bgcolor);

    border-radius: var(--app-border-radius-small);
    border: solid 1px var(--border-color);
  }

  button.button-variant-contained.button-color-light {
    --color: var(--app-color-light);
    --bgcolor: var(--app-color-light-contrast);
  }

  button.button-variant-contained.button-color-default {
    --color: var(--app-color-light-contrast);
    --bgcolor: var(--app-color-light);
  }

  button.button-variant-contained.button-color-primary {
    --color: var(--app-color-primary-contrast);
    --bgcolor: var(--app-color-primary);
  }

  button.button-variant-outlined.button-color-light {
    --color: var(--app-color-light);
    --border-color: var(--app-color-light);
  }

  button.button-variant-outlined.button-color-default {
    --color: var(--app-color-dark);
    --border-color: var(--app-color-dark);
  }

  button.button-variant-outlined.button-color-primary {
    --color: var(--app-color-primary);
    --border-color: var(--app-color-primary);
  }

  button.button-variant-text.button-color-light {
    --color: var(--app-color-light);
  }

  button.button-variant-text.button-color-default {
    --color: var(--app-color-dark);
  }

  button.button-variant-text.button-color-primary {
    --color: var(--app-color-primary);
  }

  button.disabled {
    --color: rgba(var(--app-color-dark-rgb), 0.3) !important;

    cursor: not-allowed;
  }

  button.disabled.button-variant-contained {
    --bgcolor: rgba(var(--app-color-dark-rgb), 0.15);
  }

  button.disabled.button-variant-outlined {
    --border-color: rgba(var(--app-color-dark-rgb), 0.15);
  }
</style>

<button on:click={onClick} class={classes} class:disabled {...$$props}>
  <slot />
</button>
