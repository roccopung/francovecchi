<script lang="ts">
  //@ts-nocheck
  import type { LookbookQueryResult } from "$lib/sanity.types";
  import type { PageData } from "./$types";
  import { useQuery } from "@sanity/sveltekit";
  import StackedGallery from "$lib/components/page-builder/_StackedGallery.svelte";
  import PathCallFranco from "$lib/components/svg/PathCallFranco.svelte";
  import CallFranco from "$lib/components/sections/CallFranco.svelte";
  import SeeMore from "$lib/components/SeeMore.svelte";

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
  class="links min-h-[100svh] w-full flex flex-col gap-2 items-center bg-white py-2"
>
  <div class="flex flex-col gap-0.5 items-center text-accent">
    <h1 class="typo-6xl font-slanted uppercase mt-8">Gallery</h1>
    <h2 class="typo-xs uppercase font-mono">What my illustrations look like</h2>
  </div>
  {#if lookbook?.stackedGallery || sectionLoaded}
    <div class="bg-white pt-0.5 h-full 3xl:max-w-[70vw]">
      <StackedGallery section={sectionLoaded} />
    </div>
  {/if}
  {#if lookbook?.stackedGallery?.items && lookbook.stackedGallery.items.length > filteredItems.length}
    <div class="w-full bg-white">
      <SeeMore
        itemsToLoad={lookbook.stackedGallery.items.length > filteredItems.length
          ? 10
          : 0}
        bind:itemsLoaded={itemsToLoad}
      />
    </div>
  {/if}
</main>
{#if lookbook?.callFranco}
  <CallFranco data={lookbook?.callFranco} />
{/if}
