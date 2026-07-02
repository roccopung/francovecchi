<script module lang="ts">
  import type { PageBuilder } from "$lib/sanity.types";

  type PageBuilderSection = NonNullable<PageBuilder["sections"]>[number];
  type SectionType = PageBuilderSection["_type"];

  const componentMap: Record<SectionType, () => Promise<{ default: any }>> = {
    stackedGallery: () =>
      import("$lib/components/page-builder/_StackedGallery.svelte"),
    info: () => import("$lib/components/page-builder/_Info.svelte"),
  };
</script>

<script lang="ts">
  type Props = { sections: PageBuilderSection[] };
  let { sections }: Props = $props();

  let orderedComponents = $derived(
    sections
      .filter((s) => s._type in componentMap)
      .map((section) => ({
        section,
        componentPromise: componentMap[section._type as SectionType](),
      })),
  );
</script>

<div class="flex flex-col gap-0.5 3xl:max-w-[70vw] 3xl:mx-auto">
  {#each orderedComponents as { section, componentPromise } (section._key)}
    {#await componentPromise then Module}
      {@const Component = Module.default}
      <Component {section} />
    {/await}
  {/each}
</div>
