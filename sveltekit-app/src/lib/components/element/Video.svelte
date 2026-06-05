<script lang="ts">
  // @ts-nocheck
  import "media-chrome";
  import { urlFor } from "$lib/sanity/image";
  import { getImageDimensions } from "@sanity/asset-utils";
  import { innerWidth, innerHeight } from "svelte/reactivity/window";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { browser } from "$app/environment";

  let {
    video,
    controls = true,
    loop = false,
    muted = false,
    autoplay = true,
    ratio = "",
  } = $props();

  // let componentsLoaded = $state(false);
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

  let posterAsset = $derived(
    innerWidth < 768 && video?.poster?.mobileImage
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

  let player = $state(null);
  let aspectRatio = $state(1.77777778);
  let isPlaying = $state(false);
  let isPaused = $state(false);
</script>

<media-controller
  class="w-full h-full overflow-hidden"
  class:pointer-events-none={controls == false}
  class:has-poster={posterSrc}
  style="aspect-ratio: {aspectRatio};"
  autohide="-1"
>
  <video
    class="w-full h-full object-cover"
    bind:this={player}
    {src}
    slot="media"
    playsinline
    autoplay={isAutoplay}
    loop={isLoop}
    muted={isMuted}
  ></video>

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
      class="px-2 py-1 bg-accent text-black typo-xs font-mono rounded-full border-b border-1 uppercase"
      slot="play"
    >
      Play
    </div>
    <div
      class="px-2 py-1 bg-accent text-black typo-xs font-mono rounded-full border-b border-1 uppercase"
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

  media-controller.has-poster:not([mediahasplayed]) video {
    opacity: 0;
  }

  media-controller.has-poster[mediahasplayed] video {
    opacity: 1;
  }

  media-play-button:not([mediapaused]) {
    display: none;
    background: none;
  }
</style>
