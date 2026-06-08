<script lang="ts">
  //@ts-nocheck
  import type { LookbookQueryResult } from "$lib/sanity.types";
  import type { PageData } from "./$types";
  import { useQuery } from "@sanity/sveltekit";
  import StackedGallery from "$lib/components/page-builder/_StackedGallery.svelte";
  import PathCallFranco from "$lib/components/svg/PathCallFranco.svelte";
  import CallFranco from "$lib/components/sections/CallFranco.svelte";

  let { data }: { data: PageData } = $props();
  let query = $derived(useQuery<LookbookQueryResult>(data));
  let lookbook = $derived($query.data);
  let itemsToLoad = $state(3);
  let filteredItems = $derived.by(() => {
    if (!lookbook?.stackedGallery?.items) return [];
    else return lookbook.stackedGallery.items.slice(0, itemsToLoad);
  });
  let sectionLoaded = $derived.by(() => {
    return { items: filteredItems };
  });
</script>

<main
  class="links min-h-[100svh] w-full flex flex-col gap-2 items-center bg-accent"
>
  <div class="flex flex-col gap-0.5 items-center">
    <h1 class="typo-6xl font-slanted uppercase mt-8">Look Book</h1>
    <h2 class="typo-xs uppercase font-mono">What my illustrations look like</h2>
  </div>
  {#if lookbook?.stackedGallery || sectionLoaded}
    <div class="bg-white pt-0.5 h-full">
      <StackedGallery section={sectionLoaded} />
    </div>
  {/if}
</main>
<div class="w-full bg-white p-1">
  <div
    class="border border-black rounded-m flex flex-col items-center justify-center overflow-hidden relative"
  >
    <div class="py-15 flex flex-col gap-0.5 items-center">
      <button
        onclick={() => (itemsToLoad += 10)}
        class="z-10 typo-xs px-3 py-1 font-mono uppercase rounded-full border border-black bg-white cursor-pointer hover:bg-black hover:text-white"
        >See more</button
      >
    </div>
    <div
      class="absolute left-0 w-[150vw] md:w-[200vw] -translate-y-5 -translate-x-2/5 md:-translate-y-10 pointer-events-none"
    >
      <PathCallFranco />
    </div>
  </div>
</div>
{#if lookbook?.callFranco}
  <CallFranco data={lookbook?.callFranco} />
{/if}
