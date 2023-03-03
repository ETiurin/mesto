const openEditedPopup = document.querySelector(".profile__edit-button");
const popupContainer = document.querySelector(".popup");
const popupButtonClose = document.querySelector(".popup__close");
const submitButton = document.querySelector(".popup__button");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const userNameInput = document.querySelector(".popup__input_type_name");
const profileAboutInput = document.querySelector(".popup__input_type_about");

const openPopup = () => {
  userNameInput.value = profileName.textContent;
  profileAboutInput.value = profileAbout.textContent;
  popupContainer.classList.add("popup_opened")
};

const closePopup = () => {
  popupContainer.classList.remove("popup_opened")
};

function editinProfileName(evt) {

  evt.preventDefault();

  profileName.textContent = userNameInput.value;
  profileAbout.textContent = profileAboutInput.value;

  closePopup();
}

openEditedPopup.addEventListener("click", openPopup);
popupButtonClose.addEventListener("click", closePopup);
submitButton.addEventListener("click", editinProfileName);

const initialCards = [
	{
    name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
	},
	{
    name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
	},
	{
    name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
	},
	{
    name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
	},
];;

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector('#card-template').content;

const cardInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  cardInfo.forEach(renderCard);
}

function renderCard({ name, link }) {
  const cardElement = cardTemplate.querySelector(".elements__card").cloneNode(true);
  cardElement.querySelector(".elements__title").textContent = name;
  cardElement.querySelector(".elements__image").src = link;

  cardsContainer.prepend(cardElement);
}

render();