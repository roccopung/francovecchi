<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { urlFor } from "$lib/sanity/image";
  import HomeTitle from "$lib/components/sections/HomeTitle.svelte";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import HoverStarEffect from "$lib/components/HoverStarEffect.svelte";

  import SEO from "$lib/components/seo/SEO.svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let page = $derived($query.data);
</script>

<main class="bg-accent min-h-[100dvh] w-full">
  <HomeTitle />
</main>
