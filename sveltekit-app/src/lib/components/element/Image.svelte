<script lang="ts">
  import { getImageDimensions } from "@sanity/asset-utils";
  import { urlFor } from "$lib/sanity/image";
  import { viewport } from "$lib/states.svelte";

  const SRCSET_WIDTHS = [480, 768, 1080, 1440, 1920, 2560];
  const MAX_SRCSET_WIDTH = 2560;

  interface Props {
    image: any;
    fit?: string;
    alt?: string;
    lazy?: boolean;
    preload?: boolean;
    height?: string;
    width?: number;
    sizes?: string;
    ratio?: number;
    visible?: boolean;
  }

  let {
    image,
    fit = "cover",
    alt = "Image",
    lazy = false,
    preload = false,
    height = "auto",
    width,
    sizes = "100vw",
    ratio = $bindable(),
    visible = $bindable(),
  }: Props = $props();

  let src = $derived(
    viewport.isMobile && image?.mobileImage ? image?.mobileImage : image,
  );
  let hasAsset = $derived(!!src?.asset);
  let dimensions = $derived(
    hasAsset ? getImageDimensions(src) : { width: 0, height: 0 },
  );
  let aspectRatio = $derived(dimensions?.width / dimensions?.height);
  let srcsetWidths = $derived.by(() => {
    const max = Math.min(MAX_SRCSET_WIDTH, dimensions.width);
    return [...SRCSET_WIDTHS.filter((w) => w < max), max];
  });
  let srcset = $derived(
    hasAsset
      ? srcsetWidths
          .map((w) => `${urlFor(src).width(w).url()} ${w}w`)
          .join(", ")
      : "",
  );
  let imageUrl = $derived(
    hasAsset
      ? urlFor(src)
          .width(width || dimensions.width)
          .url()
      : "",
  );
  let hotspot = $derived(src?.hotspot || { x: 0.5, y: 0.5 });

  $effect(() => {
    if (ratio === undefined) {
      ratio = aspectRatio;
    }
  });
</script>

<svelte:head>
  {#if preload}
    <link rel="preload" as="image" href={imageUrl} imagesrcset={srcset} imagesizes={sizes} />
  {/if}
</svelte:head>

{#if hasAsset}
  <img
    class=" transition-fast
	{fit === 'contain'
      ? 'object-contain h-full min-w-full w-auto max-w-full'
      : 'object-cover h-full w-full'}
	{height === 'full' ? 'h-full' : 'h-auto'}"
    loading={lazy ? "lazy" : "eager"}
    fetchpriority={lazy ? "low" : "high"}
    width={width || dimensions.width}
    height={(width || dimensions.width) / aspectRatio}
    style="aspect-ratio: {aspectRatio}; object-position: {hotspot.x *
      100}% {hotspot.y * 100}%;
"
    alt={src.alt || alt}
    {srcset}
    {sizes}
    onload={() => (visible = true)}
  />
{/if}
