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
  <section class="w-full px-2">
    <div class="flex flex-col gap-2 md:grid-12 md:gap-2">
      {#each section.items as item, i}
        {#if item?.columnSpan?.input && item?.image?.asset}
          <div
            class="
            transition-fast rounded-m overflow-hidden border-2
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
