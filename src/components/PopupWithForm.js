import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, submitForm) {
    super(popupElement);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputsList = this._form.querySelectorAll('.popup__input');

    this._buttonElement = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputsList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.loading(true);
      this._submitForm(this._getInputValues()).then(() => {
        this.close();
        this.loading(false, 'Сохранить');
      });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(isLoading, content) {
    if (isLoading) {
      this._buttonElement.textContent = `Сохранение...`;
    } else {
      this._buttonElement.textContent = content;
    }
  }
}


