<script lang="ts">
  import { page } from "$app/state";
  import type { HomeQueryResult } from "$lib/sanity.types";

  type SeoData = NonNullable<NonNullable<HomeQueryResult["home"]>["seo"]>;

  interface Props {
    data?: SeoData | null;
    pageTitle?: string;
    noindex?: boolean;
  }

  let {
    data,
    pageTitle,
    noindex = false,
  }: Props = $props();

  // Default values
  const defaults = {
    ogType: "website",
    siteName: "Marco Meloni",
  };

  // Computed values - all must be available during SSR
  let title = $derived(
    data?.title
      ? `${data?.title}`
      : pageTitle
        ? `${pageTitle}`
        : defaults.siteName,
  );
  let description = $derived(data?.description ? data?.description : null);
  let image = $derived(data?.image || null);
  let ogType = defaults.ogType;
  let twitterCard = $derived(image ? "summary_large_image" : "summary");
  let siteName = defaults.siteName;
  // Origin + pathname only, so query strings don't produce duplicate canonicals
  let canonical = $derived(`${page.url.origin}${page.url.pathname}`);
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>{title}</title>
  {#if description}
    <meta name="description" content={description} />
  {/if}
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}

  <!-- Canonical URL -->
  {#if canonical}
    <link rel="canonical" href={canonical} />
  {/if}

  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content={ogType} />
  {#if canonical}
    <meta property="og:url" content={canonical} />
  {/if}
  <meta property="og:title" content={title} />
  {#if description}
    <meta property="og:description" content={description} />
  {/if}
  {#if image}
    <meta property="og:image" content={image} />
    <meta property="og:image:secure_url" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="1200" />
    <meta property="og:image:alt" content={title} />
  {/if}
  <meta property="og:site_name" content={siteName} />

  <!-- Twitter -->
  <meta name="twitter:card" content={twitterCard} />
  {#if canonical}
    <meta name="twitter:url" content={canonical} />
  {/if}
  <meta name="twitter:title" content={title} />
  {#if description}
    <meta name="twitter:description" content={description} />
  {/if}
  {#if image}
    <meta name="twitter:image" content={image} />
  {/if}
</svelte:head>
