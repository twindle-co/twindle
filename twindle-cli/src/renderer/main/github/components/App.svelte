<script>
 // @ts-check

 export let threads;
 import User from "./User.svelte";
</script>

<style>
</style>

<main>
    {#each threads as { common, htmlValue }}
        <User {common} />
        <br />
        {@html htmlValue}
    {/each}
</main>
  