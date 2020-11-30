<script>
  import Button from './components/Button.svelte';
  import AppIcon from './components/utils/AppIcon.svelte';

  import { mdiPlus } from '@mdi/js';
  import IconButton from './components/IconButton.svelte';
</script>

<Button on:click={(e) => console.log(e)} color="primary" variant="contained" class="hello">
  <span slot="icon-start">
    <AppIcon size={20} path={mdiPlus} />
  </span>
  Hello
  <span slot="icon-end">
    <AppIcon size={20} path={mdiPlus} />
  </span>
</Button>

<IconButton size="small" color="default">
  <AppIcon path={mdiPlus} />
</IconButton>
