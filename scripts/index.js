import { Card } from './Card.js';
import  { validationOptions, initialCards } from './constants.js';
import { FormValidator } from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const cardsContainer = document.querySelector(".elements");
 
const openEditPopupButton = document.querySelector(".profile__edit-button");
const opeAddPopupButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector(".popup-profile");
const addNewCard = document.querySelector('.popup_card-add');
const addNewCardForm = document.querySelector('#popup-add-form');

const popupZoomImage = document.querySelector(".popup_zoom-image");

const formEditProfile = document.querySelector('.popup__form');
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileAboutInput = document.querySelector(".popup__input_type_about");
const addNameInput = document.querySelector('.popup__input_name');
const addLinkInput = document.querySelector('.popup__input_type_about-url');

const cards = initialCards.reverse();

const formAddCardValidator = new FormValidator(validationOptions, addNewCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(validationOptions, formEditProfile);
formEditProfileValidator.enableValidation();

const createCard = (openPopupImage) => ({ name, link }) => {
  const card = new Card(name, link, '#card-template', openPopupImage);
  return card.render();
}
 
function render() {
  const popupImage = new PopupWithImage(popupZoomImage);
  popupImage.setEventListeners();
  const handleCardClick = (name, link) => {
    popupImage.open(name, link);
  }
  const section = new Section( { items: cards, renderer: createCard(handleCardClick) }, cardsContainer);
  section.renderItems();
}

function initializeForms() {
  const popupAddCardForm= new PopupWithForm(profileName, profileAbout); /* я передаю не те селекторы видимо */
  opeAddPopupButton.setEventListeners("click", () => {
    addNewCardForm.reset();
    popupAddCardForm.open();
  });

  const popupEditCardForm = new PopupWithForm(addNameInput, addLinkInput); /* я передаю не те селекторы видимо */
  openEditPopupButton.setEventListeners('click', () => {
    popupEditCardForm.open();
    userNameInput.value = profileName.textContent;
    profileAboutInput.value = profileAbout.textContent;
  });

  /*const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    infoSelector: '.profile__about',
  });*/

  
  formAddCardValidator.resetValidation();
  formEditProfileValidator.resetValidation();
}

render();
initializeForms();