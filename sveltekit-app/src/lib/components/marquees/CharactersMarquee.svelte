<script lang="ts">
  import type { MarqueeckOptions } from "@arisbh/marqueeck";
  import Image from "$lib/components/element/Image.svelte";
  import Marqueeck from "@arisbh/marqueeck";
  type Props = {
    data: any[];
  };

  let { data }: Props = $props();

  let items = [...data, ...data];

  const options: MarqueeckOptions = {
    direction: "right",
    speed: 20,
    gap: 0,
    onHover: "none",
  };
</script>

<Marqueeck {options}>
  {#each items as item}
    {#if item && item?.cover}
      <div class="aspect-[4/5] h-40 overflow-hidden rounded-xs">
        <Image image={item?.cover} />
      </div>
    {/if}
  {/each}
</Marqueeck>
