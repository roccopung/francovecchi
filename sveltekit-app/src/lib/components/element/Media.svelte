<script lang="ts">
  import type { ElementImage, ElementVideo } from "$lib/sanity.types";
  import Image from "$lib/components/element/Image.svelte";
  import Video from "$lib/components/element/Video.svelte";

  type Props = {
    data: {
      image?: ElementImage;
      video?: ElementVideo;
    };
    controls?: boolean;
    muted?: boolean;
    autoplay?: boolean;
    ratio?: number;
    playing?: boolean;
    fit?: string;
    loop?: boolean;
  };

  let {
    data,
    controls = false,
    muted = true,
    autoplay = false,
    ratio = $bindable(),
    playing = $bindable(false),
    fit = "cover",
    loop = false,
  }: Props = $props();

  let video = $derived(data?.video);
  let image = $derived(data?.image);
</script>

{#if image?.asset || (video?.url && !(image?.asset && video?.url))}
  {#if video && video?.url}
    <div class="flex items-center">
      <Video {loop} {video} {autoplay} {muted} bind:ratio bind:playing />
    </div>
  {:else if image && image?.asset}
    <div class="flex flex-col items-center justify-center w-full h-full">
      <div class="w-full h-full">
        <Image {image} {fit} bind:ratio />
      </div>
    </div>
  {/if}
{/if}
