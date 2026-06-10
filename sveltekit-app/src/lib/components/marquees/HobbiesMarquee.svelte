<script lang="ts">
  import type { MarqueeckOptions } from "@arisbh/marqueeck";
  import Marqueeck from "@arisbh/marqueeck";
  type Props = {
    data: any[] | null;
  };

  let { data }: Props = $props();

  const options: MarqueeckOptions = {
    direction: "left",
    speed: 20,
    onHover: "none",
  };
</script>

<Marqueeck {options}>
  <div class="flex items-center gap-2 typo-xs font-mono py-2">
    {#each data as item, index}
      <div class="trimmed"><span>Hobby {index + 1}:</span>&nbsp; {item}</div>
      •
    {/each}
  </div>
</Marqueeck>
