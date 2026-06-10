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
    <div
      class="home-variant w-full border-1 border-black rounded-s md:rounded-m overflow-hidden -mt-[1px]"
    >
      <div class="overflow-hidden">
        <div class="h-full w-full card-image">
          <Image image={project?.cover} />
        </div>
      </div>
      <div
        class="home-variant-content flex flex-col gap-2 p-1 pt-2 md:pt-0 md:p-3 bg-white"
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
          <div class="typo-s font-sans">
            <PortableText data={project?.shortSummary} />
          </div>
        </div>
        <a
          href="/case-studies/{project?.slug?.current}"
          class="self-end py-1 px-3 border-1 border-black rounded-full hover:bg-accent w-fit transition-fast"
        >
          <div class="w-3"><ArrowRight /></div>
        </a>
      </div>
    </div>
  {:else}
    <!--
    VARIANT CASE-STUDY
    -->

    <div
      class="case-studies-variant w-full border-1 border-black rounded-s md:rounded-m overflow-hidden -mt-[1px] md:min-h-70 transition-fast"
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
        <a
          href="/case-studies/{project?.slug?.current}"
          class="self-end py-1 px-3 border-1 border-black rounded-full w-fit hover:bg-accent transition-fast"
        >
          <div class="w-3"><ArrowRight /></div>
        </a>
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
    </div>
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
    .home-variant {
      display: grid;
      grid-template-columns: 1.33fr 1fr;
      aspect-ratio: 2.3;
      .card-image {
        aspect-ratio: unset;
      }
    }

    .case-studies-variant {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
</style>
