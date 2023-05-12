import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupElement, apiCallBacks) {
    super(popupElement);
    this._apiCallBacks = apiCallBacks;
    this._buttonElement = this._popup.querySelector(".popup__button");
  }

  open(cardId) {
    super.open();
    this._card = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonElement.addEventListener("mousedown", () => {
      this._apiCallBacks(this._card);
    });
  }

  loadingConfirm(isLoading, content) {
    if (isLoading) {
      this._buttonElement.textContent = `Сохранение...`;
    } else {
      this._buttonElement.textContent = content;
    }
  }
}