<script module lang="ts">
  import type { PageBuilderSection } from "$lib/types";

  const componentMap: Record<
    PageBuilderSection["_type"],
    () => Promise<{ default: any }>
  > = {
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
        componentPromise: componentMap[section._type](),
      })),
  );
</script>

<div class="flex flex-col gap-0.5">
  {#each orderedComponents as { section, componentPromise }}
    {#await componentPromise then Module}
      {@const Component = Module.default}
      <Component {section} />
    {/await}
  {/each}
</div>
