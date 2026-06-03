<script lang="ts">
  import { onMount } from "svelte";
  import HoverStar from "$lib/components/svg/HoverStar.svelte";

  // --- Tunables ---------------------------------------------------------
  const POOL = 3; // max stars visible at once
  const SVG_SIZE = 266; // intrinsic px size of HoverStar
  const SIZE_VW = 0.04; // default star size as a fraction of viewport width
  const MAX = 30; // peak size multiplier on the fastest flick
  const K = 6; // how strongly velocity grows the peak size
  const SPEED_REF = 2; // px/ms that maps to "fast" (normalises speed)
  const SPACING = 80; // px the cursor must travel before spawning
  const GROW = 0.3; // s to grow from minimum up to the velocity peak
  const LIFETIME = 0.3; // s before a spawned star fully fades
  const TILT = 10; // max degrees of directional tilt
  const SMOOTH = 0.7; // speed smoothing factor (lerp)

  let stars: HTMLDivElement[] = $state([]);

  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let gsap: typeof import("gsap").gsap;
    let cleanup = () => {};

    let pointer = { x: 0, y: 0 };
    let lastSpawn = { x: 0, y: 0 };
    let prev = { x: 0, y: 0, t: 0 };
    let speed = 0;
    let dir = 1;
    let poolIndex = 0;
    let primed = false;

    // default scale, relative to viewport width (recomputed on resize)
    let base = 0;
    const updateBase = () => (base = (window.innerWidth * SIZE_VW) / SVG_SIZE);
    updateBase();

    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

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
      if (Math.abs(dx) > 0.5) dir = Math.sign(dx);
      prev = { x: pointer.x, y: pointer.y, t };

      if (
        Math.hypot(pointer.x - lastSpawn.x, pointer.y - lastSpawn.y) >= SPACING
      ) {
        spawn();
        lastSpawn = { x: pointer.x, y: pointer.y };
      }
    }

    function spawn() {
      const el = stars[poolIndex];
      if (!el) return;
      poolIndex = (poolIndex + 1) % POOL;

      const norm = clamp(speed / SPEED_REF, 0, 1);
      // peak size captured from the velocity at this instant: minimum at rest,
      // up to base * MAX on the fastest flick — so every star differs
      const peak = base * clamp(1 + K * norm, 1, MAX);
      const rotation = TILT;

      gsap.killTweensOf(el);
      gsap.set(el, {
        x: pointer.x,
        y: pointer.y,
        xPercent: -50,
        yPercent: -50,
        scale: base, // start at the minimum size
        rotation,
        opacity: 1,
      });
      gsap
        .timeline()
        .to(el, { scale: peak, duration: GROW, ease: "back.out(1.5)" })
        .to(el, { scale: 0, duration: LIFETIME, ease: "expo.in" });
    }

    import("gsap").then((mod) => {
      gsap = mod.gsap;
      window.addEventListener("pointermove", onMove);
      window.addEventListener("resize", updateBase);
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", updateBase);
        stars.forEach((el) => el && gsap.killTweensOf(el));
      };
    });

    return () => cleanup();
  });
</script>

<div class="star-layer" aria-hidden="true">
  {#each Array(POOL) as _, i (i)}
    <div class="star mix-blend-multiply" bind:this={stars[i]}>
      <HoverStar />
    </div>
  {/each}
</div>

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
    will-change: transform, opacity;
  }
</style>
