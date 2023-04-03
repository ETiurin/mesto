export class Card {
    _cardTemplate = document.querySelector('#card-template').content;
    
    constructor(name, link, openPopupImage) {
        this._name = name;
        this._link = link;
        this._openPopupImage = openPopupImage;

        this._handleToggleLikeButton = this._handleToggleLikeButton.bind(this);
        this._handleToggleTrashActive = this._handleToggleTrashActive.bind(this);
        this._handleOpenPopupImage = this._handleOpenPopupImage.bind(this);
    }

    _handleToggleLikeButton() {
        this._likeButton.classList.toggle('elements__like-button_active');
    }
      
    _handleToggleTrashActive() {
        this._cardElement.remove();
    }

    _handleOpenPopupImage() {
       this._openPopupImage(this._name, this._link);
    }

    _addEventListeners() {
        this._trashButton.addEventListener('click', this._handleToggleTrashActive);
        this._likeButton.addEventListener('click', this._handleToggleLikeButton);
        this._cardImage.addEventListener('click', this._handleOpenPopupImage);
    }

    render() {
        this._cardElement = this._cardTemplate.querySelector(".elements__card").cloneNode(true);
        this._trashButton = this._cardElement.querySelector('.elements__trash');
        this._likeButton = this._cardElement.querySelector('.elements__like-button');
        this._cardImage = this._cardElement.querySelector(".elements__image");
        this._cardTitle = this._cardElement.querySelector(".elements__title");
           
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        this._addEventListeners();
               
        return this._cardElement;
    }
};