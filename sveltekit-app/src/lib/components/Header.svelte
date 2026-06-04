<script lang="ts">
  import Logo from "$lib/components/svg/Logo.svelte";

  let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />
<nav
  class="fixed top-0 left-0 w-full p-1 font-mono uppercase z-30 bg-accent border-b border-black"
>
  <a
    href="/"
    rel="noreferrer"
    class="h-full flex transition-fast {scrollY > 10 ? 'w-7' : 'w-13'}"
    ><Logo /></a
  >
  <ul class="flex gap-0.5 self-end">
    <li
      class="bg-dark-gray border border-dark-gray text-accent rounded-full flex items-center hover:bg-white hover:text-black hover:border-black"
    >
      <a class="w-full h-full py-1 px-3" href="/">Case studies</a>
    </li>
    <li
      class="bg-dark-gray border border-dark-gray text-accent rounded-full flex items-center hover:bg-white hover:text-black hover:border-black"
    >
      <a class="w-full h-full py-1 px-3" href="/">Lookbook</a>
    </li>
    <li
      class="bg-dark-gray border border-dark-gray text-accent rounded-full flex items-center hover:bg-white hover:text-black hover:border-black"
    >
      <a class="w-full h-full py-1 px-3" href="/">Info</a>
    </li>
  </ul>
  <a
    class="py-1 px-3 bg-dark-gray border border-dark-gray text-accent rounded-full w-fit h-fit place-self-end hover:bg-white hover:text-black"
    href="/">Write!</a
  >
</nav>

<style>
  nav {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }
</style>
