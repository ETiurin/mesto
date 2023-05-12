export class Card {
  constructor(
    { item, handleCardClick, handleCardLike, handleDeleteCard, userId },
    templateSelector
  ) {
    this._name = item.name;
    this._link = item.link;
    this._owner = item.owner;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleDeleteCard = handleDeleteCard;
    this._likes = item.likes;
    this._cardId = item._id;
    this._userId = userId;
    this._templateSelector = templateSelector;

    this._handleOpenPopupImage = this._handleOpenPopupImage.bind(this);
    this._handleToggleTrashActive = this._handleToggleTrashActive.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  like(item) {
    this._numberLikes.textContent = item;
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  isButtonLiked() {
    return this._likeButton.classList.contains("elements__like-button_active");
  }

  showLike() {
    this._likes.forEach((likeInfo) => {
      if (likeInfo._id === this._userId) {
        this._likeButton.classList.add("elements__like-button_active");
      }
    });
  }

  _handleToggleTrashActive() {
    this._handleDeleteCard(this);
  }

  _handleOpenPopupImage() {
    this._handleCardClick(this._name, this._link);
  }

  _addEventListeners() {
    this._trashButton.addEventListener("click", this._handleToggleTrashActive);
    this._likeButton.addEventListener("click", () => this._handleCardLike(this._cardId));
    this._cardImage.addEventListener("click", this._handleOpenPopupImage);
  }

  render() {
    this._cardElement = this._getTemplate();
    this._trashButton = this._cardElement.querySelector(".elements__trash");
    this._likeButton = this._cardElement.querySelector(".elements__like-button");
    this._cardImage = this._cardElement.querySelector(".elements__image");
    this._cardTitle = this._cardElement.querySelector(".elements__title");
    this._numberLikes = this._cardElement.querySelector(".elements__like-number");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._numberLikes.textContent = this._likes.length;

    if (this._userId !== this._owner._id) {
      this._trashButton.style.display = `none`;
    }

    this.showLike();
    this._addEventListeners();

    return this._cardElement;
  }
}
