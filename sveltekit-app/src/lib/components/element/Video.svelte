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
    loop = false,
    muted = false,
    fullscreen = true,
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

{#if browser && src}
  <media-controller
    class="w-full h-full overflow-hidden"
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
      preload="metadata"
      onloadeddata={(e) => {
        aspectRatio = e.currentTarget.videoWidth / e.currentTarget.videoHeight;
      }}
    ></video>
    {#if posterSrc}
      <media-poster-image
        class="object-cover overflow-hidden z-10"
        slot="poster"
        src={posterSrc}
      ></media-poster-image>
    {/if}
  </media-controller>
{/if}

<style>
  media-controller {
    --media-object-fit: cover;
  }

  media-controller {
    --media-object-fit: cover;
    --media-font: "Roboto";
    --media-control-transition-out: opacity 150ms ease-in;
    --media-control-transition-in: opacity 150ms ease-in;
    --media-background-color: none;
  }

  media-controller > * {
    opacity: 1;
  }
</style>
