<script lang="ts">
  //@ts-nocheck
  import type { ElementImage } from "$lib/sanity.types";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import InfoTitleAnimation from "$lib/components/InfoTitleAnimation.svelte";
  import Image from "$lib/components/element/Image.svelte";
  import Cta from "$lib/components/element/Cta.svelte";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";

  type Props = {
    portrait?: ElementImage;
  };

  let { portrait }: Props = $props();
  let portraitWrapperEl: HTMLElement | undefined = $state();
  let portraitWrapperElResized: boolean = $state(false);
  let portraitEl: HTMLElement | undefined = $state();
  let viewportHeight: number = $state(0);
  let viewportWidth: number = $state(0);
  let scrollOpacity = $state(1);
  let scrollY = $state(0);

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
        height:
          viewportWidth > 768 ? viewportHeight * 0.5 : viewportHeight * 0.4,
        width:
          viewportWidth > 768
            ? viewportHeight * 0.5 * (4 / 5)
            : viewportHeight * 0.4 * (4 / 5),
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
      portraitWrapperEl.style.height =
        viewportWidth > 768
          ? viewportHeight * 0.5 + "px"
          : viewportHeight * 0.4 + "px";
      portraitWrapperEl.style.width =
        viewportWidth > 768
          ? viewportHeight * 0.5 * (4 / 5) + "px"
          : viewportHeight * 0.4 * (4 / 5) + "px";
    }
  });
</script>

<svelte:window
  bind:innerHeight={viewportHeight}
  bind:innerWidth={viewportWidth}
  bind:scrollY
/>

<div
  data-hero
  class="bg-gray fixed h-[100svh] w-full top-0 left-0 text-accent"
>
  <div class="relative w-full h-full">
    <div
      class="absolute top-1/2 left-0 md:left-2 -translate-y-1/2 pointer-events-none"
    >
      <InfoTitleAnimation />
    </div>
    <div
      class="absolute top-1/2 right-0 md:right-1 -translate-y-1/2 pointer-events-none"
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
          class="absolute h-[40vh] md:h-[50vh] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 aspect-[4/5]"
        >
          <Image image={portrait} fit="cover" />
        </div>
      </div>
    {/if}

    <div class="absolute bottom-0 right-0 p-1 flex gap-2 typo-2xl">
      <img class="h-[1.55lh]" src="/temp/images/level-44.png" alt="" />
    </div>
  </div>
</div>
