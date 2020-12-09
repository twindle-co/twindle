<script>
  // @ts-check
  import { onMount } from 'svelte';
  import { API } from '../../constants';
  import { getFetch } from '../../helpers/fetch';
  import ListItem from './ListItem.svelte';

  let list;
  // let error;

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
    {#each list as listItem}
      <ListItem {listItem} />
    {/each}
  </ul>
{/if}
