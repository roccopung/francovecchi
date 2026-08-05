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
  #query = typeof window !== 'undefined'
    ? window.matchMedia('(max-width: 767px)')
    : null;
  isMobile = $state(false);

  constructor() {
    if (!this.#query) return;
    this.isMobile = this.#query.matches;
    this.#query.addEventListener('change', (e) => (this.isMobile = e.matches));
  }
}

class ClickedImage {
  index = $state(0);
  key = $state('');
  reset = () => {
    this.index = 0;
    this.key = '';
  };
}

export const menuState = new MenuState();
export const modalState = new ModalState();
export const clickedImage = new ClickedImage();
export const viewport = new Viewport();
