<script lang="ts">
  import Logo from "$lib/components/svg/Logo.svelte";
  import MenuButton from "$lib/components/MenuButton.svelte";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";
  import { menuState } from "$lib/states.svelte";
  import { page } from "$app/state";

  type Props = {
    caseStudies: number;
  };

  let { caseStudies }: Props = $props();

  let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<!-- DESKTOP NAV -->

<nav
  class="hidden md:grid fixed top-0 left-0 w-full p-1 font-mono uppercase z-30 border-black
  {page?.route?.id !== '/' ? 'bg-accent' : ''}
  {scrollY > 10 ? 'border-b bg-accent' : ''}"
>
  <a
    href="/"
    rel="noreferrer"
    class="h-full flex transition-fast {scrollY > 10 ? 'w-7' : 'w-13'}"
    ><Logo /></a
  >

  <ul class="gap-0.5 self-end hidden md:flex">
    <li
      class="bg-dark-gray border border-dark-gray text-accent rounded-full flex items-center hover:bg-white hover:text-black hover:border-black"
    >
      <a class="w-full h-full py-1 px-3 hidden md:flex" href="/case-studies"
        >Case studies {#if caseStudies > 0}({caseStudies}){/if}</a
      >
      <a class="w-full h-full py-1 px-3 md:hidden" href="/case-studies"
        >Case studies</a
      >
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
    class="py-1 px-3 bg-dark-gray border border-dark-gray text-accent rounded-full w-fit h-fit place-self-end hover:bg-white hover:text-black hidden md:block"
    href="/">Write!</a
  >
</nav>

<!-- MOBILE NAV -->

<nav
  class="fixed top-0 left-0 w-full p-1 font-mono z-30 bg-accent outline-accent outline-1 transition-all duration-300 {menuState.open ===
    true || scrollY > 10
    ? 'outline-black rounded-b-s rounded-b-s'
    : ''} md:hidden"
>
  <div class="flex justify-between">
    <a href="/" rel="noreferrer" class="h-full flex transition-fast w-8"
      ><Logo /></a
    >

    <MenuButton />
  </div>

  <ul
    class="bg-accent flex flex-col gap-2 items-center text-center w-full h-0 overflow-hidden list-mobile typo-3xl font-slanted"
    class:h-35={menuState.open}
    class:py-4={menuState.open}
  >
    <li>
      <a
        class="uppercase transition-opacity transition-fast"
        class:opacity-0={!menuState.open}
        href="/">Case studies</a
      >
    </li>
    <li>
      <a
        class="uppercase transition-opacity transition-fast"
        class:opacity-0={!menuState.open}
        href="/">Lookbook</a
      >
    </li>
    <li>
      <a
        class="uppercase transition-opacity transition-fast"
        class:opacity-0={!menuState.open}
        href="/">Info</a
      >
    </li>
    <li>
      <a
        href="/"
        class="border-1 border-black rounded-full py-1 px-3 flex items-start gap-1 typo-s font-mono hover:bg-black hover:text-accent cursor-pointer mt-1 transition-opacity transition-fast"
        class:opacity-0={!menuState.open}
      >
        <span><ArrowEnter /></span>
        <span>Write an email</span>
      </a>
    </li>
  </ul>
</nav>

<style>
  nav {
    transition-timing-function: cubic-bezier(0.51, 0.19, 0.1, 1);
  }

  .list-mobile {
    transition: all 400ms cubic-bezier(0.51, 0.19, 0.1, 1);
  }
  @media (min-width: 768px) {
    nav {
      grid-template-columns: 1fr auto 1fr;
    }
  }
</style>
