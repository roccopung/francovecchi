<script lang="ts">
  import Marquee from "svelte-fast-marquee";

  type Props = {
    data: any[] | null;
  };

  let { data }: Props = $props();
</script>

<Marquee autoFill speed={20} gap="2rem">
  {#each data as item, index}
    <div class="trimmed typo-s font-mono py-2">
      <span>Hobby {index + 1}:</span>&nbsp; {item}
    </div>
    •
  {/each}
</Marquee>
