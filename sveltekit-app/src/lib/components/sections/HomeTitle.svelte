<script lang="ts">
  //@ts-nocheck
  import Cta from "$lib/components/element/Cta.svelte";
  import StarIcon from "$lib/components/svg/StarIcon.svelte";
  import { onMount, onDestroy } from "svelte";

  let { illustration } = $props();

  let franco: HTMLElement;
  let vecchi: HTMLElement;
  let star: HTMLElement;
  let ctx: gsap.Context | undefined;
  let scrollY = $state(0);
  let viewportHeight = $state(0);
  let scrollOpacity = $derived(
    Math.max(0, 1 - scrollY / (viewportHeight / 1.6)),
  );

  let cta = {
    ctaType: "linkEmail",
    linkEmail: {
      url: "hello@francovecchi.com",
      label: "Write an email",
    },
  };

  const animateTitle = (
    gsap: typeof import("gsap"),
    SplitText: typeof import("gsap/SplitText"),
  ) => {
    ctx = gsap.context(() => {
      gsap.set([franco, vecchi, star], { opacity: 1 });

      // `dir`: -1 slides the word off to the left, +1 off to the right.
      const reveal = (el: HTMLElement, dir: number) =>
        SplitText.create(el, {
          type: "chars, words",
          charsClass: "ht-char",
          autoSplit: true,
          onSplit: (self) => {
            // One-time entrance reveal on mount.
            gsap.from(self.chars, {
              duration: 0.3,
              scale: 0,
              stagger: 0.05,
              ease: "power4.out",
            });

            return gsap.to(self.words, {
              scrollTrigger: {
                start: 0,
                scrub: 0.5,
              },
              x: () => dir * window.innerWidth,
              stagger: { from: dir < 0 ? "start" : "end" },
              ease: "none",
            });
          },
        });

      const francoDir = -6;
      reveal(franco, francoDir);
      reveal(vecchi, 5);

      // The star lives outside the split text, so it needs its own tweens to
      // enter after the last char and travel off-screen with "Franco". Its
      // trigger is `franco` so start/end match the word's own ScrollTrigger.
      gsap.from(star, {
        duration: 0.2,
        scale: 0,
        delay: 0,
        opacity: 1,
        ease: "power4.out",
      });
      gsap.to(star, {
        scrollTrigger: {
          trigger: franco,
          start: 0,
          end: "+=10",
          scrub: 0.5,
        },
        opacity: 0,
        ease: "power4.out",
      });
    });
  };

  onMount(() => {
    document.fonts.ready.then(async () => {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(SplitText, ScrollTrigger);

      animateTitle(gsap, SplitText);

      // Recalculate trigger positions once fonts/layout have settled.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => ScrollTrigger.refresh()),
      );
    });
  });

  onDestroy(() => ctx?.revert());
</script>

<svelte:window bind:innerHeight={viewportHeight} bind:scrollY />

<div data-hero class="bg-white fixed h-[100svh] md:h-[80vh] w-full top-0 left-0 p-1">
  <div class="relative w-full h-full">
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 title pt-6 md:pt-0 typo-francotitle font-slanted uppercase flex flex-col gap-2 pointer-events-none
pointer-events-none"
    >
      <div class="flex gap-1 whitespace-nowrap">
        <h1 bind:this={franco} class="trimmed opacity-0 text-accent">Franco</h1>
        <span
          bind:this={star}
          class="h-[0.2lh] md:h-[0.15lh] opacity-0 ml-[0.1lh] aspect-square"
        >
          <StarIcon fill="var(--color-accent)" />
        </span>
      </div>
      <h1
        bind:this={vecchi}
        class="trimmed ml-7 opacity-0 text-accent whitespace-nowrap"
      >
        Vecchi
      </h1>
    </div>

    <div class="absolute bottom-0 right-0 p-1 w-fit z-30 typo-2xl">
      <img class="h-[3lh] md:h-[1.55lh]" src={illustration} alt="" />
    </div>
  </div>
</div>

<style>
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
