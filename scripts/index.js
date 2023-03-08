const popup = document.querySelector(".popup");

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector('#card-template').content;
 
const openEditPopupButton = document.querySelector(".profile__edit-button");
const opeAddPopupButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector(".popup-profile");
const addNewCard = document.querySelector('.popup_card-add');
const popupZoomImage = document.querySelector(".popup_zoom-image");

const imagePopup = document.querySelector('.popup__image');
const captionPopup = popupZoomImage.querySelector('.popup__caption');

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

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}; 

openEditPopupButton.addEventListener('click', function() {
  openPopup(popupProfile);
  userNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
});

const closePopup = (popups) => {
  popups.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

const overlayClosePopups = document.querySelectorAll(".popup");
overlayClosePopups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close")) {
      closePopup(evt.currentTarget);
    }
  });
});

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
 
  openPopup(popupZoomImage);
}
 
function editinProfileName(evt) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileAbout.textContent = profileAboutInput.value;
 
  closePopup(popupProfile);
}
 
const addCard = (evt) => {
	evt.preventDefault();
 
	renderCard({
		name: addNameInput.value,
		link: addLinkInput.value,
	  });
 
	  evt.target.reset();
    closePopup(addNewCard);
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

formEditProfile.addEventListener('submit', editinProfileName);
opeAddPopupButton.addEventListener("click", () => openPopup(addNewCard));
addNewCard.addEventListener('submit', addCard);
 
render();