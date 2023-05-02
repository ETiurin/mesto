export default class Section {
  constructor({ items, renderer }, container) {
    this._initialCards = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._initialCards.forEach(item => {
      console.log(item);
      this._container.prepend(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}