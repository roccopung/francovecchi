<script lang="ts">
  import { inView } from "$lib/actions/inView";
  import StarIcon from "$lib/components/svg/StarIcon.svelte";
  import Marquee from "svelte-fast-marquee";

  type Props = {
    data: any[] | null;
  };

  let { data }: Props = $props();
  let isVisible = $state(false);
</script>

<div use:inView={(v) => (isVisible = v)}>
  <Marquee
    autoFill
    play={isVisible}
    direction="left"
    speed={isVisible ? 60 : 0}
  >
    <div class="flex items-center gap-2 ml-2 typo-3xl font-slanted">
      {#each data as item}
        <div class="h-[0.5lh] aspect-square"><StarIcon fill="var(--color-black)" /></div>
        <div class="trimmed py-3">{item}</div>
      {/each}
    </div>
  </Marquee>
</div>
