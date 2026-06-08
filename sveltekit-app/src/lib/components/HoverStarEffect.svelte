<script lang="ts">
  import { onMount } from "svelte";
  import HoverStar from "$lib/components/svg/HoverStar.svelte";

  // GSAP is browser-only; load it on mount so it never runs during SSR.
  let gsap: any = $state();

  // --- Tunables ---------------------------------------------------------
  const POOL = 20;
  const SIZE_VW = 0.04;
  const MAX = 80;
  const K = 6;
  const SPEED_REF = 8;
  const SPACING = 90;
  const GROW = 0.4;
  const LIFETIME = 0.3;
  const TILT = 10;
  const SMOOTH = 1;

  let stars: HTMLDivElement[] = $state([]);
  let starLayer: HTMLDivElement | undefined = $state(undefined);
  let scrollY = $state(0);
  let viewportHeight = $state(0);

  let pointer = { x: 0, y: 0 };
  let lastSpawn = { x: 0, y: 0 };
  let prev = { x: 0, y: 0, t: 0 };
  let speed = 0;
  let poolIndex = 0;
  let primed = false;
  let base = 0;

  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));
  const updateBase = () => (base = window.innerWidth * SIZE_VW);

  function onMove(e: PointerEvent) {
    const t = performance.now();
    pointer = { x: e.clientX, y: e.clientY };

    if (!primed) {
      prev = { x: pointer.x, y: pointer.y, t };
      lastSpawn = { x: pointer.x, y: pointer.y };
      primed = true;
      return;
    }

    const dx = pointer.x - prev.x;
    const dy = pointer.y - prev.y;
    const dt = clamp(t - prev.t, 1, 100);
    const instant = Math.hypot(dx, dy) / dt;

    speed += (instant - speed) * SMOOTH;
    prev = { x: pointer.x, y: pointer.y, t };

    if (
      Math.hypot(pointer.x - lastSpawn.x, pointer.y - lastSpawn.y) >= SPACING
    ) {
      spawn();
      lastSpawn = { x: pointer.x, y: pointer.y };
    }
  }

  function spawn() {
    if (!gsap) return;
    const el = stars[poolIndex];
    if (!el) return;
    poolIndex = (poolIndex + 1) % POOL;

    const norm = clamp(speed / SPEED_REF, 0, 1);
    const peak = base * clamp(1 + K * norm, 1, MAX);

    gsap.killTweensOf(el);
    gsap.set(el, {
      x: pointer.x,
      y: pointer.y,
      xPercent: -50,
      yPercent: -50,
      width: base,
      height: base,
      rotation: TILT,
      opacity: 1,
    });
    gsap
      .timeline()
      .to(el, {
        width: peak,
        height: peak,
        duration: GROW,
        ease: "back.out(1.5)",
      })
      .to(el, {
        width: 0,
        height: 0,
        duration: LIFETIME,
        ease: "power4.inOut",
      });
  }

  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    updateBase();
    window.addEventListener("resize", updateBase);
    import("gsap").then((m) => (gsap = m.gsap));

    return () => window.removeEventListener("resize", updateBase);
  });

  $effect(() => {
    if (!gsap || !starLayer) return;

    const target = starLayer.parentElement ?? window;
    target.addEventListener("pointermove", onMove as EventListener);

    return () => {
      target.removeEventListener("pointermove", onMove as EventListener);
      stars.forEach((el) => el && gsap!.killTweensOf(el));
    };
  });
</script>

<svelte:window bind:scrollY bind:innerHeight={viewportHeight} />

{#if scrollY < viewportHeight * 0.5}
  <div
    bind:this={starLayer}
    class="star-layer hidden md:block"
    aria-hidden="true"
  >
    {#each Array(POOL) as _, i (i)}
      <div class="star mix-blend-multiply" bind:this={stars[i]}>
        <HoverStar />
      </div>
    {/each}
  </div>
{/if}

<style>
  .star-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
  }

  .star {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform-origin: center;
    will-change: width, height, transform, opacity;
  }
</style>
