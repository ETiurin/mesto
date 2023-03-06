const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector('#card-template').content;
 
const openEditedPopup = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup-profile");
const popupBtnClose = document.querySelector(".popup__close");
const submitBtn = document.querySelector(".popup__button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileAboutInput = document.querySelector(".popup__input_type_about");
 
const addBtn = document.querySelector('.profile__add-button');
const newPlace = document.querySelector('.popup_card-add')
const popupCloseCard = document.querySelector(".popup__close_card-add");
const nameInput = document.querySelector('.popup__input_name');
const urlInput = document.querySelector('.popup__input_url');
const formsElement = document.querySelector('.popup__forms');
 
const popupZoomImage = document.querySelector(".popup_zoom-image");
const imageCloseButton = popupZoomImage.querySelector('.popup__close_zoom-image');
const imgElement = popupZoomImage.querySelector('.popup__image');
const captionElement = popupZoomImage.querySelector('.popup__caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openPopup = (popup) => {
  popupProfile.classList.add('popup_opened');
};

openEditedPopup.addEventListener('click', function() {
  userNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
});
 
const closePopup = (popup) => {
  popupProfile.classList.remove('popup_opened');
};

const toggleLikeButton = (likeButton) => () => {
  likeButton.classList.toggle('elements__like-button_active');
}

const toggleTrashActive = (cardElement) => () => {
  cardElement.remove();
}
 
const openImagePopup = (name, link) => () => {
  imgElement.src = link;
  imgElement.alt = name;
 
  captionElement.textContent = name;
 
  popupZoomImage.classList.add("popup_opened");
}
 
const closeImagePopup = () => {
  popupZoomImage.classList.remove("popup_opened");
}
 
function editinProfileName(evt) {
  evt.preventDefault();
 
  profileName.textContent = userNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
 
  closePopup();
}
 
const toggleOpenPopupNewPlace = () => {
	newPlace.classList.toggle('popup_opened');
}
 
const handlerOpenAddButtonClick = () => {
	toggleOpenPopupNewPlace();
}
 
const handlerCloseAddButtonClick = () => {
	toggleOpenPopupNewPlace();
}
 
const addCard = (evt) => {
	evt.preventDefault();
 
	renderCard({
		name: nameInput.value,
		link: urlInput.value,
	  });
 
	  evt.target.reset();
	  toggleOpenPopupNewPlace();
}
 
function renderCard({ name, link }) {
  const cardElement = cardTemplate.querySelector(".elements__card").cloneNode(true);
  const trashButton = cardElement.querySelector('.elements__trash');
  const likeButton = cardElement.querySelector('.elements__like-button');
  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
 
  cardTitle.textContent = name;
  cardImage.src = link;
 
  trashButton.addEventListener('click', toggleTrashActive(cardElement));
  likeButton.addEventListener('click', toggleLikeButton(likeButton));
  cardImage.addEventListener('click', openImagePopup(name, link));
 
  cardsContainer.prepend(cardElement);
}
 
function render() {
  initialCards.forEach(renderCard);
}
 
openEditedPopup.addEventListener("click", openPopup);
popupBtnClose.addEventListener("click", closePopup);
submitBtn.addEventListener("submit", editinProfileName);
 
addBtn.addEventListener('click', handlerOpenAddButtonClick);
popupCloseCard.addEventListener('click', handlerCloseAddButtonClick);
formsElement.addEventListener('submit', addCard);
 
imageCloseButton.addEventListener('click', closeImagePopup);
 
render();