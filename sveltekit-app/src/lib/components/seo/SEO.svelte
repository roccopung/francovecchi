<script lang="ts">
  //@ts-nocheck

  let {
    data,
    pageTitle,
    noindex = false,
    pageDescription,
    isHomepage = false,
  } = $props();

  // Default values
  const defaults = {
    ogType: "website",
    siteName: "Franco Vecchi",
    image: "",
  };

  // Computed values - all must be available during SSR
  const title = $derived(
    isHomepage && data?.title
      ? `${defaults.siteName} | ${data.title}`
      : data?.title
        ? `${data?.title} | ${defaults.siteName}`
        : pageTitle
          ? `${pageTitle} | ${defaults.siteName}`
          : defaults.siteName,
  );
  const description = $derived(
    pageDescription
      ? pageDescription
      : data?.description
        ? data?.description
        : null,
  );
  const image = $derived(data?.image || null);
  const ogType = $derived(data?.ogType || defaults.ogType);
  const twitterCard = $derived(image ? "summary_large_image" : "summary");
  const siteName = $derived(data?.siteName || defaults.siteName);
  const canonical = $derived(data?.canonical);
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
