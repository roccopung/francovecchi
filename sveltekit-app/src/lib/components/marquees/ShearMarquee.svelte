<script lang="ts">
  import Shear from "$lib/components/svg/Shear.svelte";
  import Marquee from "svelte-fast-marquee";
  import { inView } from "$lib/actions/inView";

  let isVisible = $state(false);
</script>

<div use:inView={(v) => (isVisible = v)}>
  <Marquee autoFill play={isVisible} direction="left" speed={60}>
    <div
      class="flex items-center gap-3 ml-3 typo-5xl font-slanted uppercase text-white"
    >
      <Shear />
    </div>
  </Marquee>
</div>
