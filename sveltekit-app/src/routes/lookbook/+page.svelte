<script lang="ts">
  import type { LookbookQueryResult } from "$lib/sanity.types";
  import type { PageData } from "./$types";
  import { useQuery } from "@sanity/sveltekit";
  import StackedGallery from "$lib/components/page-builder/_StackedGallery.svelte";

  let { data }: { data: PageData } = $props();
  let query = $derived(useQuery<LookbookQueryResult>(data));
  let lookbook = $derived($query.data);
</script>

<main
  class="links min-h-[100svh] w-full flex flex-col gap-2 items-center bg-accent"
>
  <div class="flex flex-col gap-0.5 items-center">
    <h1 class="typo-6xl font-slanted uppercase mt-8">Look Book</h1>
    <h2 class="typo-xs uppercase font-mono">What my illustrations look like</h2>
  </div>
  {#if lookbook?.stackedGallery}
    <div class="bg-white pt-0.5 h-full">
      <StackedGallery section={lookbook?.stackedGallery} />
    </div>
  {/if}
</main>
