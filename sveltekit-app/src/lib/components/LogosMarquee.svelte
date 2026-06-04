<script lang="ts">
  import type { MarqueeckOptions } from "@arisbh/marqueeck";
  import Image from "$lib/components/element/Image.svelte";
  import Marqueeck from "@arisbh/marqueeck";
  type Props = {
    data: any[];
  };

  let { data }: Props = $props();

  const options: MarqueeckOptions = {
    direction: "left",
    speed: 40,
  };
</script>

<Marqueeck {options}>
  <div class="flex items-center gap-20 ml-20">
    {#each data as item}
      {#if item && item?.asset}
        <div class="w-12 md:h-10 mix-blend-multiply">
          <Image image={item} fit="contain" />
        </div>
      {/if}
    {/each}
  </div>
</Marqueeck>
