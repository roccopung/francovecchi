<script lang="ts">
  import type { CallFranco } from "$lib/sanity.types";
  import { onMount } from "svelte";
  import HoverStar from "$lib/components/svg/HoverStar.svelte";
  import Path from "$lib/components/svg/PathCallFranco.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import CTA from "$lib/components/element/Cta.svelte";

  type Props = {
    data: CallFranco;
  };

  let { data }: Props = $props();

  let callFranco: HTMLElement | undefined = $state();
  let stars: HTMLElement[] | undefined = $state([]);

  onMount(async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    for (let i = 0; i < stars.length; i++) {
      gsap.to(stars[i], {
        scrollTrigger: {
          trigger: callFranco,
        },
        opacity: 1,
        duration: 0.2,
        delay: i * 0.1,
        ease: "power4.inOut",
      });
    }
  });
</script>

<section
  bind:this={callFranco}
  class="relative py-4 md:py-9 bg-accent w-full oveflow-hidden text-dark-gray"
>
  <div
    class="absolute top-1/2 -translate-y-1/2 w-full h-full pointer-events-none hidden md:block"
  >
    <Path />
  </div>
  <div
    class="relative flex justify-between gap-1 font-slanted typo-call-franco uppercase max-w-lg mx-auto md:max-w-none"
  >
    <span>Call</span>
    <span class="mr-[0.05lh]">Franco</span>
    <div
      bind:this={stars[0]}
      class="absolute top-1/4 left-1/2 -translate-x-9 md:translate-x-0 md:left-[28vw] opacity-0 pointer-events-none"
    >
      <div class="rotate-10 w-5 md:w-[8vw]"><HoverStar /></div>
    </div>
    <div
      bind:this={stars[1]}
      class="absolute bottom-[12%] left-1/2 -translate-x-8 md:translate-x-0 md:left-[32vw] opacity-0 pointer-events-none"
    >
      <div class="rotate-10 w-6 md:w-[12vw]"><HoverStar /></div>
    </div>
    <div
      bind:this={stars[2]}
      class="absolute bottom-[10%] md:bottom-[16%] left-1/2 -translate-x-7 md:translate-x-0 md:left-[34vw] opacity-0 pointer-events-none"
    >
      <div class="rotate-10 w-8 md:w-[15vw]"><HoverStar /></div>
    </div>
  </div>

  <div
    class="max-w-3xl xl:max-w-1/2 text-center font-sans typo-l font-medium flex flex-col items-center gap-1 mx-auto"
  >
    <PortableText data={data?.content} />
    <CTA fill="var(--color-accent)" cta={data?.cta} />
  </div>
</section>

<style>
</style>
