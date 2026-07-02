<script lang="ts">
  import type { ElementImage, BlockContent, Slug } from "$lib/sanity.types";
  import Image from "$lib/components/element/Image.svelte";
  import ArrowRight from "$lib/components/svg/ArrowRight.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";

  type Props = {
    project: {
      title: string | null;
      slug: Slug | null;
      cover: ElementImage | null;
      coverImages: {
        one?: ElementImage;
        two?: ElementImage;
      } | null;
      services: Array<{
        title: string | null;
      }> | null;
      shortSummary: BlockContent | null;
    };
    variant?: "home" | "case-study";
    index?: number;
    delay?: boolean;
  };
  let { project, variant = "home", index, delay = false }: Props = $props();

  let coverOneVisible = $state(false);
  let coverTwoVisible = $state(false);
</script>

{#key project?.slug?.current}
  {#if variant === "home"}
    <a
      href="/case-studies/{project?.slug?.current}"
      class="home-variant w-full border-2 border-black rounded-s md:rounded-m overflow-hidden even:-ml-[2px] -mt-[1px] group pointer-events-none md:pointer-events-auto"
    >
      <div class="overflow-hidden">
        <div
          class="h-full w-full card-image scale-101 group-hover:scale-105 transition-fast"
        >
          <Image image={project?.cover} />
        </div>
      </div>
      <div
        class="home-variant-content flex flex-col gap-2 p-1 pt-2 md:pt-2 md:p-3 bg-white"
      >
        <div class="self-center flex flex-col gap-3">
          {#if project?.services}
            <div class="typo-xs font-mono uppercase">
              [{#each project?.services as service, i}
                {service?.title}{#if i < project?.services?.length - 1},&nbsp;
                {/if}
              {/each}]
            </div>
          {/if}
          <h3 class="typo-2xl uppercase font-sans font-bold">
            {project?.title}
          </h3>
        </div>
        <div
          class="self-end py-1 px-3 border-2 border-black rounded-full w-fit transition-fast md:hidden pointer-events-auto"
        >
          <div class="w-3"><ArrowRight /></div>
        </div>
      </div>
    </a>
  {:else}
    <!--
    VARIANT CASE-STUDY
    -->

    <a
      href="/case-studies/{project?.slug?.current}"
      class="group case-studies-variant w-full border-2 border-black rounded-s md:rounded-m overflow-hidden even:-mt-[2px] md:min-h-70 transition-fast pointer-events-none md:pointer-events-auto"
      style="opacity: {coverOneVisible && coverTwoVisible ? 1 : 0};"
    >
      <div class="case-studies-content p-1 pt-0 bg-white">
        {#if index}
          <div class="typo-xl font-medium font-mono uppercase p-0.5 pt-1">
            {index < 10 ? `0${index}` : index}
          </div>
        {/if}
        <div class="self-center flex flex-col gap-3">
          {#if project?.services}
            <div class="typo-xs font-mono uppercase">
              [{#each project?.services as service, i}
                {service?.title}{#if i < project?.services?.length - 1},&nbsp;
                {/if}
              {/each}]
            </div>
          {/if}
          <h3 class="typo-2xl uppercase font-sans font-bold">
            {project?.title}
          </h3>
          <div class="typo-s font-sans">
            <PortableText data={project?.shortSummary} />
          </div>
        </div>
        <div
          class="self-end py-1 px-3 border-2 border-black rounded-full w-fit hover:bg-accent transition-fast pointer-events-auto group-hover:bg-accent"
        >
          <div class="w-3"><ArrowRight /></div>
        </div>
      </div>
      <div class="grid-2">
        <div class="overflow-hidden">
          <div class="h-full w-full card-image aspect-square md:aspect-auto">
            <Image
              image={project?.coverImages?.one}
              bind:visible={coverOneVisible}
            />
          </div>
        </div>
        <div class="overflow-hidden">
          <div class="h-full w-full card-image aspect-square md:aspect-auto">
            <Image
              image={project?.coverImages?.two}
              bind:visible={coverTwoVisible}
            />
          </div>
        </div>
      </div>
    </a>
  {/if}
{/key}

<style>
  .home-variant {
    display: flex;
    flex-direction: column;
    .card-image {
      aspect-ratio: 16/9;
    }
  }
  .home-variant-content {
    display: grid;
    grid-template-rows: 1fr auto;
  }

  .case-studies-content {
    display: grid;
    grid-template-rows: auto 2fr auto;
  }

  @media (min-width: 768px) {
    .case-studies-variant {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
</style>
