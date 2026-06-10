<script lang="ts">
  import type { StackedGallery } from "$lib/sanity.types";
  import Image from "$lib/components/element/Image.svelte";

  type Props = {
    section: StackedGallery;
  };

  let { section }: Props = $props();
  let imagesVisible: boolean[] = $state(
    (section.items ?? []).map(
      (item) => !(item?.columnSpan?.input && item?.image?.asset),
    ),
  );
</script>

{#if section.items}
  <section class="w-full px-0.5">
    <div class="flex flex-col gap-0.5 md:grid-12 md:gap-0.5">
      {#each section.items as item, i}
        {#if item?.columnSpan?.input && item?.image?.asset}
          <div
            class="
            transition-fast
            {imagesVisible.every(Boolean) ? 'opacity-100' : 'opacity-0'}
          {item?.columnSpan?.input == '12'
              ? 'col-span-12'
              : item?.columnSpan?.input == '6'
                ? 'col-span-6'
                : item?.columnSpan?.input == '4'
                  ? 'col-span-4'
                  : 'col-span-12'}"
          >
            <Image image={item.image} bind:visible={imagesVisible[i]} />
          </div>{/if}
      {/each}
    </div>
  </section>
{/if}
