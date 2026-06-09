<script lang="ts">
  import type { gsap } from "gsap";
  import { onMount, onDestroy } from "svelte";

  let fra: HTMLElement;
  let fran: HTMLElement;
  let nco: HTMLElement;
  let ctx: gsap.Context | undefined;

  onMount(() => {
    document.fonts.ready.then(async () => {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(SplitText);

      ctx = gsap.context(() => {
        gsap.set([fra, fran, nco], { opacity: 1 });

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

        reveal(fra, -20);
        reveal(fran, 0);
        reveal(nco, 20);
      });
    });
  });

  onDestroy(() => ctx?.revert());
</script>

<div class="title typo-6xl font-slanted uppercase flex flex-col gap-2 trimmed">
  <div bind:this={fra} class="trimmed hidden md:block opacity-0">Fra</div>
  <div bind:this={fran} class="trimmed ml-7 hidden md:block opacity-0">
    Fran
  </div>
  <div bind:this={nco} class="trimmed ml-20 hidden md:block opacity-0">Nco</div>

  <div class="trimmed md:hidden">Franco</div>
  <div class="trimmed ml-7 md:hidden">Vecchi</div>
</div>
