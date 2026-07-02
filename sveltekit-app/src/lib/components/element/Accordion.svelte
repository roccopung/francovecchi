<script lang="ts">
  import type { BlockContent } from "$lib/sanity.types";
  import PortableText from "$lib/components/element/PortableText.svelte";
  type Props = {
    data: {
      title?: string;
      content?: BlockContent;
    };
    open: boolean;
    ontoggle: () => void;
  };
  let { data, open = false, ontoggle }: Props = $props();
  let contentHeight = $state(0);
</script>

<button
  onclick={ontoggle}
  class="border-2 border-black rounded-m p-2 pt-2 pb-1 bg-white not-first:-mt-[1px] even:-mt-[2px]"
>
  <div
    class="flex gap-3 whitespace-nowrap typo-xl font-medium font-sans items-center pb-1"
  >
    <div>{open ? "-" : "+"}</div>
    <div>{data.title}</div>
  </div>
  <div
    class="font-sans typo-s h-auto max-h-0 overflow-hidden text-left transition-medium content"
    style="max-height: {open ? contentHeight : '0'}px;"
  >
    <div bind:clientHeight={contentHeight}>
      <PortableText data={data.content} />
    </div>
  </div>
</button>

<style>
  .content {
    transition-timing-function: cubic-bezier(0.51, 0.19, 0.1, 1);
  }
</style>
