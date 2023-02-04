
const openEditPopup = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const popupBtnClose = document.querySelector(".popup__close");
const formDescription = document.querySelector(".popup__form");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let userNameInput = document.querySelector(".popup__input_type_name");
let profileAboutInput = document.querySelector(".popup__input_type_about");

function openPopup() {
  userNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  popupContainer.classList.add("popup_opened")
}

function closePopup() {

  popupContainer.classList.remove("popup_opened")
}

// Функция редактирования окна

function editinProfileName(evt) {

  evt.preventDefault();

  profileName.textContent = userNameInput.value;
  profileAbout.textContent = profileAboutInput.value;

  closePopup();
}

openEditPopup.addEventListener("click", openPopup)
popupBtnClose.addEventListener("click", closePopup)
formDescription.addEventListener("button", editinProfileName);
