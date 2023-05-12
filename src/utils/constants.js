export const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span_error'
};

export const cardsContainer = document.querySelector(".elements");

export const openEditPopupButton = document.querySelector(".profile__edit-button");
export const opeAddPopupButton = document.querySelector('.profile__add-button');
export const openEditAvatarButton = document.querySelector('.profile__avatar-wrapper');

export const popupProfile = document.querySelector(".popup-profile");
export const addNewCard = document.querySelector('.popup_card-add');

export const popupZoomImage = document.querySelector(".popup_zoom-image");

export const formEditProfile = document.querySelector('.popup__form');
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");
export const userNameInput = document.querySelector(".popup__input_type_name");
export const profileAboutInput = document.querySelector(".popup__input_type_about");

export const formAvatar = document.querySelector(".popup__form_avatar");
export const profileAvatar = document.querySelector(".profile__avatar");
export const popupAvatar = document.querySelector(".popup_avatar");
export const popupConform = document.querySelector(".popup_delete-card");