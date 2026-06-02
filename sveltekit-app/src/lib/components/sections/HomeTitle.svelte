<script lang="ts">
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import HoverStarEffect from "$lib/components/HoverStarEffect.svelte";
  import { onMount } from "svelte";

  let franco: HTMLElement = $state();
  let vecchi: HTMLElement = $state();

  onMount(async () => {
    const { default: gsap } = await import("gsap");
    const { SplitText } = await import("gsap/SplitText");
    gsap.registerPlugin(SplitText);

    // wait for the custom font so SplitText measures real glyph widths
    await document.fonts.ready;

    gsap.set(franco, { opacity: 1 });
    gsap.set(vecchi, { opacity: 1 });

    const revealFranco = (el: HTMLElement, delay: number) =>
      SplitText.create(el, {
        type: "chars, words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.chars, {
            duration: 0.3,
            yPercent: -20,
            scale: 0,
            stagger: 0.05,
            delay,
            ease: "power4.out",
          });
        },
      });

    const revealVecchi = (el: HTMLElement, delay: number) =>
      SplitText.create(el, {
        type: "chars, words",
        autoSplit: true,
        onSplit: (self) => {
          gsap.from(self.chars, {
            duration: 0.3,
            yPercent: 20,
            scale: 0,
            stagger: 0.05,
            delay,
            ease: "power4.out",
          });
        },
      });

    revealFranco(franco, 0);
    revealVecchi(vecchi, 0);
  });
</script>

<HoverStarEffect />

<div
  class="relative h-[100dvh] p-1 text-dark-gray flex items-end justify-between"
>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 title typo-6xl font-slanted uppercase flex flex-col gap-2"
  >
    <h1 bind:this={franco} class="trimmed hidden md:block">Franco</h1>
    <h1 bind:this={vecchi} class="trimmed ml-7 hidden md:block">Vecchi</h1>
    <h1 class="trimmed md:hidden">Franco</h1>
    <h1 class="trimmed ml-7 md:hidden">Vecchi</h1>
  </div>

  <div class="p-1 flex gap-2 typo-2xl-headings">
    <div class="uppercase font-slanted flex flex-col gap-1 items-end">
      <div class="trimmed -mr-0.5">Pushing</div>
      <div class="trimmed">keyrames</div>
    </div>
    <img class="h-[1.55lh]" src="/temp/images/pushing-keyframes.png" alt="" />
  </div>

  <a
    href="/"
    class="border-1 border-black rounded-full py-1 px-3 flex items-start gap-1 typo-s font-mono hover:bg-black hover:text-accent cursor-pointer"
  >
    <span><ArrowEnter /></span>
    <span>Write an email</span>
  </a>
</div>

<style>
  .trimmed {
    text-box: trim-both cap alphabetic;
  }

  :global(a:hover) {
    & svg.arrow-enter path {
      fill: var(--color-accent);
    }
  }
</style>
