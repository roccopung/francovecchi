<script lang="ts">
  import type { ElementImage, Character } from "$lib/sanity.types";
  import Image from "$lib/components/element/Image.svelte";
  import CharactersMarquee from "$lib/components/marquees/CharactersMarquee.svelte";
  import { onMount } from "svelte";

  type Props = {
    characters: Character[];
  };

  let { characters }: Props = $props();

  let viewportWidth: number = $state(0);
  let characterRefs: HTMLElement[] = $state([]);

  onMount(async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    for (let i = 0; i < characterRefs.length; i++) {
      const xPercents = [
        (((viewportWidth / 8) * 0.5) / 2) * -1,
        (((viewportWidth / 8) * 0.5) / 2) * -0.5,
        (((viewportWidth / 8) * 0.5) / 2) * 0.5,
        (((viewportWidth / 8) * 0.5) / 2) * 1,
      ];
      gsap.from(characterRefs[i], {
        scrollTrigger: {
          trigger: characterRefs[i],
          start: "top 90%",
          end: "+=100",
          scrub: 1,
        },
        scale: 0.5,
        xPercent: xPercents[i % 4],
      });
    }
  });
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<section class="hidden md:grid-4 overflow-hidden w-full">
  {#each characters as character, i}
    <div
      bind:this={characterRefs[i]}
      class="aspect-[4/5] overflow-hidden rounded-xs md:rounded-s"
    >
      <Image image={character?.cover} />
    </div>
  {/each}
</section>

<section class="overflow-hidden md:hidden">
  <CharactersMarquee data={characters} />
</section>
