<script lang="ts">
  import type { ElementImage } from "$lib/types";
  import Image from "$lib/components/element/Image.svelte";
  import { onMount, onDestroy } from "svelte";
  import { goto } from "$app/navigation";

  type Props = {
    next?: {
      cover: ElementImage;
      slug: any;
      title: string;
    };
    firstProject?: {
      cover: ElementImage;
      slug: any;
      title: string;
    };
    projectIndexes?: any;
  };
  let { next, firstProject, projectIndexes }: Props = $props();
  let displayedProject = $derived(next ?? firstProject);
  let sectionNext: HTMLDivElement | null = $state(null);
  let labelWrapper: HTMLDivElement | null = $state(null);
  let labelNextEpisode: HTMLElement | null = $state(null);
  let labelTitle: HTMLElement | null = $state(null);
  let viewportWidth: number = $state(0);
  let viewportHeight: number = $state(0);
  let currentIndex = $derived(
    projectIndexes?.findIndex(
      (index: any) => index?.slug?.current === displayedProject?.slug.current,
    ),
  );
  let key = $state(0);

  let _gsap: any;
  let _SplitText: any;
  let _ScrollTrigger: any;
  let ctx: gsap.Context | undefined;
  let mountCtx: gsap.Context | undefined;
  let goToNextCtx: gsap.Context | undefined;

  const goToNextProject = () => {
    mountCtx?.kill();
    ctx?.kill();

    goToNextCtx = _gsap
      .timeline({
        defaults: { duration: 0.8, ease: "power4.out" },
        onComplete: () => {
          if (
            document.startViewTransition &&
            typeof document.startViewTransition === "function"
          ) {
            // Use view transition
            document.startViewTransition(() => {
              goto(`/case-studies/${displayedProject?.slug.current}`);
            });
          } else {
            // Fallback: direct navigation without view transition
            goto(`/case-studies/${displayedProject?.slug.current}`);
          }
        },
      })
      .to(
        ".wrapper",
        {
          height: viewportHeight,
          position: "fixed",
          bottom: 0,
          left: 0,
        },
        0,
      )
      .to(".cover", { translateY: 0, scale: 1 }, 0)
      .to(".dark-layer", { opacity: 0 }, 0);
  };

  onMount(async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const { SplitText } = await import("gsap/SplitText");

    _gsap = gsap;
    _SplitText = SplitText;
    _ScrollTrigger = ScrollTrigger;
    gsap.registerPlugin(SplitText, ScrollTrigger);

    mountCtx = gsap.context(() => {
      gsap.to(".dark-layer", {
        scrollTrigger: {
          trigger: sectionNext,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 2,
        },
        opacity: 0.3,
      });

      gsap.to(".cover", {
        scrollTrigger: {
          trigger: sectionNext,
          start: "top 90%",
          end: "bottom bottom",
          scrub: 2,
        },
        scale: 1,
      });

      gsap.to(".label", {
        scrollTrigger: {
          trigger: sectionNext,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 2,
        },
        width: viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 15,
      });
    });

    // On a client-side navigation no `load` event fires and the View Transition
    // is still settling, so the triggers above cache wrong positions. Refresh
    // once the new page has painted to recalculate them.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh()),
    );
  });

  onDestroy(() => {
    mountCtx?.kill();
    ctx?.kill();
  });

  // Re-runs only when {#key} recreates the label elements on navigation.
  $effect(() => {
    const episodeEl = labelNextEpisode;
    const titleEl = labelTitle;
    const label = labelWrapper;
    if (!episodeEl || !titleEl || !label || !_gsap || !_SplitText) return;

    ctx?.revert();
    ctx = _gsap.context(() => {
      _gsap.to(label, {
        scrollTrigger: {
          trigger: sectionNext,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 2,
        },
        width: viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 15,
      });
      _gsap.set([episodeEl, titleEl], { opacity: 1 });

      const reveal = (el: HTMLElement | null, yPercent: number) =>
        _SplitText.create(el, {
          type: "chars, words",
          charsClass: "ht-char",
          autoSplit: true,
          onSplit: (self: any) =>
            _gsap.from(self.chars, {
              scrollTrigger: {
                trigger: sectionNext,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 2,
              },
              duration: 0.3,
              yPercent,
              scale: 0,
              stagger: 0.05,
              ease: "power4.out",
            }),
        });

      reveal(episodeEl, -20);
      reveal(titleEl, 20);
    });

    return () => ctx?.revert();
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:window
  bind:innerHeight={viewportHeight}
  bind:innerWidth={viewportWidth}
/>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  onclick={() => goToNextProject()}
  bind:this={sectionNext}
  class="text-left w-full h-50"
>
  <div class="wrapper relative w-full h-50 overflow-hidden">
    <div
      bind:this={labelWrapper}
      class="label absolute z-[11] bottom-0 left-0 m-1 bg-white rounded-s border border-black p-1 flex flex-col gap-3"
    >
      <div
        class="typo-xs font-mono uppercase flex gap-1 items-center"
        bind:this={labelNextEpisode}
      >
        <span class="font-medium tabular-nums"
          >{currentIndex > 9 ? currentIndex + 1 : `0${currentIndex + 1}`}</span
        >
        <span>(Next episode)</span>
      </div>
      <h1 class="typo-3xl font-slanted label-title" bind:this={labelTitle}>
        {displayedProject?.title}
      </h1>
    </div>

    <div
      class="dark-layer absolute z-10 bg-black w-full h-full opacity-70 mix-blend-multiply"
    ></div>
    <div class="cover scale-105 h-[100svh] w-full">
      <Image image={displayedProject?.cover} />
    </div>
  </div>
</div>
