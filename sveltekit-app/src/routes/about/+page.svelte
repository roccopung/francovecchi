<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import SEO from "$lib/components/seo/SEO.svelte";
  let { data } = $props();
  let query = useQuery(data);
  let page = $derived($query.data);
</script>

<SEO pageTitle="About" />

<main class="px-1 pt-12 pb-6 md:pb-0 md:px-3">
  <div class="max-w-5xl"><PortableText data={page?.content} /></div>
</main>
