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
  <Marquee play={isVisible} speed={40} gap="0" autoFill {direction}>
    <div class="flex items-center gap-5 ml-5 md:gap-20 md:ml-20 my-1">
      {#each data ?? [] as item (item._key)}
        {#if item?.asset}
          <div class="w-8 h-5 md:w-12 md:h-10">
            <Image image={item} fit="contain" lazy />
          </div>
        {/if}
      {/each}
    </div>
  </Marquee>
</div>
