<script lang="ts">
  //@ts-nocheck
  import PortableText from "$lib/components/element/PortableText.svelte";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import ArrowRight from "$lib/components/svg/ArrowRight.svelte";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";

  let { section } = $props();
  let reviews = $derived(
    Array.from({ length: 10 }, () => section?.reviews ?? []).flat(),
  );
  let emblaApi = $state();
  let options = $derived({
    loop: true,
  });
  let selectedIndex = $state(0);

  function onInit(event: CustomEvent) {
    emblaApi = event.detail;
  }

  function scrollPrev() {
    if (emblaApi) emblaApi.scrollPrev();
  }

  function scrollNext() {
    if (emblaApi) emblaApi.scrollNext();
  }
</script>

<section class="pt-4 justify-center flex flex-col gap-2 bg-white">
  <div class="embla" use:emblaCarouselSvelte={{ options }} onemblaInit={onInit}>
    <div class="embla__container md:ml-1">
      {#each reviews as review, index}
        <div
          class="embla__slide border-2 border-black rounded-m p-2 flex flex-col justify-between gap-10 bg-white -mr-[1px] -ml-[1px]"
        >
          <div class="typo-s font-sans">
            <PortableText data={review.content} />
          </div>
          <div class="flex flex-col">
            <div class="typo-l font-bold font-sans">{review.author}</div>
            <div class="font-mono typo-s">{review?.companyRole}</div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div class="embla__arrows w-full flex justify-start px-1">
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
</section>

<style>
  .embla {
    overflow: hidden;
    width: 100%;
  }
  .embla__container {
    display: flex;
    align-items: center;
    touch-action: pan-y pinch-zoom;
    padding: 1rem;
  }
  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 0 0 100%;
    width: 100%;
    aspect-ratio: 4/5;
  }

  @media (min-width: 480px) {
    .embla__container {
      padding: 0;
    }
    .embla__slide {
      flex: 0 0 auto;
      width: 70vw;
      margin-left: -1px;
      aspect-ratio: 1;
    }
  }

  @media (min-width: 768px) {
    .embla__slide {
      width: 32vw;
    }
  }
</style>
