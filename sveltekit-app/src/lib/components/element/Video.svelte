<script lang="ts">
  import { urlFor } from "$lib/sanity/image";
  import { getImageDimensions } from "@sanity/asset-utils";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let {
    video,
    controls = true,
    loop = false,
    muted = false,
    autoplay = true,
    ratio = null,
  } = $props();

  let viewportWidth = $state(768);

  let isAutoplay = $derived(
    video?.autoplay === true || autoplay === true ? true : false,
  );
  let isMuted = $derived(
    video?.autoplay === true || muted === true ? true : false,
  );
  let isLoop = $derived(
    video?.autoplay === true || loop === true || autoplay === true
      ? true
      : false,
  );

  let src = $derived(video?.url);

  let srcType = $derived.by(() => {
    if (!src) return null;

    if (src.includes("youtube.com") || src.includes("youtu.be")) {
      return "youtube";
    } else if (src.includes("vimeo.com")) {
      return "vimeo";
    } else if (src.includes("video.m3u8")) {
      return "hls";
    } else {
      return "default";
    }
  });

  let posterAsset = $derived(
    viewportWidth < 768 && video?.poster?.mobileImage
      ? video?.poster?.mobileImage.asset
      : video?.poster?.asset,
  );

  let posterDimensions = $derived(
    posterAsset ? getImageDimensions(posterAsset) : { width: 16, height: 9 },
  );

  let posterSrc = $derived(
    posterAsset
      ? urlFor(posterAsset).width(posterDimensions.width).url() + "&auto=format"
      : null,
  );

  let player: HTMLVideoElement | undefined = $state();
  let controller: Element | undefined = $state();
  let aspectRatio = $derived(ratio ?? 1.77777778);

  onMount(() => {
    if (controller && player && browser) {
      player.muted = isMuted;
      player.autoplay = isAutoplay;
      player.loop = isLoop;
    }
  });

  onMount(async () => {
    if (browser) {
      await Promise.all([
        import("media-chrome"),
        import("youtube-video-element"),
        import("vimeo-video-element"),
      ]);
    }
  });
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<media-controller
  bind:this={controller}
  class="w-full h-full overflow-hidden"
  class:has-poster={posterSrc}
  style="aspect-ratio: {aspectRatio};"
  autohide="-1"
>
  {#if srcType === "vimeo"}
    <vimeo-video
      class="w-full h-full object-cover"
      bind:this={player}
      {src}
      slot="media"
      playsinline
    ></vimeo-video>
  {:else if srcType === "youtube"}
    <youtube-video
      class="w-full h-full object-cover"
      bind:this={player}
      {src}
      slot="media"
      playsinline
    ></youtube-video>
  {:else if srcType === "default"}
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
      class="w-full h-full object-cover"
      class:pointer-events-none={controls == false}
      bind:this={player}
      {src}
      slot="media"
      playsinline
    ></video>
  {/if}

  {#if posterSrc}
    <media-poster-image
      class="object-cover overflow-hidden z-10"
      slot="poster"
      src={posterSrc}
    ></media-poster-image>
    <div class="overlay pointer-events-none"></div>
  {/if}

  <media-play-button
    class="z-20"
    class:hidden={autoplay == true}
    slot="centered-chrome"
    notooltip
  >
    <div
      class="px-2 py-1 bg-accent text-black typo-xs font-mono rounded-full border-b border-2 uppercase"
      slot="play"
    >
      Play
    </div>
    <div
      class="px-2 py-1 bg-accent text-black typo-xs font-mono rounded-full border-b border-2 uppercase"
      slot="pause"
    >
      Pause
    </div>
  </media-play-button>
</media-controller>

<style>
  .overlay {
    background-color: black;
    width: 100%;
    height: 100%;
    z-index: 11;
    opacity: 0.2;
  }
  media-controller {
    --media-object-fit: cover;
    display: block;
  }

  media-controller {
    --media-control-transition-out: opacity 150ms ease-in;
    --media-control-transition-in: opacity 150ms ease-in;
    --media-background-color: transparent;
    --media-control-background: none;
    --media-control-hover-background: none;
  }

  media-play-button:not([mediapaused]) {
    display: none;
    background: none;
  }

  :global(media-controller.has-poster:not([mediahasplayed]) video) {
    opacity: 0;
  }

  :global(media-controller.has-poster[mediahasplayed] video) {
    opacity: 1;
  }
</style>
