<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { urlFor } from "$lib/sanity/image";
  import { onMount } from "svelte";
  import Image from "$lib/components/element/Image.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import HomeTitle from "$lib/components/sections/HomeTitle.svelte";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import HoverStarEffect from "$lib/components/HoverStarEffect.svelte";
  import Headline from "$lib/components/Headline.svelte";
  import Media from "$lib/components/Media.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import Cta from "$lib/components/element/Cta.svelte";
  import LogosMarquee from "$lib/components/LogosMarquee.svelte";
  import KeenEye from "$lib/components/KeenEye.svelte";

  import SEO from "$lib/components/seo/SEO.svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let home = $derived($query.data?.home);
  let characters = $derived(data.featuredCharacters ?? []);
  let isMounted = $state(false);

  onMount(() => {
    isMounted = true;
  });
</script>

<main class="min-h-[100dvh] w-full flex flex-col">
  <HomeTitle />
  <section class="px-1 mt-[80dvh] bg-accent">
    <div class="border-1 border-black rounded-m overflow-hidden">
      <Media data={home?.cover} controls={true} />
    </div>
    <Headline data={home?.heading} />
  </section>
  <div class="sections flex flex-col gap-1 bg-white pt-1">
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
          <div
            class="rounded-full py-1 px-3 border border-black w-fit typo-xs font-mono uppercase mt-3 bg-white text-black hover:bg-black hover:text-white"
          >
            <Cta cta={home?.aboutSection?.cta} />
          </div>
        </div>
        <div class="h-20 place-self-end">
          <img class="h-full" src="/temp/images/fire.png" />
        </div>
      </div>
    </section>
    <section class="text-center py-1 flex flex-col items-center">
      <h3 class="typo-xl font-sans font-medium">
        {home?.clientsSection?.title}
      </h3>
      <div class="typo-l font-sans font-medium max-w-4xl p-1">
        <PortableText data={home?.clientsSection?.subtitle} />
      </div>
      {#if home?.clientsSection?.logos?.length > 0}
        <div class="overflow-hidden w-full">
          <LogosMarquee data={home?.clientsSection?.logos} />
        </div>
      {/if}
    </section>
    {#if characters && characters.length > 0}
      <section class="grid-4">
        {#each characters as character}
          <div class="aspect-[4/5] overflow-hidden rounded-s">
            <Image image={character?.cover} />
          </div>
        {/each}
      </section>
    {/if}
  </div>
  <section>
    <div
      class="py-12 w-full overflow-hidden flex flex-col items-center bg-accent"
    >
      <img class="max-w-30" src="/temp/images/keen-eye.png" alt="" />
      <KeenEye data={home?.endingBlock?.title} />
      <div
        class="typo-xl font-medium font-sans text-center lg:max-w-[60vw] text-dark-gray px-4 pt-4"
      >
        <PortableText data={home?.endingBlock?.description} />
      </div>
    </div>
  </section>
  <HoverStarEffect />
</main>
