<script lang="ts">
  import type { gsap } from "gsap";
  import { onMount, onDestroy } from "svelte";

  let fra: HTMLElement;
  let fran: HTMLElement;
  let nco: HTMLElement;
  let ctx: gsap.Context | undefined;

  const animateTitle = (
    gsap: typeof import("gsap"),
    SplitText: typeof import("gsap/SplitText"),
  ) => {
    ctx = gsap.context(() => {
      gsap.set([fra, fran, nco], { opacity: 1 });

      // `dir`: -1 slides the word off to the left, +1 off to the right.
      const reveal = (el: HTMLElement, yPercent: number, dir: number) =>
        SplitText.create(el, {
          type: "chars, words",
          charsClass: "ht-char",
          autoSplit: true,
          onSplit: (self) => {
            // One-time entrance reveal on mount.
            gsap.from(self.chars, {
              duration: 0.3,
              yPercent,
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

      reveal(fra, -20, -6);
      reveal(fran, 20, 5);
      reveal(nco, -20, -6);
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

<div class="title typo-6xl font-slanted uppercase flex flex-col gap-2 trimmed">
  <div bind:this={fra} class="trimmed opacity-0">Fra</div>
  <div bind:this={fran} class="trimmed ml-2 md:ml-7 opacity-0">Fran</div>
  <div bind:this={nco} class="trimmed ml-4 md:ml-20 opacity-0">Nco</div>
</div>
