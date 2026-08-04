<script lang="ts">
  import type { CallFranco } from "$lib/sanity.types";
  import StarIcon from "$lib/components/svg/StarIcon.svelte";
  import PortableText from "$lib/components/element/PortableText.svelte";
  import CTA from "$lib/components/element/Cta.svelte";

  type Props = {
    data: CallFranco;
  };

  let { data }: Props = $props();
</script>

<section
  class="relative py-4 md:pt-2 md:pb-6 bg-black w-full oveflow-hidden text-white pointer-events-none"
>
  <div
    class="relative flex gap-2 font-slanted justify-center typo-call-franco uppercase max-w-lg mx-auto md:max-w-none"
  >
    <div>Call Franco</div>
    <div class="h-[0.2lh] md:h-[0.1lh] translate-y-[0.07lh] ml-0.5 aspect-square">
      <StarIcon fill="var(--color-white)" />
    </div>
  </div>

  <div
    class="max-w-3xl xl:max-w-1/2 text-center font-sans typo-s font-medium flex flex-col items-center gap-1 mx-auto pointer-events-auto"
  >
    <PortableText data={data?.content} />
    <CTA fill="var(--color-black)" cta={data?.cta} arrow={true} typo="xs" />
  </div>
</section>
