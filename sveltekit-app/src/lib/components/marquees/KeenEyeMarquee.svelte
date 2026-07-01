<script lang="ts">
  import Marquee from "svelte-fast-marquee";
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
    speed={isVisible ? 40 : 0}
    gap="10rem"
    autoFill
    class="typo-5xl font-slanted uppercase text-white overflow-hidden w-fit"
  >
    {data}
  </Marquee>
</div>
