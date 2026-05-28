<script lang="ts">
  import { locale } from "$i18n/i18n-svelte";
  import Dot from "$lib/components/svg/Dot.svelte";
  import ContactCta from "$lib/components/ContactCta.svelte";
  import type { Cta } from "$lib/types";

  type Props = { cta: Cta; fill?: string };

  let { cta, fill }: Props = $props();

  let link = $derived.by(() => {
    switch (cta?.ctaType) {
      case "linkInternal":
        return {
          href: `/${$locale}/${cta.linkInternal?.url?._ref}`,
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

{#if !cta}
  <!-- no cta configured -->
{:else if cta.ctaType !== "popup"}
  <a
    class="flex gap-1 items-center hover:opacity-50 transition-fast typo-sm typo-uppercase"
    href={link.href}
    target={link.target ?? "_self"}
    rel="noopener noreferrer"
  >
    Link Label
  </a>
{:else}
  <button>Open Popup</button>
{/if}
