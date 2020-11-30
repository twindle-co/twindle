<script>
  import Button from './components/Button.svelte';
</script>

<Button on:click={(e) => console.log(e)} color="primary" variant="contained" class="hello">
  Hello
</Button>
