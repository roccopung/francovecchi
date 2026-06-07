<script lang="ts">
  import { useQuery } from "@sanity/sveltekit";
  import { onMount } from "svelte";
  let { data } = $props();
  let query = $derived(useQuery(data));
  let caseStudies = $derived($query.data);
</script>

<div
  class="links h-[100svh] w-full flex flex-col gap-2 items-center justify-center bg-accent"
>
  {#if caseStudies}
    <ul class="flex flex-col gap-2 font-sans typo-xl list-disc">
      {#each caseStudies as study}
        <li><a href="/case-studies/{study.slug.current}">{study.title}</a></li>
      {/each}
    </ul>
  {/if}
</div>
