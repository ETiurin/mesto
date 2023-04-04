import { Card } from './Card.js';
import  { validationOptions, initialCards } from './constants.js';
import { FormValidator } from './FormValidator.js';

const cardsContainer = document.querySelector(".elements");
 
const openEditPopupButton = document.querySelector(".profile__edit-button");
const opeAddPopupButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector(".popup-profile");
const addNewCard = document.querySelector('.popup_card-add');
const addNewCardForm = document.querySelector('#popup-add-form');

const popupZoomImage = document.querySelector(".popup_zoom-image");

const imagePopup = document.querySelector('.popup__image');
const captionPopup = popupZoomImage.querySelector('.popup__caption');

const formEditProfile = document.querySelector('.popup__form');
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileAboutInput = document.querySelector(".popup__input_type_about");
const addNameInput = document.querySelector('.popup__input_name');
const addLinkInput = document.querySelector('.popup__input_type_about-url');

const cards = initialCards.reverse();

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

const openPopup = (popups) => {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

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

const openImagePopup = (name, link) => {
  imagePopup.src = link;
  imagePopup.alt = name;
 
  captionPopup.textContent = name;
 
  openPopup(popupZoomImage);
}

const formAddCardValidator = new FormValidator(validationOptions, addNewCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(validationOptions, formEditProfile);
formEditProfileValidator.enableValidation();

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

const createCard = (name, link, template, openPopup) => {
  const card = new Card(name, link, template, openPopup);
  return card.render();
}

function renderCard({ name, link }) {
  const card = createCard(name, link, '#card-template', openImagePopup);
  cardsContainer.prepend(card);
}
 
function render() {
  cards.forEach(renderCard);
}

function initializeForms() {
  formEditProfile.addEventListener('submit', editinProfileName);
  opeAddPopupButton.addEventListener("click", () => {
    formAddCardValidator.resetValidation();
    addNewCardForm.reset();
    openPopup(addNewCard);
  });
  addNewCardForm.addEventListener('submit', addCard);
  openEditPopupButton.addEventListener('click', function() {
    formEditProfileValidator.resetValidation();
    openPopup(popupProfile);
    userNameInput.value = profileName.textContent;
    profileAboutInput.value = profileAbout.textContent;
  });
}

render();
initializeForms();