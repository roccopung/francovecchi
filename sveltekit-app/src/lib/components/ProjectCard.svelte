<script lang="ts">
  import type { ElementImage } from "$lib/types";
  import type { PortableTextBlock } from "@sanity/types";
  import Image from "$lib/components/element/Image.svelte";
  import ArrowRight from "$lib/components/svg/ArrowRight.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";

  type Props = {
    project: {
      coverImages?: {
        one?: ElementImage;
        two?: ElementImage;
      };
      services?: any[];
      shortSummary: PortableTextBlock[];
      title?: string;
      slug?: any;
    };
    variant?: "home" | "case-study";
  };
  let { project, variant = "home" }: Props = $props();
  let zoom = $state(false);
</script>

{#key project.slug.current}
  {#if variant === "home"}
    <div
      class="home-variant w-full border-1 border-black rounded-s md:rounded-m overflow-hidden -mt-[1px]"
    >
      <div class="overflow-hidden">
        <div class="h-full w-full card-image">
          <Image image={project?.coverImages?.one} />
        </div>
      </div>
      <div
        class="card-content flex flex-col gap-2 p-1 pt-2 md:pt-0 md:block md:p-3 bg-white"
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
          href="/works/{project?.slug?.current}"
          class="self-end py-1 px-3 border-1 border-black rounded-full w-fit hover:bg-accent transition-fast"
          onmouseenter={() => (zoom = true)}
          onmouseleave={() => (zoom = false)}
        >
          <ArrowRight />
        </a>
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
  .card-content {
    display: grid;
    grid-template-rows: 1fr auto;
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
  }
</style>
