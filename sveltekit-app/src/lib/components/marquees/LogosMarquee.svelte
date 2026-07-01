<script lang="ts">
  import Image from "$lib/components/element/Image.svelte";
  import Marquee from "svelte-fast-marquee";
  import { inView } from "$lib/actions/inView";
  type Props = {
    data: any[] | null;
    direction?: "left" | "right";
  };

  let { data, direction = "left" }: Props = $props();
  let isVisible = $state(false);
</script>

<div use:inView={(v) => (isVisible = v)}>
  <Marquee
    play={isVisible}
    speed={isVisible ? 40 : 0}
    gap="0"
    autoFill
    {direction}
  >
    <div class="flex items-center gap-5 ml-5 md:gap-20 md:ml-20">
      {#each data as item}
        {#if item && item?.asset}
          <div class="w-12 md:h-10 mix-blend-multiply">
            <Image image={item} fit="contain" />
          </div>
        {/if}
      {/each}
    </div>
  </Marquee>
</div>
