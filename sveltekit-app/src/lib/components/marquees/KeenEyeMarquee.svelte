<script lang="ts">
  import Marquee from "svelte-fast-marquee";
  import StarIcon from "$lib/components/svg/StarIcon.svelte";
  import { inView } from "$lib/actions/inView";

  type Props = {
    data?: string;
  };

  let { data }: Props = $props();
  let isVisible = $state(false);
</script>

<div use:inView={(v) => (isVisible = v)}>
  <Marquee
    play={isVisible}
    speed={0}
    gap="3rem"
    autoFill
    class="typo-5xl font-slanted uppercase text-white overflow-hidden w-fit"
  >
    <div class="h-[0.3lh] -mr-1"><StarIcon /></div>
    {data}
  </Marquee>
</div>
