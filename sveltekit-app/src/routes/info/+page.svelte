<script lang="ts">
  import type { InfoQueryResult } from "$lib/sanity.types";
  import type { PageData } from "./$types";
  import { useQuery } from "@sanity/sveltekit";
  import InfoTitle from "$lib/components/sections/InfoTitle.svelte";
  import HoverStarEffect from "$lib/components/HoverStarEffect.svelte";
  import Headline from "$lib/components/Headline.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import Cta from "$lib/components/element/Cta.svelte";
  import CharactersMarquee from "$lib/components/marquees/CharactersMarquee.svelte";
  import HobbiesMarquee from "$lib/components/marquees/HobbiesMarquee.svelte";
  import Accordion from "$lib/components/element/Accordion.svelte";
  import Reviews from "$lib/components/Reviews.svelte";
  import CallFranco from "$lib/components/sections/CallFranco.svelte";

  import SEO from "$lib/components/seo/SEO.svelte";

  let { data }: { data: PageData } = $props();
  let query = $derived(useQuery<InfoQueryResult>(data));
  let infoPage = $derived($query.data?.info);
  let characters = $derived($query.data?.characters);
  let openIndex = $state<number | null>(null);
</script>

<main class="w-full flex flex-col">
  <InfoTitle portrait={infoPage?.portrait} />
  <div class="bg-white h-full w-full mt-[100svh] z-10">
    <section class=" p-2 py-4 flex flex-col gap-3">
      {#if infoPage?.intro?.heading}
        <Headline data={infoPage?.intro?.heading} />
      {/if}
      {#if infoPage?.intro?.content}
        <div class="typo-l font-medium font-sans lg:max-w-3/4">
          <PortableText data={infoPage?.intro?.content} />
        </div>
      {/if}
      <div class="grid-2 gap-2 lg:max-w-3/4">
        {#if infoPage?.intro?.earlyCareer}
          <div>
            <h4 class="typo-md font-sans font-bold pb-1">Early Career</h4>
            <div class="typo-s font-sans">
              <PortableText data={infoPage?.intro?.earlyCareer} />
            </div>
          </div>
        {/if}
        {#if infoPage?.intro?.workExperience}
          <div>
            <h4 class="typo-md font-sans font-bold pb-1">Early Career</h4>
            <div class="typo-s font-sans">
              <PortableText data={infoPage?.intro?.workExperience} />
            </div>
          </div>
        {/if}
      </div>
      <Cta
        cta={infoPage?.intro?.cta}
        typo="s"
        font="sans"
        uppercase={false}
        arrow={true}
        fill="var(--color-white)"
      />
    </section>
    {#if infoPage?.collaborations}
      <section
        class="border-b-2 border-black p-2 md:pt-3 md:px-2 flex flex-col gap-4 md:gap-2"
      >
        {#if infoPage?.collaborations?.heading}
          <Headline data={infoPage?.collaborations?.heading} />
        {/if}
        {#if infoPage?.collaborations?.content}
          <div class="typo-l font-medium font-sans md:pb-10 lg:max-w-3/4">
            <PortableText data={infoPage?.collaborations?.content} />
          </div>
        {/if}
        <div class="flex flex-col md:flex-row md:justify-between">
          <div
            class="relative flex flex-col gap-3 mb-4 md:grid-2 md:gap-3 md:my-2"
          >
            <div>
              <h4 class="typo-md font-sans font-bold pb-1">Brands</h4>
              <div class="sm:grid-2 typo-s font-sans gap-x-1">
                {#if infoPage?.collaborations?.brands}
                  {#each infoPage?.collaborations?.brands as brand}
                    <div class="typo-s font-sans">{brand}</div>
                  {/each}
                {/if}
              </div>
            </div>
            <div
              class="bg-black w-full h-[2px] mx-auto h left-1/2 md:absolute md:w-[2px] md:h-full"
            ></div>
            <div>
              <h4 class="typo-md font-sans font-bold pb-1">Agencies</h4>
              <div class="sm:grid-2 typo-s font-sans gap-x-1">
                {#if infoPage?.collaborations?.brands}
                  {#each infoPage?.collaborations?.agencies as agency}
                    <div class="typo-s font-sans">{agency}</div>
                  {/each}
                {/if}
              </div>
            </div>
          </div>
          <img
            class="object-contain h-15 md:py-2 self-start"
            src="/temp/images/keen-eye-2.png"
            alt=""
          />
        </div>
      </section>
    {/if}
    {#if infoPage?.hobbies}
      <div class="w-full overflow-hidden">
        <HobbiesMarquee data={infoPage?.hobbies} />
      </div>
    {/if}

    <section class="px-2 pb-4 flex flex-col gap-2 md:grid-2 md:gap-2">
      <div class="flex flex-col gap-1">
        {#if infoPage?.skillsSection?.heading}
          <Headline data={infoPage?.skillsSection?.heading} />
        {/if}
        <div class="font-sans font-medium typo-l">
          <PortableText data={infoPage?.skillsSection?.content} />
        </div>
      </div>
      {#if infoPage?.skillsSection?.skills}
        <div class="flex flex-col gap-0">
          {#each infoPage?.skillsSection?.skills as skill, i}
            <Accordion
              data={skill}
              open={openIndex === i}
              ontoggle={() => (openIndex = openIndex === i ? null : i)}
            />
          {/each}
        </div>
      {/if}
    </section>
  </div>
  {#if infoPage?.reviewsSection}
    <section class="py-2 bg-white">
      <div class="flex flex-col gap-2 px-2">
        {#if infoPage?.reviewsSection?.heading}
          <Headline data={infoPage?.reviewsSection?.heading} />
        {/if}
        <div class="font-sans font-medium typo-l lg:max-w-3/4">
          <PortableText data={infoPage?.reviewsSection?.content} />
        </div>
      </div>
      <Reviews section={infoPage?.reviewsSection} />
    </section>
  {/if}
</main>

{#if infoPage?.callFranco}
  <CallFranco data={infoPage?.callFranco} />
{/if}

<HoverStarEffect />
