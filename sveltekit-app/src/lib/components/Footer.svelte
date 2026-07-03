<script lang="ts">
  import { page } from "$app/state";
  import { onMount, onDestroy } from "svelte";

  type Social = {
    label: string;
    url: string;
  };
  type Props = {
    data: {
      animationTop?: any;
      animationBottom?: any;
      email?: string;
      phone?: string;
      social?: Social[];
    };
  };

  let { data }: Props = $props();
  let line: HTMLDivElement | null = $state(null);
  let pen: HTMLImageElement | null = $state(null);
  let mm: gsap.MatchMedia | undefined;
  let viewportHeight: number = $state(0);

  onMount(async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    mm = gsap.matchMedia();
    mm.add("(min-width: 720px)", () => {
      gsap.set(line, { opacity: 0 });

      gsap.fromTo(
        pen,
        { y: () => -viewportHeight - 150 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.to(line, {
        opacity: 1,
        scrollTrigger: {
          trigger: ".footer",
          start: "top 80%",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      // Guarantee the pen/line reset when the query stops matching.
      return () => {
        gsap.set([pen, line], { clearProps: "transform,opacity" });
      };
    });
  });

  onDestroy(() => mm?.revert());
</script>

<svelte:window bind:innerHeight={viewportHeight} />

{#if page.route.id !== "/case-studies/[slug]"}
  <footer class="bg-black p-2 footer">
    <div
      class="bg-white rounded-m border-2 border-black h-full sm:h-[calc(100svh-8.5rem)] w-full p-1 flex flex-col justify-between gap-4 overflow-hidden"
    >
      <div class="relative h-full w-full">
        <div
          class="flex justify-between typo-2xl font-slanted uppercase w-full pb-4 md:pb-0 px-1 text-dark-gray"
        >
          <div
            class="order-1 justify-self-center sm:justify-self-auto sm:order-0"
          >
            Work with me
          </div>

          <div class="justify-self-center sm:justify-self-end order-2">
            You won't regret it
          </div>
        </div>

        <div
          bind:this={line}
          class="absolute top-0 left-1/2 h-full bg-black w-[2px] mx-auto hidden sm:block"
        ></div>

        <div class="sm:absolute sm:top-1/2 sm:left-0 w-full central-grid grid">
          <div class="flex flex-col items-center justify-center gap-4">
            <div class="flex flex-col gap-0.5 items-center">
              <div class="font-sans font-bold typo-md">Write</div>
              <a
                class="typo-xs font-mono uppercase border-2 border-black px-3 py-1 rounded-full hover:bg-black hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:{data?.email}">{data?.email}</a
              >
            </div>
            <div class="flex flex-col gap-0.5 items-center">
              <div class="font-sans font-bold typo-md">Call</div>
              <a
                class="typo-xs font-mono uppercase border-2 border-black px-3 py-1 rounded-full hover:bg-black hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                href="tel:{data?.phone}">Call Franco</a
              >
            </div>
          </div>
          <div
            class="pt-4 sm:pt-0 flex flex-col gap-0.5 items-center justify-center"
          >
            <div class="font-sans font-bold typo-md">Follow</div>
            {#if data?.social}
              {#each data.social as social}
                <a
                  class="typo-xs font-mono uppercase border-2 border-black px-3 py-1 rounded-full hover:bg-black hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={social.url}>{social.label}</a
                >
              {/each}
            {/if}
          </div>
        </div>
      </div>

      <div class="grid bottom typo-2xl font-mono uppercase w-full px-1">
        <div
          class="typo-xs justify-self-center sm:justify-self-auto self-end order-0"
        >
          Franco Vecchi / All rights reserves
        </div>
        <img
          bind:this={pen}
          class="bg-white h-[3lh] aspect-auto p-0.5 self-center place-self-center sm:place-self-end order-2 sm:order-1"
          src="/temp/images/pen.png"
          alt=""
        />
        <div
          class="justify-self-center self-end sm:place-self-end typo-xs flex gap-1 order-1 sm:order-2"
        >
          <a href="#">Design</a>
          <a href="#">Code</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
{/if}

<style>
  .bottom {
    grid-template-columns: auto;
    grid-template-rows: auto auto 1fr;
    row-gap: 1rem;
  }

  .central-grid {
    grid-template-rows: auto auto auto;
  }

  @media (min-width: 640px) {
    .bottom {
      grid-template-rows: auto;
      grid-template-columns: 1fr auto 1fr;
    }

    .central-grid {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
  }
</style>
