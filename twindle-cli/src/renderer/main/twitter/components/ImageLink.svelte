<script>
  import LinkSvg from "./LinkSVG.svelte";

  /**
   * @type {Partial<LinkWithImage>}
   */
  export let linkWithImage;
</script>

<style>
  a {
    width: 100%;
  }

  .box {
    width: 100%;
    height: 8.5rem;

    margin: 10px 0;

    border-radius: 0.5rem;

    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);

    background-color: rgba(0, 0, 0, 0.06);

    display: flex;
  }

  img {
    break-inside: avoid;
  }

  .img-container {
    height: 100%;

    border-radius: 0.5rem 0 0 0.5rem;
  }

  .img-container img {
    border-radius: inherit;

    height: 100%;
    width: 8.5rem;

    object-fit: cover;
  }

  .content {
    flex: 1;

    color: initial;

    position: relative;

    padding: 5px 0;
    padding-left: 0.5rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content-heading,
  .content-description,
  .content-domain {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    font-size: 0.95rem;
  }

  .content-description,
  .content-domain {
    color: rgba(0, 0, 0, 0.7);
    font-size: 0.85rem;
  }

  .content-domain {
    display: flex;
    align-items: center;

    width: 100%;
  }

  .content-domain {
    /* width: 0.9rem; */
    fill: rgba(0, 0, 0, 0.7);

    margin-right: 0.5rem;
  }
</style>

{#if linkWithImage}
  <section>
    <div>
      <a href={linkWithImage.expanded_url}>
        <div class="box">
          <div class="img-container">
            <img src={linkWithImage.images[0].url} alt="of the link" />
          </div>
          <div class="content">
            <div class="content-heading">{linkWithImage.title}</div>
            <div class="content-description">{linkWithImage.description}</div>
            <div class="content-domain">
              <LinkSvg />
              {linkWithImage.domain}
            </div>
          </div>
        </div>
      </a>
    </div>
  </section>
{/if}
