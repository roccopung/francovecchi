<script lang="ts">
  import type { ElementImage, ElementVideo } from "$lib/types";
  import Image from "$lib/components/element/Image.svelte";
  import Video from "$lib/components/element/Video.svelte";

  type Props = {
    data: {
      image?: ElementImage;
      video?: ElementVideo;
    };
    controls?: boolean;
    muted?: boolean;
  };

  let { data, controls = false, muted }: Props = $props();

  let video = $derived(data?.video);
  let image = $derived(data?.image);
  let autoplay = $derived(controls === true ? false : true);
  let isMuted = $derived.by(() => {
    if (muted === true) return true;
    if (controls === true) return false;
    return true;
  });
</script>

{#if image?.asset || (video?.url && !(image?.asset && video?.url))}
  {#if video && video?.url}
    <Video {video} {autoplay} muted={isMuted} />
  {:else if image && image?.asset}
    <div class="flex flex-col items-center justify-center w-full">
      <div class="w-full h-full">
        <Image {image} fit="cover" />
      </div>
    </div>
  {/if}
{/if}
