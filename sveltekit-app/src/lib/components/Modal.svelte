<script lang="ts">
  import { modalState } from "$lib/states.svelte";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import Image from "$lib/components/element/Image.svelte";
  import ArrowRight from "$lib/components/svg/ArrowRight.svelte";

  interface Props {
    images?: any[];
    startIndex?: number;
  }

  let { images = [], startIndex = 0 }: Props = $props();

  let emblaApi: any = $state();
  let options: any = $derived({ loop: true, startIndex });

  function onInit(event: CustomEvent) {
    emblaApi = event.detail;
  }

  function scrollPrev() {
    if (emblaApi) emblaApi.scrollPrev(true);
  }

  function scrollNext() {
    if (emblaApi) emblaApi.scrollNext(true);
  }

  function close() {
    modalState.open = false;
  }

  function onkeydown(event: KeyboardEvent) {
    if (!modalState.open) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") scrollPrev();
    if (event.key === "ArrowRight") scrollNext();
  }

  $effect(() => {
    document.body.style.overflow = modalState.open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  });
</script>

<svelte:window {onkeydown} />

{#if modalState.open}
  <div class="fixed right-1 top-2 z-55">
    <button
      class="typo-xl font-slanted px-1 hover:opacity-50 cursor-pointer"
      onclick={close}
    >
      Close
    </button>
  </div>

  <div
    class="fixed top-0 inset-0 z-50 bg-white flex flex-col justify-center p-1 h-[100vh]"
  >
    <div
      class="embla"
      use:emblaCarouselSvelte={{ options, plugins: [] }}
      onemblaInit={onInit}
    >
      <div class="embla__container items-center">
        {#each images as image, i (image?._key ?? i)}
          <div class="embla__slide flex items-center justify-center p-2 md:p-10">
            <Image {image} fit="contain" />
          </div>
        {/each}
      </div>
    </div>




    <div class="embla__arrows fixed bottom-1 left-1/2 -translate-x-1/2 flex justify-center">
      <button
        class="embla__arrow embla__arrow--left hover:opacity-50 rotate-180 w-10 cursor-pointer p-3"
        onclick={scrollPrev}
        aria-label="Previous slide"
      >
        <ArrowRight />
      </button>
      <button
        class="embla__arrow embla__arrow--right hover:opacity-50 w-10 cursor-pointer p-3"
        onclick={scrollNext}
        aria-label="Next slide"
      >
        <ArrowRight />
      </button>
    </div>
  </div>
{/if}

<style>
  .embla {
    overflow: hidden;
    width: 100%;
    min-height: 0;
  }
  .embla__container {
    display: flex;
    height: 100%;
    touch-action: pan-y pinch-zoom;
  }
  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 100%;
    min-width: 0;
    height: 100%;
  }
</style>
