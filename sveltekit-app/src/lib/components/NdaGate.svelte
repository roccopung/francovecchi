<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import NextProject from "$lib/components/NextProject.svelte";

  let {
    next,
    firstProject,
    projectIndexes,
    title,
    incorrect = false,
  }: {
    title?: string | null;
    incorrect?: boolean;
    next?: any;
    firstProject?: any;
    projectIndexes?: any;
  } = $props();


</script>

<main class="h-[100svh] w-full bg-accent flex items-center justify-center p-2">
  <form
    method="POST"
    use:enhance
    class="bg-white rounded-m border-2 border-black p-2 flex flex-col gap-3 text-center w-[calc(100vw-4rem)] md:w-auto md:min-w-[24rem]"
  >
    <div class="typo-xs font-mono uppercase">(Protected project)</div>
    <h1 class="typo-3xl font-slanted">{title}</h1>
    <p class="font-sans font-medium typo-s">
      This project is under NDA. Enter the password to view it.
    </p>
    <p></p>
    <input
      type="password"
      name="password"
      placeholder="Password"
      required
      autocomplete="off"
      class="border-2 border-black rounded-full px-3 py-1 font-sans typo-md text-center"
    />
    {#if incorrect}
      <div class="typo-xs font-mono uppercase text-red-600">
        Incorrect password
      </div>
    {/if}
    <button
      type="submit"
      class="py-1 px-3 border-2 border-black rounded-full font-sans font-bold typo-md hover:bg-accent hover:text-white transition-fast"
    >
      Unlock
    </button>
  </form>
</main>

{#if next || firstProject}
  {#key page?.params?.slug}
    <NextProject {next} {firstProject} {projectIndexes} />
  {/key}
{/if}
