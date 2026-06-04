<script lang="ts">
  import type { MarqueeckOptions } from "@arisbh/marqueeck";
  import Image from "$lib/components/element/Image.svelte";
  import Marqueeck from "@arisbh/marqueeck";

  type Props = {
    data: string;
  };

  let { data }: Props = $props();

  const options: MarqueeckOptions = {
    direction: "left",
    speed: 40,
  };
</script>

<Marqueeck {options}>
  <div
    class="flex items-center gap-8 ml-8 typo-5xl font-slanted uppercase text-dark-gray"
  >
    {data}
  </div>
</Marqueeck>
