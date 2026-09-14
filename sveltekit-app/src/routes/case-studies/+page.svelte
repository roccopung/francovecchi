<script lang="ts">
  import type { CaseStudiesQueryResult } from "$lib/sanity.types";
  import type { PageData } from "./$types";
  import { useQuery } from "@sanity/sveltekit";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import SeeMore from "$lib/components/SeeMore.svelte";
  import StarIcon from "$lib/components/svg/StarIcon.svelte";
  import SEO from "$lib/components/seo/SEO.svelte";

  let { data }: { data: PageData } = $props();
  let query = $derived(useQuery<CaseStudiesQueryResult>(data));
  let datas = $derived($query.data);
  let caseStudiesPage = $derived($query.data?.caseStudiesPage);
  let caseStudies = $derived($query.data?.projects);
  let itemsToLoad = $derived(8);
  let filteredCaseStudies = $derived.by(() => {
    if (!caseStudies) return [];
    else return caseStudies.slice(0, itemsToLoad);
  });
</script>

<SEO data={caseStudiesPage?.seo} />

<main class="links w-full flex flex-col gap-2 items-center bg-white pb-2">
  <div class="typo-6xl font-slanted uppercase mt-8 text-accent flex gap-1">
    <h1>Case studies</h1>
    <span class="h-[0.2lh] md:h-[0.15lh] md:ml-[0.1lh] aspect-square">
      <StarIcon fill="var(--color-accent)" />
    </span>
  </div>
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

{#if filteredCaseStudies && caseStudies && filteredCaseStudies.length < caseStudies.length}
  <div class="pb-2">
    <SeeMore {itemsToLoad} bind:itemsLoaded={itemsToLoad} />
  </div>
{/if}
