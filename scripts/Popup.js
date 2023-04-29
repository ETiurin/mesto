export default class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._closeButton = this._popup.querySelector(".popup__close");
    this._closeByEscape = this._closeByEscape;
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEscape.bind(this));
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("click", this._closeByEscape);
  }

  _closeByEscape(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.closePopup();
    });

    this._popup.addEventListener("click", (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}