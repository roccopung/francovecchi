<script lang="ts">
  import "../assets/css/main.css";

  import { PreviewMode, QueryLoader, VisualEditing } from "@sanity/sveltekit";
  import type { LayoutProps } from "./$types";
  import { page } from "$app/state";
  import { afterNavigate, onNavigate } from "$app/navigation";
  import { browser } from "$app/environment";
  import { resolve } from "$app/paths";
  import { client } from "$lib/sanity/client";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import {
    menuState,
    scroll,
    isScrollContainerRoute,
  } from "$lib/states.svelte";

  const { children, data }: LayoutProps = $props();

  // svelte-ignore state_referenced_locally -- previewEnabled only changes on full page reload
  const { previewEnabled } = data;
  let layout: any = $derived(data?.layout?.data);
  let settings: any = $derived(layout?.settings);
  let caseStudies: number = $derived(layout?.caseStudies?.length ?? 0);

  // Home and info scroll inside `.scroll-container`; every other route keeps
  // document scroll, so the wrapper stays a plain div there.
  let isScroller = $derived(isScrollContainerRoute(page.route.id));
  let scrollEl: HTMLElement | undefined = $state();

  const resetScroll = () => {
    scrollEl?.scrollTo(0, 0);
    window.scrollTo(0, 0);
    scroll.y = 0;
  };

  afterNavigate(() => {
    menuState.open = false;
    // if (browser) requestAnimationFrame(() => resetScroll());
  });

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        resetScroll()
        await navigation.complete;
        requestAnimationFrame(() => requestAnimationFrame(resetScroll));
      });
    });
  });
</script>

<!-- One-way on purpose: `bind:scrollY` also writes back via window.scrollTo. -->
<svelte:window onscroll={() => (scroll.y = window.scrollY)} />

<PreviewMode enabled={previewEnabled}>
  <VisualEditing enabled={previewEnabled}>
    <QueryLoader enabled={previewEnabled} {client}>
      {#if previewEnabled}
        <a
          href={resolve("/preview/disable", {
            redirect: page.url.pathname,
          })}
          class="preview-toggle"
        >
          <span>Preview Enabled</span>
          <span>Disable Preview</span>
        </a>
      {/if}

      <Header {caseStudies} />
      <div
        bind:this={scrollEl}
        class="scroll-container"
        class:is-scroller={isScroller}
        onscroll={(e) => (scroll.y = e.currentTarget.scrollTop)}
      >
        <div class="scroll-content">
          {@render children()}
          {#key page.url.pathname}
            <Footer data={settings} />
          {/key}
        </div>
      </div>
    </QueryLoader>
  </VisualEditing>
</PreviewMode>

<!-- styling for preview elements are in main.css -->
