<script>
  import List from '../components/list/List.svelte';
</script>

<style>
  .container {
    --width: 61.8%;

    width: var(--width);
    min-height: 100%;
  }

  @media screen and (max-width: 961px) {
    .container {
      --width: 100%;
    }
  }
</style>

<section class="container">
  <List />
</section>
