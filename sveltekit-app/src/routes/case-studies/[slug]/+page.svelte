<script lang="ts">
  import type { Project, Cta } from "$lib/types";
  import { useQuery } from "@sanity/sveltekit";
  import { onMount } from "svelte";
  import Image from "$lib/components/element/Image.svelte";
  import Headline from "$lib/components/Headline.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import Dot from "$lib/components/svg/Dot.svelte";
  import PageBuilder from "$lib/components/PageBuilder.svelte";
  import Media from "$lib/components/element/Media.svelte";
  import CtaEl from "$lib/components/element/Cta.svelte";
  import NextProject from "$lib/components/NextProject.svelte";
  import { page } from "$app/state";

  let { data }: any = $props();
  let query = $derived(useQuery<Project>(data));
  let project = $derived($query.data);
  let writeToCta = $state({
    ctaType: "linkEmail",
    linkEmail: {
      url: "hello@francovecchi.com",
      label: "Write an email",
    },
  }) as Cta;
</script>

<main class="min-h-[100svh] bg-accent w-full">
  {#key project?.slug?.current}
    <div class="h-[100svh] w-full relative">
      <Image image={project?.cover} />
      <div
        class="absolute bottom-0 left-0 m-1 bg-white rounded-s border border-black p-1 flex flex-col gap-3 min-w-[50vw] w-[calc(100vw-1.5rem)] md:w-auto"
      >
        <div class="typo-xs font-mono uppercase">({project?.years})</div>
        <h1 class="typo-3xl font-slanted">{project?.title}</h1>
      </div>
    </div>
  {/key}
  <div class="bg-white">
    <div class="p-1">
      <section class="p-1 py-4 rounded-m border border-black bg-white">
        {#if project?.title}
          <Headline data={project?.title} />
        {/if}
        {#if project?.description}
          <div class="font-sans font-medium typo-l pt-1 max-w-[85rem]">
            <PortableText data={project?.description} />
          </div>
        {/if}

        {#if project?.services && project?.services.length > 0}
          <h4 class="font-bold font-sans typo-md pt-4 pb-0.5">Services</h4>
          <div
            class="font-sans font-bold typo-md flex gap-0.5 flex-col md:flex-row flex-wrap"
          >
            {#each project?.services as service}
              <div
                class="flex gap-1 items-center bg-accent px-2 py-1 rounded-full border border-black w-fit"
              >
                <div class="h-[0.3lh] aspect-square">
                  <Dot />
                </div>
                <div>{service.title}</div>
              </div>
            {/each}
          </div>
        {/if}

        <div class="max-w-[85rem] grid-2 gap-2 pt-4">
          {#if project?.problem}
            <div class="font-sans typo-s">
              <div class="typo-md font-bold font-sans pb-0.5">Problem</div>
              <PortableText data={project?.problem} />
            </div>
          {/if}
          {#if project?.solution}
            <div class="font-sans typo-s">
              <div class="typo-md font-bold font-sans pb-0.5">Solution</div>
              <PortableText data={project?.solution} />
            </div>
          {/if}
        </div>
      </section>
    </div>

    {#if project?.pageBuilder?.sections}
      <PageBuilder sections={project?.pageBuilder?.sections} />
    {/if}

    {#if project?.result}
      <section class="p-1 pb-0 bg-white">
        <div class="border border-black rounded-m flex flex-col gap-1 pt-3">
          <Headline data="The result" />
          <div class="typo-l font-sans font-medium px-1">
            <PortableText data={project?.result?.content} />
          </div>
          <div class="overflow-hidden rounded-m mt-1">
            <Media data={project?.result?.media} />
          </div>
        </div>
      </section>
    {/if}

    {#if project?.credits}
      <section class="p-1 bg-white">
        <div
          class="border border-black rounded-m flex flex-col gap-1 pt-3 pb-4"
        >
          <Headline data="Credits" />
          <div class="typo-s font-sans grid-2 pt-2">
            {#each project?.credits as credit}
              <div class="flex flex-col">
                <div class="typo-s font-sans font-bold px-1 uppercase">
                  {credit.label}
                </div>
                <div class="typo-s font-sans px-1">{credit.name}</div>
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <div class="p-1 bg-white">
      <div
        class="border border-black rounded-m flex flex-col gap-1 pt-3 pb-4 text-center flex flex-col items-center"
      >
        <div class="font-sans font-medium typo-l">
          For work and commissions, write to:<br /><a
            target="_blank"
            href="mailto:hello@francovecchi.com"
            rel="noopener noreferrer">hello@francovecchi.com</a
          >
        </div>
        <CtaEl cta={writeToCta} />
      </div>
    </div>
  </div>
</main>

{#if project?.next || project?.firstProject}
  {#key page?.params?.slug}
    <NextProject
      next={project?.next}
      firstProject={project?.firstProject}
      projectIndexes={project?.projectIndexes}
    />
  {/key}
{/if}
