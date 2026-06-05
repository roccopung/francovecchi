<script lang="ts">
  import type { SectionInfo } from "$lib/types.ts";
  import PortableText from "$lib/components/element/PortableText.svelte";

  type Props = {
    section: SectionInfo;
  };

  let { section }: Props = $props();

  $effect(() => {
    console.log(section);
  });
</script>

<section class="px-0.5">
  <div
    class="rounded-m py-4 border border-black flex flex-col gap-1 w-full px-3"
  >
    <h4 class="typo-l font-bold font-sans">{section?.title}</h4>
    <div class="typo-s font-sans"><PortableText data={section?.content} /></div>
  </div>
</section>
