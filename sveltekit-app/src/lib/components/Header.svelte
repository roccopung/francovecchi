<script lang="ts">
  import Logo from "$lib/components/svg/Logo.svelte";
</script>

<nav class="fixed top-0 left-0 w-full p-1 h-8 font-mono uppercase">
  <a href="/" rel="noreferrer" class="w-13 h-full flex"><Logo /></a>
  <ul class="flex gap-0.5 self-end">
    <li class="py-1 px-3 bg-dark-gray text-accent rounded-full h-fit w-fit">
      <a href="/">Case studies</a>
    </li>
    <li class="py-1 px-3 bg-dark-gray text-accent rounded-full h-fit w-fit">
      <a href="/">Lookbook</a>
    </li>
    <li class="py-1 px-3 bg-dark-gray text-accent rounded-full h-fit w-fit">
      <a href="/">Info</a>
    </li>
  </ul>
  <a
    class="py-1 px-3 bg-dark-gray text-accent rounded-full w-fit h-fit place-self-end"
    href="/">Write!</a
  >
</nav>

<style>
  nav {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }
</style>
