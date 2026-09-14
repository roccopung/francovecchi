<script lang="ts">
  //@ts-nocheck
  import type { ElementImage } from "$lib/sanity.types";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import InfoTitleAnimation from "$lib/components/InfoTitleAnimation.svelte";
  import Image from "$lib/components/element/Image.svelte";
  import Cta from "$lib/components/element/Cta.svelte";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { viewport } from "$lib/states.svelte";

  type Props = {
    portrait?: ElementImage;
    illustration?: string;
    isLoaded?: boolean;
  };

  let { portrait, illustration, isLoaded = $bindable(false) }: Props = $props();
  let portraitWrapperEl: HTMLElement | undefined = $state();
  let portraitWrapperElResized: boolean = $state(false);
  let portraitEl: HTMLElement | undefined = $state();
  let viewportHeight: number = $state(0);
  let viewportWidth: number = $state(0);
  let titleHeight = $state(0);

  let cta = {
    ctaType: "linkEmail",
    linkEmail: {
      url: "hello@francovecchi.com",
      label: "Write an email",
    },
  };

  onMount(async () => {
    const { gsap } = await import("gsap");
    if (portraitWrapperEl && portraitEl) {
      gsap.to(portraitWrapperEl, {
        height: viewport.isMobile
          ? viewportWidth * 0.6 * (5 / 4)
          : viewportHeight * 0.5,
        width: viewport.isMobile
          ? viewportWidth * 0.6
          : viewportHeight * 0.5 * (4 / 5),
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          portraitWrapperElResized = true;
        },
      });
      gsap.to(portraitWrapperEl, {
        opacity: 1,
        duration: 0.1,
        delay: 0.1,
        ease: "power4.inOut",
      });
    }
  });

  $effect(() => {
    portraitWrapperEl;
    if (portraitWrapperElResized && portraitWrapperEl) {
      portraitWrapperEl.style.height = viewport.isMobile
        ? viewportWidth * 0.6 * (5 / 4) + "px"
        : viewportHeight * 0.5 + "px";
      portraitWrapperEl.style.width = viewport.isMobile
        ? viewportWidth * 0.6 + "px"
        : viewportHeight * 0.5 * (4 / 5) + "px";
    }
  });

  onMount(() => {
    isLoaded = true;
  });
</script>

<svelte:window
  bind:innerHeight={viewportHeight}
  bind:innerWidth={viewportWidth}
/>

<div data-hero class="bg-white w-full h-full text-accent pt-6 md:pt-0">
  <div
    class="relative w-full h-full overflow-hidden"
    style="height: {titleHeight}px"
  >
    <div
      class="absolute top-1/2 left-0 md:left-2 -translate-y-1/2 pointer-events-none pt-4 pb-10 md:pt-12"
      bind:clientHeight={titleHeight}
    >
      <InfoTitleAnimation />
    </div>
    <div
      class="absolute top-1/2 right-0 md:right-1 -translate-y-1/2 pointer-events-none pt-4 pb-10 md:pt-12"
    >
      <InfoTitleAnimation />
    </div>

    {#if portrait}
      <div
        bind:this={portraitWrapperEl}
        class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-0 w-0 overflow-hidden border-2 border-black opacity-0 pointer-events-none"
      >
        <div
          bind:this={portraitEl}
          class="absolute w-[60vw] md:w-auto md:h-[50vh] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 aspect-[4/5]"
        >
          <Image image={portrait} fit="cover" />
        </div>
      </div>
    {/if}

    {#if illustration}
      <div class="absolute bottom-0 right-0 p-1 flex gap-2 typo-2xl">
        <img class="h-[1.55lh]" src={illustration} alt="" />
      </div>
    {/if}
  </div>
</div>
