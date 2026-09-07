// Global reactive states

class MenuState {
  open = $state(false);
  toggle = () => {
    this.open = !this.open;
  };
}

class ModalState {
  open = $state(false);
  toggle = () => {
    this.open = !this.open;
  };
}

// One matchMedia listener for the whole app, instead of one `svelte:window`
// binding per component instance.
class Viewport {
  #query =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)")
      : null;
  isMobile = $state(false);

  constructor() {
    if (!this.#query) return;
    this.isMobile = this.#query.matches;
    this.#query.addEventListener("change", (e) => (this.isMobile = e.matches));
  }
}

class ClickedImage {
  index = $state(0);
  key = $state("");
  reset = () => {
    this.index = 0;
    this.key = "";
  };
}

export const menuState = new MenuState();
export const modalState = new ModalState();
export const clickedImage = new ClickedImage();
export const viewport = new Viewport();

// On these routes the app scrolls inside `.scroll-container`, not the document:
// element scroll never collapses/expands the mobile browser toolbar, which was
// resizing the viewport mid-gesture and fighting the fixed `100svh` heroes.
export const isScrollContainerRoute = (routeId: string | null | undefined) =>
  routeId === "/" || routeId === "/info";

// Scroll offset of whichever scroller is active (window or `.scroll-container`),
// written by +layout.svelte. `window.scrollY` is always 0 on container routes.
class Scroll {
  y = $state(0);
}

export const scroll = new Scroll();
