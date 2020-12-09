<script>
  import Avatar from '../Avatar.svelte';

  export let listItem;
  const { user, text } = listItem;
</script>

<style>
  li {
    display: flex;
    align-items: stretch;
  }

  .text-area {
    height: 100%;
  }
</style>

<li>
  <div class="avatar">
    <Avatar size={64} src={user.profile_photo} />
  </div>
  <div class="text-area">{text}</div>
</li>
