<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { urlFor } from "$lib/sanity/image";
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  import CallFranco from "$lib/components/CallFranco.svelte";

  import SEO from "$lib/components/seo/SEO.svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let home = $derived($query.data?.home);
  let characters = $derived(data.featuredCharacters ?? []);
  let characterRefs = $state([]);
  let isMounted = $state(false);
  let viewportWidth = $state(0);
  let keenEyeSection: HTMLElement | undefined = $state();

  onMount(() => {
    console.log(home);
    isMounted = true;
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();

    tl.to(".keen-eye", {
      scrollTrigger: {
        trigger: ".keen-eye",
        start: "top 80%",
        end: "+=100",
        scrub: 1,
      },
      width: 120,
    });

    for (let i = 0; i < characterRefs.length; i++) {
      const xPercents = [
        (((viewportWidth / 8) * 0.5) / 2) * -1,
        (((viewportWidth / 8) * 0.5) / 2) * -0.5,
        (((viewportWidth / 8) * 0.5) / 2) * 0.5,
        (((viewportWidth / 8) * 0.5) / 2) * 1,
      ];
      gsap.from(characterRefs[i], {
        scrollTrigger: {
          trigger: characterRefs[i],
          start: "top 90%",
          end: "+=100",
          scrub: 1,
        },
        scale: 0.5,
        xPercent: xPercents[i % 4],
      });
    }
  });
</script>

<svelte:window bind:innerWidth={viewportWidth} />

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
          <div class="flex gap-1 pt-8 pb-3">
            <div class="typo-s font-sans">
              <PortableText data={home?.aboutSection?.paragraphOne} />
            </div>
            <div class="border-[0.5px] border-black"></div>
            <div class="typo-s font-sans">
              <PortableText data={home?.aboutSection?.paragraphTwo} />
            </div>
          </div>
          <Cta cta={home?.aboutSection?.cta} />
        </div>
        <div class="h-20 place-self-end">
          <img class="h-full" src="/temp/images/fire.png" alt="fire" />
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
      <section class="grid-4 overflow-hidden w-full">
        {#each characters as character, i}
          <div
            bind:this={characterRefs[i]}
            class="aspect-[4/5] overflow-hidden rounded-s"
          >
            <Image image={character?.cover} />
          </div>
        {/each}
      </section>
    {/if}
  </div>
  <section bind:this={keenEyeSection}>
    <div
      class="py-12 w-full overflow-hidden flex flex-col items-center bg-accent"
    >
      <img class="w-[33vw] keen-eye" src="/temp/images/keen-eye.png" alt="" />
      <div class="w-full overflow-hidden">
        <KeenEye data={home?.endingBlock?.title} />
      </div>
      <div
        class="typo-xl font-medium font-sans text-center lg:max-w-[60vw] text-dark-gray px-4 pt-4 pb-2"
      >
        <PortableText data={home?.endingBlock?.description} />
      </div>
      <Cta fill="var(--color-white)" cta={home?.endingBlock?.cta} />
    </div>
  </section>
  <CallFranco data={home?.callFranco} />
  <HoverStarEffect />
</main>
