<script lang="ts">
  import type { AboutQueryResult } from "$lib/sanity.types";
  import type { PageData } from "./$types";
  import { useQuery } from "@sanity/sveltekit";
  import InfoTitle from "$lib/components/sections/InfoTitle.svelte";
  import HoverStarEffect from "$lib/components/HoverStarEffect.svelte";
  import Headline from "$lib/components/Headline.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import Cta from "$lib/components/element/Cta.svelte";

  import SEO from "$lib/components/seo/SEO.svelte";

  let { data }: { data: PageData } = $props();
  let query = $derived(useQuery<AboutQueryResult>(data));
  let page = $derived($query.data);
  $effect(() => {
    console.log(page);
  });
</script>

<main class="w-full flex flex-col">
  <InfoTitle portrait={page?.portrait} />
  <section class="px-1 py-4 bg-white mt-[80svh] flex flex-col gap-4">
    {#if page?.intro?.heading}
      <Headline data={page?.intro?.heading} />
    {/if}
    {#if page?.intro?.content}
      <div class="typo-l font-medium font-sans lg:max-w-3/4">
        <PortableText data={page?.intro?.content} />
      </div>
    {/if}
    <div class="grid-2 gap-2 lg:max-w-3/4">
      {#if page?.intro?.earlyCareer}
        <div>
          <h4 class="typo-md font-sans font-bold pb-1">Early Career</h4>
          <div class="typo-s font-sans">
            <PortableText data={page?.intro?.earlyCareer} />
          </div>
        </div>
      {/if}
      {#if page?.intro?.workExperience}
        <div>
          <h4 class="typo-md font-sans font-bold pb-1">Early Career</h4>
          <div class="typo-s font-sans">
            <PortableText data={page?.intro?.workExperience} />
          </div>
        </div>
      {/if}
    </div>
    <Cta
      cta={page?.intro?.cta}
      typo="s"
      font="sans"
      uppercase={false}
      arrow={true}
      fill="var(--color-white)"
    />
  </section>
  <HoverStarEffect />
</main>
