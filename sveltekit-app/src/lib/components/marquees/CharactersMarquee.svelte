<script lang="ts">
  import Image from "$lib/components/element/Image.svelte";
  import Marquee from "svelte-fast-marquee";
  import { inView } from "$lib/actions/inView";

  type Props = {
    data: any[];
  };

  let { data }: Props = $props();
  let isVisible = $state(false);

  let items = $derived([...data, ...data]);
</script>

<div use:inView={(v) => (isVisible = v)}>
  <Marquee
    play={isVisible}
    speed={isVisible ? 30 : 0}
    gap="0"
    autoFill
    direction="right"
  >
    {#each items as item}
      {#if item && item?.cover}
        <div class="image-container aspect-[7/8] h-40 overflow-hidden -mx-5">
          <Image image={item?.cover} />
        </div>
      {/if}
    {/each}
  </Marquee>
</div>

<style>
  .image-container {
    clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
  }
</style>
