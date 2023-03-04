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

const addButton = document.querySelector('.profile__add-button');
const newPlace = document.querySelector('.popup_card-add')
const popupClose = document.querySelector(".popup__close_card-add");

const toggleOpenPopupNewPlace = () => {
	newPlace.classList.toggle('popup_opened');
}

const handlerOpenAddButtonClick = () => {
	toggleOpenPopupNewPlace();
}

const handlerCloseAddButtonClick = () => {
	toggleOpenPopupNewPlace();
}

addButton.addEventListener('click', handlerOpenAddButtonClick);
popupClose.addEventListener('click', handlerCloseAddButtonClick);

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

  cardsContainer.append(cardElement);

  const likeButton = cardElement.querySelector('.elements__like-button');
  likeActive = () => {
	  likeButton.classList.toggle('elements__like-button_active');
  }

  likeButton.addEventListener('click', likeActive);

  const trashButton = cardElement.querySelector('.elements__trash');
  trashActive = () => {
	  cardElement.remove();
  }
  trashButton.addEventListener('click', trashActive);
}

render();

const nameInput = document.querySelector('.popup__input_name');
const urlInput = document.querySelector('.popup__input_url');

const formsElement = document.querySelector('.popup__forms');

const addCard = (evt) => {
	evt.preventDefault();

	initialCards.append(renderCard({
		name: nameInput.value,
		link: urlInput.value,
	  }));

	  evt.target.reset();
	  toggleOpenPopupNewPlace();
}

formsElement.addEventListener('submit', addCard, popupClose);