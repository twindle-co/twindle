<script context="module">
</script>

<script>
  // @ts-check
  import { onMount } from 'svelte';
  import { API } from '../../constants';
  import { getFetch } from '../../helpers/fetch';
  import { listElStore } from './listElStore';
  import ListItem from './ListItem.svelte';

  let list;
  // let error;

  let listItemsEls = [];

  let focusableIndex = 0;

  async function getThreadsList() {
    const { data, error } = await getFetch(API.GET_THREADS_LISTS, {
      page: 1,
      limit: 30,
      by: 'popular:desc',
    });

    if (error === 'invalid-value-of-by') {
      // Handle errors here
    }

    if (error === 'invalid-value-of-page') {
      // Handle errors here
    }

    if (error === 'invalid-value-of-limit') {
      // Handle errors here
    }

    if (error === 'unable-to-get-threads-list') {
      // Handle errors here
    }

    // All errors handled. Now do the thing here
    list = data;
  }

  /**
   *
   * @param {KeyboardEvent} e
   */
  function handleKeyboard(e) {
    const responses = {
      ArrowUp: -1,
      ArrowDown: +1,
    };

    if (e.key in responses) {
      const num = responses[e.key];

      focusableIndex = Math.min(
        Object.keys($listElStore).length - 1,
        Math.max(0, focusableIndex + num)
      );

      $listElStore[focusableIndex].focus();
    }
  }

  onMount(async () => {
    await getThreadsList();
  });
</script>

<style>
  ul {
    list-style-type: none;

    margin: 0;
    padding: 0;
  }
</style>

{#if list}
  <ul>
    {#each list as listItem, i}
      <ListItem
        index={i}
        focusAble={focusableIndex === i}
        bind:this={listItemsEls[i]}
        on:keydown={handleKeyboard}
        {listItem} />
    {/each}
  </ul>
{/if}
