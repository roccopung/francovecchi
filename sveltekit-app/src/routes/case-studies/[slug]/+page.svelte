<script lang="ts">
  import type { ProjectQueryResult, Cta } from "$lib/sanity.types";
  import { useQuery } from "@sanity/sveltekit";
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
  let query = $derived(useQuery<ProjectQueryResult>(data));
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
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 m-1 bg-white rounded-s border-2 border-black p-1 flex flex-col gap-3 min-w-[50vw] w-[calc(100vw-1.5rem)] md:w-auto text-center"
      >
        <div class="typo-xs font-mono uppercase">({project?.years})</div>
        <h1 class="typo-3xl font-slanted pl-1">{project?.title}</h1>
      </div>
    </div>
  {/key}
  <div class="bg-white">
    <div class="p-1">
      <section
        class="p-1 py-4 rounded-m border-2 border-black bg-white text-center"
      >
        <!-- {#if project?.tagline}
          <Headline data={project?.tagline} />
        {/if} -->
        {#if project?.description}
          <div class="font-sans font-medium typo-l pt-1 md:max-w-3/4 mx-auto">
            <PortableText data={project?.description} />
          </div>
        {/if}

        {#if project?.services && project?.services.length > 0}
          <h4 class="font-bold font-sans typo-md pt-4 pb-0.5">Services</h4>
          <div
            class="font-sans font-bold typo-md flex gap-0.5 flex-col md:flex-row flex-wrap w-fit mx-auto"
          >
            {#each project?.services as service}
              <div
                class="flex gap-1 items-center bg-white px-2 py-1 rounded-full border-2 border-black w-fit"
              >
                <div class="h-[0.3lh] aspect-square">
                  <Dot />
                </div>
                <div>{service.title}</div>
              </div>
            {/each}
          </div>
        {/if}
      </section>
    </div>

    {#if project?.pageBuilder?.sections}
      <PageBuilder sections={project?.pageBuilder?.sections} />
    {/if}

    {#if project?.result}
      <section class="p-1 pb-0 bg-white 3xl:max-w-[70vw] 3xl:mx-auto">
        <div
          class="border-2 border-black rounded-m flex flex-col gap-1 pt-3 text-center justify-center items-center"
        >
          <Headline data="The result" />
          <div class="typo-l font-sans font-medium px-1">
            <PortableText data={project?.result?.content} />
          </div>
          {#if project?.result?.media}
            <div class="overflow-hidden rounded-m mt-1">
              <Media data={project.result.media} />
            </div>
          {/if}
        </div>
      </section>
    {/if}

    {#if project?.credits}
      <section class="p-1 bg-white 3xl:max-w-[70vw] 3xl:mx-auto">
        <div
          class="border-2 border-black rounded-m flex flex-col gap-1 pt-3 pb-4 px-1 items-center justify-center text-center"
        >
          <Headline data="Credits" />
          <div class="typo-s font-sans grid-2 pt-2 w-full">
            {#each project?.credits as credit}
              <div class="flex flex-col">
                <div class="typo-s font-sans font-bold uppercase">
                  {credit.label}
                </div>
                <div class="typo-s font-sans">{credit.name}</div>
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <div class="p-1 pt-0 bg-white">
      <div
        class="border-2 border-black rounded-m flex flex-col gap-1 pt-3 pb-4 text-center flex flex-col items-center"
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
