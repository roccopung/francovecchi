<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { urlFor } from "$lib/sanity/image";
  import { onMount } from "svelte";
  import HomeTitle from "$lib/components/sections/HomeTitle.svelte";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import HoverStarEffect from "$lib/components/HoverStarEffect.svelte";
  import Headline from "$lib/components/Headline.svelte";
  import Media from "$lib/components/Media.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";

  import SEO from "$lib/components/seo/SEO.svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let home = $derived($query.data);
  let isMounted = $state(false);

  onMount(() => {
    isMounted = true;
  });
  $effect(() => {
    console.log(home);
  });
</script>

<main class="min-h-[100dvh] w-full flex flex-col gap-1">
  <HomeTitle />
  <div class="mt-[80dvh] py-1 sections flex flex-col gap-1 bg-accent">
    <section class="px-1">
      <div class="border-1 border-black rounded-m overflow-hidden">
        <Media data={home?.cover} controls={true} />
      </div>
      <Headline data={home?.heading} />
    </section>
    {#if home?.featuredProjects?.length > 0}
      <section class="px-1 flex flex-col">
        {#each home?.featuredProjects as project}
          <ProjectCard {project} />
        {/each}
      </section>
    {/if}
    <section class="px-1">
      <div
        class="bg-white pt-8 pb-1 px-1 grid-2 gap-1 border border-black rounded-m"
      >
        <div>
          <h4 class="typo-xl font-sans font-medium">
            <PortableText data={home?.aboutSection?.heading} />
          </h4>
          <div class="flex gap-1 pt-8">
            <div class="typo-s font-sans">
              <PortableText data={home?.aboutSection?.paragraphOne} />
            </div>
            <div class="border-[0.5px] border-black"></div>
            <div class="typo-s font-sans">
              <PortableText data={home?.aboutSection?.paragraphTwo} />
            </div>
          </div>
        </div>
        <div class="h-20 place-self-end">
          <img class="h-full" src="/temp/images/fire.png" />
        </div>
      </div>
    </section>
  </div>
  <HoverStarEffect />
</main>
