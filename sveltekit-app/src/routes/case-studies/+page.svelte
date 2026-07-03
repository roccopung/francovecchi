<script lang="ts">
  import type { CaseStudiesQueryResult } from "$lib/sanity.types";
  import type { PageData } from "./$types";
  import { useQuery } from "@sanity/sveltekit";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import SeeMore from "$lib/components/SeeMore.svelte";

  let { data }: { data: PageData } = $props();
  let query = $derived(useQuery<CaseStudiesQueryResult>(data));
  let caseStudies = $derived($query.data);
  let initialProjectsNumber = $state(2);
  let itemsToLoad = $derived(initialProjectsNumber);
  let filteredCaseStudies = $derived.by(() => {
    if (!caseStudies) return [];
    else return caseStudies.slice(0, itemsToLoad);
  });
</script>

<main class="links w-full flex flex-col gap-2 items-center bg-white">
  <h1 class="typo-6xl font-slanted uppercase mt-8 text-accent">Case studies</h1>
  {#if filteredCaseStudies}
    <ul class="px-2 flex flex-col gap-2 md:gap-0 md:grid-2">
      {#each filteredCaseStudies as study, index}
        <ProjectCard
          project={study}
          variant="case-study"
          index={index + 1}
          delay={true}
        />
      {/each}
    </ul>
  {/if}
</main>

<div class="py-2">
  <SeeMore itemsToLoad={initialProjectsNumber} bind:itemsLoaded={itemsToLoad} />
</div>
