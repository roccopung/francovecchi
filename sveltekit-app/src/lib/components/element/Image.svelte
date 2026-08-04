<script lang="ts">
  import { getImageDimensions } from "@sanity/asset-utils";
  import { urlFor } from "$lib/sanity/image";
  import { viewport } from "$lib/states.svelte";

  interface Props {
    image: any;
    fit?: string;
    alt?: string;
    lazy?: boolean;
    preload?: boolean;
    height?: string;
    width?: number;
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
  let imageUrl = $derived(
    hasAsset
      ? urlFor(src)
          .width(width || dimensions.width)
          .url() + "&webp=format"
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
    <link rel="preload" as="image" href={imageUrl} />
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
    data-sizes="auto"
    width={dimensions.width}
    height={dimensions.height}
    style="aspect-ratio: {aspectRatio}; object-position: {hotspot.x *
      100}% {hotspot.y * 100}%;
"
    alt={src.alt || alt}
    src={imageUrl}
    onload={() => (visible = true)}
  />
{/if}
