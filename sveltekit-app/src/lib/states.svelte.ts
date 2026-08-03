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
