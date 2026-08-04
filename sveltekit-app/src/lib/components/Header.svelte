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
  class="desktop-nav hidden md:grid fixed top-0 left-0 w-full px-2 py-1 font-mono uppercase z-30 border-black
  {page?.route?.id !== '/' ? 'bg-white' : ''}
  {scrollY > 10 ? 'border-b-2 bg-white' : ''}"
>
  <a
    href="/"
    rel="noreferrer"
    class="h-full flex transition-fast w-14"
    ><Logo /></a
  >

  <ul class="gap-0.5 self-end hidden md:flex">
    <li
      class="bg-dark-gray border-2 border-dark-gray text-white rounded-full flex items-center hover:bg-white hover:text-black hover:border-black"
    >
      <a class="w-full h-full py-1 px-3 hidden md:flex" href="/case-studies"
        >Case studies {#if caseStudies > 0}({caseStudies}){/if}</a
      >
      <a class="w-full h-full py-1 px-3 md:hidden" href="/case-studies"
        >Case studies</a
      >
    </li>
    <li
      class="bg-dark-gray border-2 border-dark-gray text-white rounded-full flex items-center hover:bg-white hover:text-black hover:border-black"
    >
      <a class="w-full h-full py-1 px-3" href="/gallery">Gallery</a>
    </li>
    <li
      class="bg-dark-gray border-2 border-dark-gray text-white rounded-full flex items-center hover:bg-white hover:text-black hover:border-black"
    >
      <a class="w-full h-full py-1 px-3" href="/info">Info</a>
    </li>
  </ul>
  <a
    class="py-1 px-3 bg-dark-gray border-2 border-dark-gray text-white rounded-full w-fit h-fit place-self-end hover:bg-white hover:text-black hidden md:block"
    href="mailto:hello@francovecchi.com">Write!</a
  >
</nav>

<!-- MOBILE NAV -->

<nav
  class="mobile-nav fixed top-0 left-0 w-full px-2 py-1 font-mono z-30 bg-white text-black outline-black outline-2 transition-all duration-300 {menuState.open ===
    true || scrollY > 10
    ? ' rounded-b-s rounded-b-s open'
    : ''} md:hidden"
>
  <div class="flex justify-between">
    <a href="/" rel="noreferrer" class="h-full flex transition-fast w-10"
      ><Logo /></a
    >

    <MenuButton />
  </div>

  <ul
    class="menu-dropdown bg-white flex flex-col gap-2 items-center text-center w-full h-0 overflow-hidden typo-3xl font-slanted"
    class:open={menuState.open}
    class:h-35={menuState.open}
    class:py-4={menuState.open}
  >
    <li>
      <a
        class="uppercase transition-opacity transition-fast delay-0 {!menuState.open
          ? 'delay-700 opacity-0'
          : ''}"
        href="/case-studies">Case studies</a
      >
    </li>
    <li>
      <a
        class="uppercase transition-opacity transition-fast delay-0 {!menuState.open
          ? 'delay-700 opacity-0'
          : ''}"
        href="/gallery">Gallery</a
      >
    </li>
    <li>
      <a
        class="uppercase transition-opacity transition-fast delay-0 {!menuState.open
          ? 'delay-700 opacity-0'
          : ''}"
        href="/info">Info</a
      >
    </li>
    <li>
      <a
        href="mailto:hello@francovecchi.com"
        class="border-2 border-black rounded-full py-1 px-3 flex items-start gap-1 typo-s bg-white font-mono hover:bg-black hover:text-white cursor-pointer mt-1 transition-opacity transition-fast delay-0 {!menuState.open
          ? 'delay-700 opacity-0'
          : ''}"
      >
        <!-- <span><ArrowEnter /></span> -->
        <!-- <span>Write an email</span> -->
        Write an email
      </a>
    </li>
  </ul>
</nav>

<style>
  .desktop-nav {
    transition-timing-function: (0.51, 0.19, 0.1, 1);
  }
  .mobile-nav {
    &.open {
      transition: all 300ms ease-in;
    }
    transition: all 300ms 1000ms ease-in;
  }

  .menu-dropdown {
    transition: all 400ms 500ms cubic-bezier(0.51, 0.19, 0.1, 1);
    &.open {
      transition: all 400ms cubic-bezier(0.51, 0.19, 0.1, 1);
    }
  }
  @media (min-width: 768px) {
    nav {
      grid-template-columns: 1fr auto 1fr;
    }
  }
</style>
