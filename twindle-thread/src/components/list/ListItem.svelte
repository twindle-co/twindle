<script>
  // @ts-check

  import { createEventDispatcher } from 'svelte';
  import Avatar from '../Avatar.svelte';
  import { listElStore } from './listElStore';

  /** @type {IListItemData}*/
  export let listItem;

  export let selectable = true;

  export let selected = false;

  export let focusAble = false;

  /** @type {number} */
  export let index;

  /** @type {HTMLDivElement}*/
  let ref;

  const { user, text } = listItem;

  // EVENTS
  const dispatch = createEventDispatcher();

  $: focusAble && ref?.focus();

  $: $listElStore[index] = ref;
</script>

<style>
  .container {
    display: flex;
    align-items: stretch;

    border-radius: 0.5rem;

    margin: 0.4rem 0.3rem;
    padding: 0.1rem 0.2rem;
  }

  .container.selectable:hover,
  .container.selectable:focus-visible {
    background-color: rgba(var(--app-color-primary-rgb), 0.2);
  }

  .container.selectable:focus-visible {
    box-shadow: 0 0 0 4px rgba(var(--app-color-primary-rgb), 0.5);
  }

  .text-area {
    height: 100%;

    white-space: nowrap;
    text-overflow: ellipsis;

    overflow: hidden;

    width: 100%;
  }

  .avatar {
    border: none;

    display: flex;
    align-items: center;

    margin: 0;
    padding: 0;

    height: fit-content;
    background-color: transparent;

    border-radius: 50%;

    cursor: pointer;
  }
</style>

<div
  tabindex={selectable && focusAble ? 0 : -1}
  bind:this={ref}
  class:selectable
  class:selected
  on:keydown
  role="listitem"
  class="container">
  <div class="avatar">
    <Avatar size={54} src={user.profile_photo} />
  </div>
  <div class="text-area">{text}</div>
</div>
