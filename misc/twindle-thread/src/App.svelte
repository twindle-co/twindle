<script>
  // @ts-check
  import { Router, Route } from 'svelte-routing';
  import Feed from './pages/Feed.svelte';
</script>

<style>
  /** This is the direct child of `body`*/
  main {
    /** Always keep this to make it stretch cross-axis
     * https://stackoverflow.com/questions/29467660/how-to-stretch-children-to-fill-cross-axis
     */
    flex: 1;

    display: flex;
    justify-content: center;
  }
</style>

<main>
  <Router>
    <Route path="/" component={Feed} />
  </Router>
</main>
