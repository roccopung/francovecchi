<script lang="ts">
  import type { gsap } from "gsap";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import { onMount, onDestroy } from "svelte";

  let franco: HTMLElement;
  let vecchi: HTMLElement;
  let ctx: gsap.Context | undefined;

  onMount(() => {
    // Wait for the custom font so SplitText measures glyphs correctly, then
    // load GSAP on the client only — it must never run during SSR.
    document.fonts.ready.then(async () => {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(SplitText);

      ctx = gsap.context(() => {
        gsap.set([franco, vecchi], { opacity: 1 });

        const reveal = (el: HTMLElement, yPercent: number) =>
          SplitText.create(el, {
            type: "chars, words",
            charsClass: "ht-char",
            autoSplit: true,
            // Return the tween so autoSplit reverts it before each re-split.
            onSplit: (self) =>
              gsap.from(self.chars, {
                duration: 0.3,
                yPercent,
                scale: 0,
                stagger: 0.05,
                ease: "power4.out",
              }),
          });

        reveal(franco, -20);
        reveal(vecchi, 20);
      });
    });
  });

  onDestroy(() => ctx?.revert());
</script>

<div
  data-hero
  class="bg-accent fixed h-[80svh] w-full top-0 left-0 p-1 text-dark-gray"
>
  <div class="relative w-full h-full">
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 title typo-6xl font-slanted uppercase flex flex-col gap-2"
    >
      <h1 bind:this={franco} class="trimmed hidden md:block opacity-0">
        Franco
      </h1>
      <h1 bind:this={vecchi} class="trimmed ml-7 hidden md:block opacity-0">
        Vecchi
      </h1>
      <h1 class="trimmed md:hidden">Franco</h1>
      <h1 class="trimmed ml-7 md:hidden">Vecchi</h1>
    </div>

    <div class="absolute bottom-0 left-0 p-1 flex gap-2 typo-2xl">
      <div class="uppercase font-slanted flex flex-col gap-1 items-end">
        <div class="trimmed -mr-0.5">Pushing</div>
        <div class="trimmed">keyrames</div>
      </div>
      <img class="h-[1.55lh]" src="/temp/images/pushing-keyframes.png" alt="" />
    </div>

    <div class="absolute bottom-0 right-0 p-1 w-fit z-30">
      <a
        href="/"
        class="border-1 border-black rounded-full py-1 px-3 flex items-start gap-1 typo-s font-mono hover:bg-black hover:text-accent cursor-pointer"
      >
        <span><ArrowEnter /></span>
        <span>Write an email</span>
      </a>
    </div>
  </div>
</div>

<style>
  .trimmed {
    text-box: trim-both cap alphabetic;
  }

  /* Safari clips the ink of slanted glyphs at the edge of their inline-block
     box. Padding gives the overhang room; the equal negative margin keeps
     layout (advance width + line box) unchanged. */
  :global(.ht-char) {
    padding: 0.15em 0.2em;
    margin: -0.15em -0.2em;
  }

  :global(a:hover) {
    & svg.arrow-enter path {
      fill: var(--color-accent);
    }
  }
</style>
