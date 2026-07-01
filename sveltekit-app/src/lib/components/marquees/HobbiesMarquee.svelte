<script lang="ts">
  import Marquee from "svelte-fast-marquee";

  type Props = {
    data: any[] | null;
  };

  let { data }: Props = $props();
</script>

<Marquee autoFill speed={20}>
  <div class="flex items-center gap-2 typo-xs font-mono py-2">
    {#each data as item, index}
      <div class="trimmed"><span>Hobby {index + 1}:</span>&nbsp; {item}</div>
      •
    {/each}
  </div>
</Marquee>
