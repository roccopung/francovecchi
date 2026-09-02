<script lang="ts">
  import type { Info } from "$lib/sanity.types";
  import PortableText from "$lib/components/element/PortableText.svelte";

  type Props = {
    section: Info;
  };

  let { section }: Props = $props();
</script>

<section class="p-2">
  <div
    class="rounded-m border-2 border-black flex flex-col gap-1 w-full py-4 px-3"
  >
    <h4 class="typo-l font-bold font-sans">{section?.title}</h4>
    <div class="typo-s font-sans xl:max-w-1/2">
      <PortableText data={section?.content} />
    </div>
  </div>
</section>
