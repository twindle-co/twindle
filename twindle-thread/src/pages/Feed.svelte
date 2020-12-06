<script>
  import Avatar from '../components/Avatar.svelte';
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
  <Avatar src="https://pbs.twimg.com/profile_images/759557613445001216/6M2E1l4q_normal.jpg" />
</section>
