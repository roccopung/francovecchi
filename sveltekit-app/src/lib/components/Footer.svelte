<script lang="ts">
  import Cta from "$lib/components/element/Cta.svelte";

  type Social = {
    label: string;
    url: string;
  };
  type Props = {
    data: {
      animationTop?: any;
      animationBottom?: any;
      email?: string;
      phone?: string;
      social?: Social[];
    };
  };

  let { data }: Props = $props();
</script>

<footer class="bg-accent p-1">
  <div
    class="bg-white rounded-m border border-black h-[calc(100dvh-6.5rem)] w-full p-1 flex flex-col justify-between gap-4"
  >
    <div class="top typo-2xl font-slanted uppercase w-full px-1 text-dark-gray">
      <div>Work with me</div>
      <img
        class="h-[1lh] aspect-auto p-0.5 self-center"
        src="/temp/images/astrocat.png"
        alt=""
      />
      <div class="justify-self-end">You won't regret it</div>
    </div>

    <div class="center h-full relative h-full w-full">
      <div
        class="h-full border-l border-black border-[0.5px] w-[1px] mx-auto"
      ></div>
      <div class="absolute top-1/2 -translate-y-1/2 left-0 w-full central-grid">
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="flex flex-col gap-0.5 items-center">
            <div class="font-sans font-bold typo-md">Write</div>
            <a
              class="typo-xs font-mono uppercase border border-black px-3 py-1 rounded-full hover:bg-black hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:{data?.email}">{data?.email}</a
            >
          </div>
          <div class="flex flex-col gap-0.5 items-center">
            <div class="font-sans font-bold typo-md">Call</div>
            <a
              class="typo-xs font-mono uppercase border border-black px-3 py-1 rounded-full hover:bg-black hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
              href="tel:{data?.phone}">Call Franco</a
            >
          </div>
        </div>
        <div class="flex flex-col gap-0.5 items-center justify-center">
          <div class="font-sans font-bold typo-md">Follow</div>
          {#if data?.social}
            {#each data.social as social}
              <a
                class="typo-xs font-mono uppercase border border-black px-3 py-1 rounded-full hover:bg-black hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
                href={social.url}>{social.label}</a
              >
            {/each}
          {/if}
        </div>
      </div>
    </div>

    <div class="bottom typo-2xl font-mono uppercase w-full px-1">
      <div class="typo-xs self-end">Franco Vecchi / All rights reserves</div>
      <img
        class="h-[1lh] aspect-auto p-0.5 self-center place-self-end"
        src="/temp/images/pen.png"
        alt=""
      />
      <div class="place-self-end typo-xs flex gap-1">
        <a class="underline underline-offset-4" href="#">Design</a>
        <a class="underline underline-offset-4" href="#">Code</a>
        <a class="underline underline-offset-4" href="#">Cookies</a>
      </div>
    </div>
  </div>
</footer>

<style>
  .top,
  .bottom {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }

  .central-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
</style>
