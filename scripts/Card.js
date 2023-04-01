class Card {
    constructor(data, templateSelector, openImagePopup) {
      this._link = data.link;
      this._name = data.name;
      this._templateSelector = templateSelector;
      this._openImagePopup = openImagePopup;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content.querySelector('.elements__card')
        .cloneNode(true);
      
        return cardElement;
    }
    _like() {
        this._buttonLike.classList.toggle("elements__like-button_active");
    }
    _trash() {
        this._buttonDelete.closest('.elements__card').remove();
    }
    _setEventListeners() {
        this._buttonLike.addEventListener("click", () => {
            this._like();
        });
        this._buttonDelete.addEventListener("click", () => {
            this._trash();
        });
        this._cardImage.addEventListener("click", () => {
            this._openImagePopup(this._name, this._link);
        });
    }
    generateCard() {
        this._element = this._getTemplate();
      
        this._cardImage = this._element.querySelector('.elements__image');
        this._cardName = this._element.querySelector('.elements__title');
        this._buttonLike = this._element.querySelector(".elements__like-button");
        this._buttonDelete = this._element.querySelector(".elements__trash");
        
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._link;
        this._cardName.textContent = this._name;

        return this._element;
    } 
}

export default Card;