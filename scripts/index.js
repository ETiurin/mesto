const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector('#card-template').content;
 
const openEditPopupButton = document.querySelector(".profile__edit-button");
const opeAddPopupButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector(".popup-profile");
const addNewCard = document.querySelector('.popup_card-add');
const popupZoomImage = document.querySelector(".popup_zoom-image");

const imagePopup = document.querySelector('.popup__image');
const captionPopup = popupZoomImage.querySelector('.popup__caption');

const popupButtonCloseProfile = document.querySelector(".popup__close-profile");
const popupButtonCloseAddCard = document.querySelector(".popup__close_card-add");
const popupButtonCloseImage = document.querySelector('.popup__close_zoom-image');

const formEditProfile = document.querySelector('.popup__form-profile');
const formAddCard = document.querySelector('.popup__form_card-add');
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileAboutInput = document.querySelector(".popup__input_type_about");
const addNameInput = document.querySelector('.popup__input_name');
const addLinkInput = document.querySelector('.popup__input_url');

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

const cards = initialCards.reverse();

const openPopup = (popup) => {
  popupProfile.classList.add('popup_opened');
}; 

openEditPopupButton.addEventListener('click', function() {
  openPopup(popupProfile);
  userNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
});

const closePopup = (popup) => {
  popupProfile.classList.remove("popup_opened")
};

const toggleLikeButton = (likeButton) => () => {
  likeButton.classList.toggle('elements__like-button_active');
}

const toggleTrashActive = (cardElement) => () => {
  cardElement.remove();
}
 
const openImagePopup = (name, link) => () => {
  imagePopup.src = link;
  imagePopup.alt = name;
 
  captionPopup.textContent = name;
 
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
	addNewCard.classList.toggle('popup_opened');
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
		name: addNameInput.value,
		link: addLinkInput.value,
	  });
 
	  evt.target.reset();
	  toggleOpenPopupNewPlace();
}

function createCard({name, link,}) {
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
  return cardElement;
}

function renderCard({ name, link }) {
  cardsContainer.prepend(createCard({name, link}));
}
 
function render() {
  cards.forEach(renderCard);
}
 
openEditPopupButton.addEventListener("click", openPopup);
popupButtonCloseProfile.addEventListener("click", closePopup);
formEditProfile.addEventListener("submit", editinProfileName);
 
opeAddPopupButton.addEventListener('click', handlerOpenAddButtonClick);
popupButtonCloseAddCard.addEventListener('click', handlerCloseAddButtonClick);
formAddCard.addEventListener('submit', addCard);
 
popupButtonCloseImage.addEventListener('click', closeImagePopup);
 
render();