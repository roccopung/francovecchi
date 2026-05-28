<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { urlFor } from "$lib/sanity/image";
  import SEO from "$lib/components/seo/SEO.svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let page = $derived($query.data);

  let viewportWidth = $state(0);

  let gallery = $derived(page?.gallery);
  let pageDescription =
    "Franco Vecchi";

</script>

<svelte:window bind:innerWidth={viewportWidth} />

<SEO {pageDescription} />

<main class="px-3 py-12">

</main>
