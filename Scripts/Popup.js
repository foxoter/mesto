class Popup {
  constructor(popup, openButton, closeButton) {
    this.popup = popup;
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.setEventListeners();
  }

  open = () => {
    this.popup.classList.toggle('popup_is-opened');
    this.popup.querySelector('.popup__input').focus();
    this.reset();
  }

  reset () {
    const errors = this.popup.querySelectorAll('.error-message');
    const button = this.popup.querySelector('.button');
    this.popup.querySelector("form").reset();
    errors.forEach(function (item) {
      item.textContent = '';
    })
    if (this.popup.classList.contains('edit-popup')) {
      button.classList.add('popup__button_mode_on');
      button.removeAttribute('disabled');
    } else {
      button.classList.remove('popup__button_mode_on');
      button.setAttribute('disabled', 'disabled');
    }
  }

  setEventListeners() {
    this.openButton.addEventListener('click',this.open);
    this.closeButton.addEventListener('click',this.open);
  }
}