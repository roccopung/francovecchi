<script lang="ts">
  import type { PortableTextBlock } from "@sanity/types";
  import Dot from "$lib/components/svg/Dot.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  type Props = {
    data: PortableTextBlock[];
  };
  let { data }: Props = $props();
</script>

<div class="relative flex typo-2xl font-sans uppercase pt-1">
  <div class="absolute h-[0.9lh] flex items-center"><Dot /></div>
  <h2 class="indent-4 font-bold"><PortableText {data} /></h2>
</div>
