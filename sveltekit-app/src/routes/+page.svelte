<script lang="ts">
  import type { HomeQueryResult } from "$lib/sanity.types";
  import type { PageData } from "./$types";
  import { useQuery } from "@sanity/sveltekit";
  import { onMount } from "svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import HomeTitle from "$lib/components/sections/HomeTitle.svelte";
  import HoverStarEffect from "$lib/components/HoverStarEffect.svelte";
  import Media from "$lib/components/element/Media.svelte";
  import ProjectCard from "$lib/components/ProjectCard.svelte";
  import Cta from "$lib/components/element/Cta.svelte";
  import KeenEyeMarquee from "$lib/components/marquees/KeenEyeMarquee.svelte";
  import CallFranco from "$lib/components/sections/CallFranco.svelte";
  import ShearMarquee from "$lib/components/marquees/ShearMarquee.svelte";
  import KeywordsMarquee from "$lib/components/marquees/KeywordsMarquee.svelte";
  import CharactersMarquee from "$lib/components/marquees/CharactersMarquee.svelte";
  import LogosMarquee from "$lib/components/marquees/LogosMarquee.svelte";

  import SEO from "$lib/components/seo/SEO.svelte";

  let { data }: { data: PageData } = $props();
  let query = $derived(useQuery<HomeQueryResult>(data));
  let home = $derived($query.data?.home);
  let characters = $derived(data.featuredCharacters ?? []);
  let characterRefs: HTMLElement[] = $state([]);
  let viewportWidth = $state(0);

  onMount(() => {
    if (viewportWidth < 1024) return;

    let ctx: gsap.Context | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Mobile browsers resize the viewport as the toolbar collapses/expands.
      // Without this, every one of those resizes forces a full refresh mid-scroll.
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // `width` (not `scale`) on purpose: shrinking the layout box is what
        // pulls the content below it upward as you scroll.
        tl.to(".keen-eye", {
          scrollTrigger: {
            trigger: ".keen-eye",
            scroller: ".scroll-container",
            start: "top bottom",
            scrub: 0.5,
          },
          width: 120,
        });
      });
    })();

    return () => ctx?.revert();
  });
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<SEO data={home?.seo} />

<main class="min-h-[100vh] w-full flex flex-col bg-white">
  <HomeTitle illustration={home?.illustration} />
  <section class="px-2 mt-[100svh] md:mt-[80vh] bg-white">
    {#if home?.cover}
      <div class="border-2 border-black rounded-m overflow-hidden">
        <Media data={home?.cover} controls={true} muted={false} />
      </div>
    {/if}
  </section>
  {#if home?.keywords}
    <section class="bg-white border-t-2 border-black">
      <KeywordsMarquee data={home?.keywords} />
    </section>
  {/if}
  <div class="sections flex flex-col gap-2 bg-white pt-1">
    {#if home?.featuredProjects && home?.featuredProjects.length > 0}
      <section class="px-2 flex flex-col gap-2 md:gap-0 md:grid-2">
        {#each home?.featuredProjects as project}
          <ProjectCard {project} />
        {/each}
      </section>
    {/if}
    <div class="w-full bg-white px-2">
      <div
        class="border-2 border-black rounded-m flex flex-col items-center justify-center overflow-hidden relative"
      >
        <div class="py-15 flex flex-col gap-0.5 items-center">
          <a
            href="/case-studies"
            class="z-10 typo-xs px-3 py-1 font-mono uppercase rounded-full border-2 border-black bg-white cursor-pointer hover:bg-black hover:text-white"
            >Explore the archive</a
          >
        </div>
        <div class="absolute left-0 pointer-events-none">
          <ShearMarquee />
        </div>
      </div>
    </div>
    <section class="px-2">
      <div
        class="bg-white pt-2 md:pt-8 pb-1 px-1 flex flex-col gap-4 md:grid-2 md:gap-1 border-2 border-black rounded-m"
      >
        <div class="flex flex-col gap-4 md:block">
          {#if home?.aboutSection?.heading}
            <h4 class="typo-xl font-sans font-medium">
              <PortableText data={home?.aboutSection?.heading} />
            </h4>
          {/if}
          <div class="flex flex-col md:flex-row gap-4 md:gap-1 md:pt-8 md:pb-3">
            {#if home?.aboutSection?.paragraphOne}
              <div class="typo-s font-sans">
                <PortableText data={home?.aboutSection?.paragraphOne} />
              </div>
            {/if}
            <div class="border-[0.5px] border-black hidden md:block"></div>
            {#if home?.aboutSection?.paragraphTwo}
              <div class="typo-s font-sans">
                <PortableText data={home?.aboutSection?.paragraphTwo} />
              </div>
            {/if}
          </div>
          {#if home?.aboutSection?.cta}
            <Cta cta={home?.aboutSection?.cta} />
          {/if}
        </div>
        <div class="h-20 md:place-self-end">
          <img class="h-full" src={home?.aboutSection?.illustration} alt="fire" />
        </div>
      </div>
    </section>
    <section class="text-center py-4 flex flex-col items-center w-full">
      <h3 class="typo-xl font-sans font-medium">
        {home?.clientsSection?.title}
      </h3>
      {#if home?.clientsSection?.subtitle}
        <div
          class="typo-l font-sans font-medium w-full max-w-4xl md:max-w-3/4 p-1"
        >
          <PortableText data={home?.clientsSection?.subtitle} />
        </div>
      {/if}
    </section>

    {#if home?.clientsSection}
      <section class="overflow-hidden pb-4">
        <LogosMarquee data={home?.clientsSection?.logos} direction="left" />
        <LogosMarquee data={home?.clientsSection?.logosTwo} direction="right" />
      </section>
    {/if}
    {#if characters && characters.length > 0}
      <section class="overflow-hidden">
        <CharactersMarquee data={characters} paused={true} />
      </section>
    {/if}
  </div>
  <section>
    <div
      class="pt-6 md:py-12 w-full overflow-hidden flex flex-col items-center bg-black"
    >
      <div class="w-10 md:w-[22vw] keen-eye"><img class="w-full h-full" src={home?.endingBlock?.illustration} alt="keen-eye illustration"></div>
      {#if home?.endingBlock?.title}
        <div class="w-full overflow-hidden">
          <KeenEyeMarquee data={home?.endingBlock?.title} />
        </div>
      {/if}
      {#if home?.endingBlock?.description}
        <div
          class="typo-xl font-medium font-sans text-center lg:max-w-3/4 text-white px-1 pt-2 md:px-4 md:pt-4 pb-2"
        >
          <PortableText data={home?.endingBlock?.description} />
        </div>
      {/if}
      {#if home?.endingBlock?.cta}
        <Cta fill="var(--color-white)" cta={home?.endingBlock?.cta} />
      {/if}
    </div>
  </section>
  {#if home?.callFranco}
    <CallFranco data={home?.callFranco} />
  {/if}
  <HoverStarEffect />
</main>
