<script>
  // @ts-check
  import { onMount } from 'svelte';
  import Avatar from '../components/Avatar.svelte';
  import { API } from '../constants';
  import { getFetch } from '../helpers/fetch';

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
  .container {
    --width: 61.8%;

    width: var(--width);
    min-height: 100%;
  }

  ul {
    list-style-type: none;

    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    align-items: stretch;
  }

  .text-area {
    height: 100%;
  }

  @media screen and (max-width: 961px) {
    .container {
      --width: 100%;
    }
  }
</style>

<section class="container">
  {#if list}
    <ul>
      {#each list as { text, user }}
        <li>
          <div class="avatar">
            <Avatar size={64} src={user.profile_photo} />
          </div>
          <div class="text-area">{text}</div>
        </li>
      {/each}
    </ul>
  {/if}
</section>
