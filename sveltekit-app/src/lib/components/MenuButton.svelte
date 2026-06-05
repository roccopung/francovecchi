<script lang="ts">
  import { menuState } from "$lib/states.svelte";
</script>

<button class="block cursor-pointer" onclick={menuState.toggle}>
  {#if menuState.open}
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
        fill="#2F2F2F"
      />
      <rect
        x="10.8438"
        y="9.79102"
        width="16"
        height="2"
        transform="rotate(45 10.8438 9.79102)"
        fill="#FFF000"
      />
      <rect
        x="9.84375"
        y="20.791"
        width="16"
        height="2"
        transform="rotate(-45 9.84375 20.791)"
        fill="#FFF000"
      />
    </svg>
  {:else}
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
        fill="#2F2F2F"
      />
      <rect x="8" y="8" width="16" height="2" fill="#FFF000" />
      <rect x="8" y="15" width="16" height="2" fill="#FFF000" />
      <rect x="8" y="22" width="16" height="2" fill="#FFF000" />
    </svg>
  {/if}
</button>
