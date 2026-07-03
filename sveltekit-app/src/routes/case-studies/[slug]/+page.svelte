<script lang="ts">
  import ProjectView from "$lib/components/ProjectView.svelte";
  import NdaGate from "$lib/components/NdaGate.svelte";

  let { data, form }: any = $props();
</script>

{#if data.locked}
  <NdaGate
    next={data.next}
    firstProject={data.firstProject}
    projectIndexes={data.projectIndexes}
    title={data.title}
    incorrect={form?.incorrect}
  />
{:else}
  <ProjectView {data} />
{/if}
