<script lang="ts">
  import type { SectionStackedGallery } from "$lib/types.ts";
  import Image from "$lib/components/element/Image.svelte";

  type Props = {
    section: SectionStackedGallery;
  };

  let { section }: Props = $props();
</script>

{#if section.items}
  <section class="w-full px-0.5">
    <div class="flex flex-col gap-0.5 md:grid-12 md:gap-0.5">
      {#each section.items as item}
        {#if item?.columnSpan?.input && item?.image?.asset}
          <div
            class="
          {item?.columnSpan?.input == 12
              ? 'col-span-12'
              : item?.columnSpan?.input == 6
                ? 'col-span-6'
                : item?.columnSpan?.input == 4
                  ? 'col-span-4'
                  : 'col-span-12'}"
          >
            <Image image={item.image} />
          </div>{/if}
      {/each}
    </div>
  </section>
{/if}
