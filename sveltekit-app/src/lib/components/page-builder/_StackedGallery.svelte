<script lang="ts">
  import type { StackedGallery } from "$lib/sanity.types";
  import { clickedImage, modalState } from "$lib/states.svelte";
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
          <button
            onclick={() => {
              clickedImage.key = item._key;
              modalState.open = true;
            }}
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
          </button>{/if}
      {/each}
    </div>
  </section>
{/if}
