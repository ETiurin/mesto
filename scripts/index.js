const openEditedPopup = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const popupButtonClose = document.querySelector(".popup__close");
const submitButton = document.querySelector(".popup__button");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileAboutInput = document.querySelector(".popup__input_type_about");

function openPopup() {
  userNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  popupContainer.classList.add("popup_opened")
}

function closePopup() {
  popupContainer.classList.remove("popup_opened")
}

function editinProfileName(evt) {

  evt.preventDefault();

  profileName.textContent = userNameInput.value;
  profileAbout.textContent = profileAboutInput.value;

  closePopup();
}

openEditedPopup.addEventListener("click", openPopup);
popupButtonClose.addEventListener("click", closePopup);
submitButton.addEventListener("click", editinProfileName);