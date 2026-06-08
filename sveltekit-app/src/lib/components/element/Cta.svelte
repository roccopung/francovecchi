<script lang="ts">
  import type { Cta } from "$lib/sanity.types";

  type Props = {
    cta?: Cta;
    fill?:
      | "var(--color-accent)"
      | "var(--color-white)"
      | "var(--color-dark-gray)";
  };

  const fillClasses: Record<NonNullable<Props["fill"]>, string> = {
    "var(--color-accent)":
      "bg-accent text-black hover:bg-dark-gray hover:text-accent",
    "var(--color-white)": "bg-white text-black hover:bg-black hover:text-white",
    "var(--color-dark-gray)":
      "bg-dark-gray text-accent hover:bg-white hover:text-black",
  };

  let { cta, fill }: Props = $props();
  let colorClass = $derived(fill ? (fillClasses[fill] ?? "") : "");

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
    class="w-fit flex gap-1 items-center typo-xs uppercase font-mono rounded-full px-3 py-1 border-black border hover {colorClass}"
    href={link.href}
    target={link.target ?? "_self"}
    rel="noopener noreferrer"
  >
    {link?.label}
  </a>
{/if}
