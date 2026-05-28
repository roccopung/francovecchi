<script lang="ts">
  import { getImageDimensions } from "@sanity/asset-utils";
  import { urlFor } from "$lib/sanity/image";

  interface Props {
    image: any;
    fit?: string;
    alt?: string;
    lazy?: boolean;
    preload?: boolean;
    height?: string;
    width?: number;
    ratio?: number;
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
  }: Props = $props();

  let innerWidth = $state(1280);
  let visible = $state(false);

  let src = $derived(
    innerWidth < 768 && image?.mobileImage ? image?.mobileImage : image,
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

<svelte:window bind:innerWidth />

<svelte:head>
  {#if preload}
    <link rel="preload" as="image" href={imageUrl} />
  {/if}
</svelte:head>

{#if hasAsset}
  <img
    class="transition-fast
	{fit === 'contain'
      ? 'object-contain h-full min-w-full w-auto max-w-full'
      : 'object-cover h-full w-full'}
	{height === 'full' ? 'h-full' : 'h-auto'}
	{visible === true ? 'opacity-100' : 'opacity-0'}"
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
