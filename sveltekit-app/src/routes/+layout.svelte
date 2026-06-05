<script lang="ts">
  import "../assets/css/main.css";

  import { PreviewMode, QueryLoader, VisualEditing } from "@sanity/sveltekit";
  import type { LayoutProps } from "./$types";
  import { page } from "$app/state";
  import { afterNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { client } from "$lib/sanity/client";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { menuState } from "$lib/states.svelte";

  const { children, data }: LayoutProps = $props();

  // svelte-ignore state_referenced_locally -- previewEnabled only changes on full page reload
  const { previewEnabled } = data;
  let layout: any = $derived(data?.layout?.data);
  let settings: any = $derived(layout?.settings);
  let caseStudies: number = $derived(layout?.caseStudies?.length ?? 0);

  afterNavigate(() => {
    menuState.open = false;
  });
</script>

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
      {@render children()}
      <Footer data={settings} />
    </QueryLoader>
  </VisualEditing>
</PreviewMode>

<!-- styling for preview elements are in main.css -->
