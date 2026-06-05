<script lang="ts">
  //@ts-nocheck
  import { useQuery } from "@sanity/sveltekit";
  import { onMount } from "svelte";
  import Image from "$lib/components/element/Image.svelte";
  import Headline from "$lib/components/Headline.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import Dot from "$lib/components/svg/Dot.svelte";
  import PageBuilder from "$lib/components/PageBuilder.svelte";

  let { data } = $props();
  let query = $derived(useQuery(data));
  let project = $derived($query.data);
</script>

<main class="min-h-[100svh] bg-accent">
  <div class="h-[100svh] w-full relative">
    <Image image={project?.cover} />
    <div
      class="absolute bottom-0 left-0 m-1 bg-white rounded-s border border-black p-1 flex flex-col gap-3 min-w-1/2"
    >
      <div class="typo-xs font-mono uppercase">({project?.years})</div>
      <h1 class="typo-3xl font-slanted">{project?.title}</h1>
    </div>
  </div>
  <div class="bg-white">
    <div class="p-1">
      <section class="p-1 py-4 rounded-m border border-black bg-white">
        <Headline data={project?.title} />
        <div class="font-sans font-medium typo-l pt-1 max-w-[85rem]">
          <PortableText data={project?.description} />
        </div>

        {#if project?.services && project?.services.length > 0}
          <h4 class="font-bold font-sans typo-md pt-4 pb-0.5">Services</h4>
          <div class="font-sans font-bold typo-md flex gap-0.5">
            {#each project?.services as service}
              <div
                class="flex gap-1 items-center bg-accent px-2 py-1 rounded-full border border-black"
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
          <div class="font-sans typo-s">
            <div class="typo-md font-bold font-sans pb-0.5">Problem</div>
            <PortableText data={project?.problem} />
          </div>
          <div class="font-sans typo-s">
            <div class="typo-md font-bold font-sans pb-0.5">Solution</div>
            <PortableText data={project?.solution} />
          </div>
        </div>
      </section>
    </div>

    <PageBuilder sections={project?.pageBuilder?.sections} />
  </div>
</main>
