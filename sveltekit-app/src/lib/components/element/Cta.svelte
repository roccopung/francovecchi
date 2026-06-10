<script lang="ts">
  import type { Cta } from "$lib/sanity.types";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";

  type Props = {
    cta?: Cta;
    fill?:
      | "var(--color-accent)"
      | "var(--color-white)"
      | "var(--color-dark-gray)";
    font?: "mono" | "sans";
    typo?: "xs" | "s";
    uppercase?: boolean;
    arrow?: boolean;
  };

  let {
    cta,
    fill = "var(--color-white)",
    font = "mono",
    typo = "xs",
    uppercase = true,
    arrow = false,
  }: Props = $props();

  const fillClasses: Record<NonNullable<Props["fill"]>, string> = {
    "var(--color-accent)":
      "bg-accent text-black hover:bg-dark-gray hover:text-accent",
    "var(--color-white)": "bg-white text-black hover:bg-black hover:text-white",
    "var(--color-dark-gray)":
      "bg-dark-gray text-accent hover:bg-white hover:text-black",
  };

  let colorClass = $derived(fill ? (fillClasses[fill] ?? "") : "");
  let arrowFill = $derived.by(() => {
    if (fill === "var(--color-dark-gray)") return "var(--color-accent)";
    if (fill === "var(--color-accent)") return "var(--color-black)";
    if (fill === "var(--color-white)") return "var(--color-black)";
  });

  function slugify(str: string): string {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }

  let link = $derived.by(() => {
    switch (cta?.ctaType) {
      case "linkInternal":
        return {
          href: `/${cta.linkInternal?.url?._ref ? slugify(cta.linkInternal?.url?._ref) : "#"}`,
          label: cta.linkInternal?.label,
        };
      case "linkExternal":
        return {
          href: cta.linkExternal?.url,
          label: cta.linkExternal?.label,
          target: "_blank",
        };
      case "linkEmail":
        return {
          href: `mailto:${cta.linkEmail?.url}`,
          label: cta.linkEmail?.label,
        };
      default:
        return {};
    }
  });
</script>

{#if cta?.ctaType}
  <a
    class="cta w-fit flex gap-1 items-center rounded-full px-3 py-1 border-black border {colorClass}
    {uppercase ? 'uppercase' : ''}
    {font === 'mono' ? 'font-mono' : 'font-sans'}
    {typo === 'xs' ? 'typo-xs' : 'typo-s'}
    "
    href={link.href}
    target={link.target ?? "_self"}
    rel="noopener noreferrer"
  >
    {#if arrow}
      <span class="arrow hidden h-[1lh] aspect-square md:flex"
        ><ArrowEnter fill={arrowFill} /></span
      >
    {/if}
    <span>{link?.label}</span>
  </a>
{/if}

<style>
  :global(.cta.bg-white:hover .arrow svg path) {
    fill: var(--color-white);
  }
  :global(.cta.bg-accent:hover .arrow svg path) {
    fill: var(--color-accent);
  }
  :global(.cta.bg-dark-gray:hover .arrow svg path) {
    fill: var(--color-black);
  }
</style>
