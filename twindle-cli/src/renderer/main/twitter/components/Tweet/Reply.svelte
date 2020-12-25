<script>
  // @ts-check
  /** @type {import("../../../../twitter/types/types").Reply}*/
  export let reply;

  /** @type {import("../../../../twitter/types/types").CommonData} */
  export let common;

  import Tweet from "./Tweet.svelte";

  const { tweet, id, user } = reply;
</script>

<style>
  section {
    break-inside: avoid;
  }

  .question,
  .answer {
    display: flex;

    gap: 0.5rem;
  }

  .question-header {
    padding: 0.5rem 0;

    display: flex;
  }

  .question-user-profile-pic {
    height: 3rem;
    width: auto;

    border-radius: 50%;

    margin: 0.5rem;
  }
</style>

<section>
  <div class="question">
    <div class="question-header">
      <img
        class="question-user-profile-pic"
        src={user.profile_image_url}
        alt="{user.name}'s profile Pic" />
    </div>
    <Tweet data={reply} />
  </div>
  <div class="answer">
    <div class="answer-header">
      <img
        class="question-user-profile-pic"
        src={common.user.profile_image_url}
        alt="{common.user.name}'s profile Pic" />
    </div>
    <Tweet data={reply.answer} />
  </div>
</section>
