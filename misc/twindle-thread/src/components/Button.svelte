<script>
  // @ts-check

  // PROPS
  /** @type {'text' | 'contained' | 'outlined'} */
  export let variant = 'text';

  /** @type {'primary' | 'light' | 'default'} */
  export let color = 'default';

  /** @type {boolean} */
  export let disabled = false;

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
    /* Private variables. Shouldn't be set from outside */
    --bgcolor: none;
    --color: var(--button-color-dark);
    --border-color: transparent;
    --focus-ring-color: var(--button-color-dark);

    /* Redefining variables here so they can defined for this specific component */
    --button-main-font-family: var(--app-main-font-family);
    --button-border-radius: var(--app-border-radius-small);

    --button-color-light: var(--app-color-light);
    --button-color-light-contrast: var(--app-color-light-contrast);
    --button-color-light-rgb: var(--app-color-light-rgb);

    --button-color-dark: var(--app-color-dark);
    --button-color-dark-rgb: var(--app-color-dark-rgb);

    --button-color-primary: var(--app-color-primary);
    --button-color-primary-contrast: var(--app-color-primary-contrast);
    --button-color-primary-rgb: var(--app-color-primary-rgb);

    display: flex;
    align-items: center;

    width: max-content;

    font-family: var(--button-main-font-family);
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.75;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color);
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;

    white-space: nowrap;

    user-select: none;
    vertical-align: top;
    vertical-align: -webkit-baseline-middle;
    pointer-events: auto;

    font-kerning: none;

    transition: background-color 150ms ease-in, box-shadow 150ms ease-in;

    cursor: pointer;

    padding: 0.375rem 1rem;
    margin: 8px;

    background-color: var(--bgcolor);

    border-radius: var(--button-border-radius);
    border: solid 1px var(--border-color);
  }

  button:focus {
    box-shadow: 0 0 0 4px var(--focus-ring-color) !important;
  }

  button.button-variant-contained.button-color-light {
    --color: var(--button-color-light);
    --bgcolor: var(--button-color-light-contrast);
  }

  button.button-variant-contained.button-color-default {
    --color: var(--button-color-light-contrast);
    --bgcolor: var(--button-color-light);
  }

  button.button-variant-contained.button-color-primary {
    --color: var(--button-color-primary-contrast);
    --bgcolor: var(--button-color-primary);
  }

  button.button-variant-outlined.button-color-light {
    --color: var(--button-color-light);
    --border-color: var(--button-color-light);
  }

  button.button-variant-outlined.button-color-default {
    --color: var(--button-color-dark);
    --border-color: var(--button-color-dark);
  }

  button.button-variant-outlined.button-color-primary {
    --color: var(--button-color-primary);
    --border-color: var(--button-color-primary);
  }

  button.button-variant-text.button-color-light {
    --color: var(--button-color-light);
  }

  button.button-variant-text.button-color-default {
    --color: var(--button-color-dark);
  }

  button.button-variant-text.button-color-primary {
    --color: var(--button-color-primary);
  }

  /* Disabled states */
  button.disabled {
    --color: rgba(var(--button-color-dark-rgb), 0.3) !important;

    cursor: not-allowed;
  }

  button.disabled.button-variant-contained {
    --bgcolor: rgba(var(--button-color-dark-rgb), 0.15);
  }

  button.disabled.button-variant-outlined {
    --border-color: rgba(var(--button-color-dark-rgb), 0.15);
  }

  /* Hover states */
  button.button-variant-text.button-color-light:hover,
  button.button-variant-outlined.button-color-light:hover {
    --bgcolor: rgba(var(--button-color-light-rgb), 0.08);
  }

  button.button-variant-text.button-color-default:hover,
  button.button-variant-outlined.button-color-default:hover {
    --bgcolor: rgba(var(--button-color-dark-rgb), 0.08);
  }

  button.button-variant-text.button-color-primary:hover,
  button.button-variant-outlined.button-color-primary:hover {
    --bgcolor: rgba(var(--button-color-primary-rgb), 0.08);
  }

  button.button-variant-contained.button-color-light:hover {
    --bgcolor: rgba(var(--button-color-light-rgb), 0.85);
  }

  button.button-variant-contained.button-color-default:hover {
    --bgcolor: rgba(var(--button-color-dark-rgb), 0.85);
  }

  button.button-variant-contained.button-color-primary:hover {
    --bgcolor: rgba(var(--button-color-primary-rgb), 0.85);
  }

  button.button-color-light:focus {
    --focus-ring-color: rgba(var(--button-color-light-rgb), 0.4);
  }

  button.button-color-default:focus {
    --focus-ring-color: rgba(var(--button-color-dark-rgb), 0.4);
  }

  button.button-color-primary:focus {
    --focus-ring-color: rgba(var(--button-color-primary-rgb), 0.4);
  }

  :global(button > *, button > *) {
    display: flex;
    align-items: center;
  }

  :global([slot]) {
    fill: var(--color);
  }

  :global([slot='icon-start'] svg) {
    margin-left: -6px;
    margin-right: 4px;
  }

  :global([slot='icon-end'] svg) {
    margin-left: 4px;
    margin-right: -5px;
  }
</style>

<button on:click class={classes} class:disabled {...$$props}>
  <slot name="icon-start" />
  <slot />
  <slot name="icon-end" />
</button>
