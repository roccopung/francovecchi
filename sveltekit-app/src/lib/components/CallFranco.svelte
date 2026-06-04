<script lang="ts">
  import type { PortableTextBlock } from "@sanity/types";
  import type { Cta } from "$lib/types";
  import { onMount } from "svelte";
  import HoverStar from "$lib/components/svg/HoverStar.svelte";
  import Path from "$lib/components/svg/PathCallFranco.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import CTA from "$lib/components/element/Cta.svelte";

  type Props = {
    data: {
      content: PortableTextBlock[];
      cta: Cta;
    };
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
  class="relative py-9 bg-accent w-full oveflow-hidden text-dark-gray"
>
  <div
    class="absolute top-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
  >
    <Path />
  </div>
  <div
    class="relative flex justify-between gap-1 font-slanted typo-call-franco uppercase"
  >
    <span>Call</span>
    <span class="mr-[0.05lh]">Franco</span>
    <div
      bind:this={stars[0]}
      class="absolute top-1/4 left-[28vw] opacity-0 pointer-events-none"
    >
      <div class="rotate-10 w-[8vw]"><HoverStar /></div>
    </div>
    <div
      bind:this={stars[1]}
      class="absolute bottom-[12%] left-[32vw] opacity-0 pointer-events-none"
    >
      <div class="rotate-10 w-[12vw]"><HoverStar /></div>
    </div>
    <div
      bind:this={stars[2]}
      class="absolute bottom-[16%] left-[34vw] opacity-0 pointer-events-none"
    >
      <div class="rotate-10 w-[15vw]"><HoverStar /></div>
    </div>
  </div>

  <div
    class="max-w-2xl text-center font-sans typo-l font-medium flex flex-col items-center gap-1 mx-auto"
  >
    <PortableText data={data?.content} />
    <CTA fill="var(--color-accent)" cta={data?.cta} />
  </div>
</section>

<style>
</style>
