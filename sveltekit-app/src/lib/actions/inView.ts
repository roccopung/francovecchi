import type { Action } from "svelte/action";

export const inView: Action<Element, (visible: boolean) => void> = (
  node,
  onChange,
) => {
  const observer = new IntersectionObserver(
    ([entry]) => onChange(entry.isIntersecting),
    { rootMargin: "50px 0px", threshold: 0 },
  );
  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
};
