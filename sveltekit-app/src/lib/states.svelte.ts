// Global reactive states

class MenuState {
  open = $state(false);
  toggle = () => {
    this.open = !this.open;
  };
}

export const menuState = new MenuState();
