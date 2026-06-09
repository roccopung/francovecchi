<script lang="ts">
  //@ts-nocheck
  import type { ElementImage } from "$lib/sanity.types";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import InfoTitleAnimation from "$lib/components/InfoTitleAnimation.svelte";
  import Image from "$lib/components/element/Image.svelte";
  import Cta from "$lib/components/element/Cta.svelte";
  import { onMount, onDestroy } from "svelte";

  type Props = {
    portrait?: ElementImage;
  };

  let { portrait }: Props = $props();
  let portraitWrapperEl: HTMLElement | undefined = $state();
  let portraitWrapperElResized: boolean = $state(false);
  let portraitEl: HTMLElement | undefined = $state();
  let viewportHeight: number = $state(0);
  let scrollOpacity = $state(1);
  let scrollY = $state(0);

  let cta = {
    ctaType: "linkEmail",
    linkEmail: {
      url: "mailto:hello@francovecchi.com",
      label: "Write an email",
    },
  };

  const handleScroll = () => {
    scrollOpacity = Number(1 - scrollY / (viewportHeight / 1.8)).toFixed(3);
  };

  onMount(async () => {
    const { gsap } = await import("gsap");
    if (portraitWrapperEl && portraitEl) {
      gsap.to(portraitWrapperEl, {
        height: viewportHeight * 0.5,
        width: viewportHeight * 0.5 * (4 / 5),
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
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
  });

  $effect(() => {
    portraitWrapperEl;
    if (portraitWrapperElResized && portraitWrapperEl) {
      portraitWrapperEl.style.height = viewportHeight * 0.5 + "px";
      portraitWrapperEl.style.width = viewportHeight * 0.5 * (4 / 5) + "px";
    }
  });

  onDestroy(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>

<svelte:window bind:innerHeight={viewportHeight} bind:scrollY />

<div
  data-hero
  class="bg-accent fixed h-[80svh] w-full top-0 left-0 p-1 text-dark-gray"
>
  <div class="relative w-full h-full" style="opacity: {scrollOpacity}">
    <div class="absolute top-1/2 left-2 -translate-y-1/2">
      <InfoTitleAnimation />
    </div>
    <div class="absolute top-1/2 right-1 -translate-y-1/2">
      <InfoTitleAnimation />
    </div>

    {#if portrait}
      <div
        bind:this={portraitWrapperEl}
        class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-0 w-0 overflow-hidden border border-black opacity-0"
      >
        <div
          bind:this={portraitEl}
          class="absolute h-[50vh] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 aspect-[4/5]"
        >
          <Image image={portrait} fit="cover" />
        </div>
      </div>
    {/if}

    <div class="absolute bottom-0 left-0 p-1 flex gap-2 typo-2xl">
      <img class="h-[1.55lh]" src="/temp/images/level-44.png" alt="" />
    </div>

    <div class="absolute bottom-0 right-0 p-1 w-fit z-30">
      <Cta
        {cta}
        font="sans"
        typo="s"
        uppercase={false}
        arrow={true}
        fill="var(--color-accent)"
      />
    </div>
  </div>
</div>
