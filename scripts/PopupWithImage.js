import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._bigImage = this._popup.querySelector('.popup__image');
    this._nameImage = this._popup.querySelector('.popup__caption');
  }

  openPopup(name, link) {
    super.openPopup();
    this._bigImage.src = link;
    this._bigImage.alt = name;
    this._nameImage.textContent = name;
  }
}