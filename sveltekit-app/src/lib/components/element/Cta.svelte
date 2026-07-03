<script lang="ts">
  import type { Cta } from "$lib/sanity.types";
  import ArrowEnter from "$lib/components/svg/ArrowEnter.svelte";

  type Props = {
    cta?: Cta;
    fill?:
      | "var(--color-accent)"
      | "var(--color-white)"
      | "var(--color-dark-gray)"
      | "var(--color-black)";
    font?: "mono" | "sans";
    typo?: "xs" | "s";
    uppercase?: boolean;
    arrow?: boolean;
  };

  type LinkResult = { href?: string; label?: string; target?: string };

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
    "var(--color-white)":
      "bg-white text-black hover:bg-black hover:text-white hover:border-2 hover:border-white",
    "var(--color-dark-gray)":
      "bg-dark-gray text-white hover:bg-white hover:text-black",
    "var(--color-black)":
      "bg-black text-white hover:bg-white hover:text-black border-white",
  };

  let colorClass = $derived(fill ? (fillClasses[fill] ?? "") : "");
  let arrowFill = $derived.by(() => {
    if (fill === "var(--color-dark-gray)") return "var(--color-white)";
    if (fill === "var(--color-black)") return "var(--color-white)";
    if (fill === "var(--color-accent)") return "var(--color-black)";
    if (fill === "var(--color-white)") return "var(--color-black)";
  });

  function slugify(str: string): string {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }

  function buildLink(c: NonNullable<Cta>): LinkResult {
    const ref = c.linkInternal?.url?._ref;
    switch (c.ctaType) {
      case "linkInternal":
        if (ref && slugify(ref) === "about")
          return {
            href: "/info",
            label: c.linkInternal?.label,
          };
        return {
          href: `/${ref ? slugify(ref) : "#"}`,
          label: c.linkInternal?.label,
        };
      case "linkExternal":
        return {
          href: c.linkExternal?.url,
          label: c.linkExternal?.label,
          target: "_blank",
        };
      case "linkEmail":
        return {
          href: `mailto:${c.linkEmail?.url}`,
          label: c.linkEmail?.label,
          target: "_blank",
        };
      default:
        return {};
    }
  }

  let link = $derived(cta ? buildLink(cta) : {});
</script>

{#if cta?.ctaType}
  <a
    class="cta w-fit flex gap-1 items-center rounded-full px-3 py-1 border-black border-2 {colorClass}
    {uppercase ? 'uppercase' : ''}
    {font === 'mono' ? 'font-mono' : 'font-sans'}
    {typo === 'xs' ? 'typo-xs' : 'typo-s'}
    "
    href={link.href}
    target={link.target ?? "_self"}
    rel="noopener noreferrer"
  >
    <!-- {#if arrow}
      <span class="arrow hidden h-[1lh] aspect-square md:flex"
        ><ArrowEnter fill={arrowFill} /></span
      >
    {/if} -->
    <span>{link?.label}</span>
  </a>
{/if}

<style>
  :global(.cta.bg-white:hover .arrow svg path) {
    fill: var(--color-white);
  }
  :global(.cta.bg-accent:hover .arrow svg path) {
    fill: var(--color-white);
  }
  :global(.cta.bg-dark-gray:hover .arrow svg path) {
    fill: var(--color-black);
  }

  :global(.cta.bg-black:hover .arrow svg path) {
    fill: var(--color-black);
  }
</style>
