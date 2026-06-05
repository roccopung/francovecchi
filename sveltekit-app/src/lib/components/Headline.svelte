<script lang="ts">
  import type { PortableTextBlock } from "@sanity/types";
  import Dot from "$lib/components/svg/Dot.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  type Props = {
    data: PortableTextBlock[] | string;
  };
  let { data }: Props = $props();
</script>

<div class="relative flex typo-2xl font-sans uppercase pt-1">
  <div class="absolute aspect-square h-[1lh] flex p-[0.15lh]"><Dot /></div>
  <h2 class="indent-5 font-bold">
    {#if typeof data === "string"}{data}
    {:else}<PortableText {data} />{/if}
  </h2>
</div>
