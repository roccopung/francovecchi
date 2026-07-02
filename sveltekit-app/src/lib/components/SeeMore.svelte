<script lang="ts">
  import PathCallFranco from "$lib/components/svg/PathCallFranco.svelte";
  import ShearMarquee from "$lib/components/marquees/ShearMarquee.svelte";

  type Props = {
    itemsToLoad: number;
    itemsLoaded: number;
  };

  let { itemsToLoad = 1, itemsLoaded = $bindable(1) }: Props = $props();
</script>

<div class="w-full bg-white px-1.5 md:px-2">
  <div
    class="border-2 border-black rounded-m flex flex-col items-center justify-center overflow-hidden relative"
  >
    <div class="py-15 flex flex-col gap-0.5 items-center">
      <button
        onclick={() => (itemsLoaded += itemsToLoad)}
        class="z-10 typo-xs px-3 py-1 font-mono uppercase rounded-full border-2 border-black bg-white cursor-pointer hover:bg-black hover:text-white"
        >See more</button
      >
    </div>
    <div class="absolute left-0 pointer-events-none">
      <ShearMarquee />
    </div>
  </div>
</div>
