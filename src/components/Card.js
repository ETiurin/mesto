export class Card {
    constructor(name, link, templateSelector, openPopupImage) {
        this._name = name;
        this._link = link;
        this._openPopupImage = openPopupImage;
        this._templateSelector = templateSelector;

        this._handleToggleLikeButton = this._handleToggleLikeButton.bind(this);
        this._handleToggleTrashActive = this._handleToggleTrashActive.bind(this);
        this._handleOpenPopupImage = this._handleOpenPopupImage.bind(this);
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector(".elements__card").cloneNode(true);
		return cardElement;
	}

    _handleToggleLikeButton() {
        this._likeButton.classList.toggle('elements__like-button_active');
    }
    
    _handleToggleTrashActive() {
        this._cardElement.remove();
        this._cardElement = null;
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
        this._cardElement = this._getTemplate();
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