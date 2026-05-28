<script lang="ts">
  //@ts-nocheck
  import { toHTML, uriLooksSafe } from "@portabletext/to-html";

  interface Props {
    data: any;
  }

  let { data }: Props = $props();

  let components = $derived({
    listItem: ({ children }: { children: string }) =>
      `<li class="list-checkbox"><div class="tick"></div><span>${children}</span></li>`,

    block: {
      normal: ({ children }: { children: string }) => `<p>${children}</p>`,
    },

    marks: {
      linkExternal: ({ children, value }: { children: string; value: any }) => {
        const href = value.url || "";
        if (uriLooksSafe(href)) {
          const rel = href.startsWith("/") ? "" : ' rel="noreferrer noopener"';
          return `<a class="cursor-pointer" href="${href}"${rel} target="_blank">${children}</a>`;
        }
        return children;
      },
      linkEmail: ({ children, value }: { children: string; value: any }) => {
        const href = value.url || "";
        if (uriLooksSafe(href)) {
          return `<a class="cursor-pointer" href="mailto:${href}" rel="noreferrer noopener">${children}</a>`;
        }
        return children;
      },
    },
  });
</script>

<div class="rich-text">
  {@html toHTML(data, { components })}
</div>

<style lang="postcss">
  :global(.rich-text p:not(:last-child)) {
    margin-bottom: 1lh;
  }
  :global(.rich-text a) {
    text-decoration: underline;
    text-decoration-color: var(--color-blue);
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      color: var(--color-blue);
    }
  }
</style>
