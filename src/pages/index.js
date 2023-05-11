import { Card } from "../components/Card.js";
import {
  validationOptions,
  initialCards,
  cardsContainer,
  openEditPopupButton,
  opeAddPopupButton,
  popupProfile,
  addNewCard,
  popupZoomImage,
  formEditProfile,
  profileName,
  profileAbout,
  userNameInput,
  profileAboutInput,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { Api, token } from "../components/Api.js";
import "./index.css";

const cards = initialCards.reverse();

const api = new Api(token);

let userId;

const userInfo = new UserInfo({
  profileName,
  profileAbout,
});

const formAddCardValidator = new FormValidator(validationOptions, addNewCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(
  validationOptions,
  formEditProfile
);
formEditProfileValidator.enableValidation();

  const createCard =
  (openPopupImage) =>
  (item) => {
    const card = new Card(
      {
        item: item,
        /*userId: userId,*/
        handleCardClick: openPopupImage,
        deleteCard: api.deleteCard,
        handleCardLike: (thisCardId) => {
          if (!card.isButtonLiked()) {
            api.setCardLike(thisCardId).then((res) => {
              card.like(res.likes.length);
            })
            .catch((err) => {
              console.log(err);
            });
          } else {
            api.deleteCardLike(thisCardId).then((res) => {
              card.like(res.likes.length);
            })
            .catch((err) => {
              console.log(err);
            });
          }
        },
      },
      "#card-template"
    );
    const cardElement = card.render();
    return cardElement;
  };

const popupImage = new PopupWithImage(popupZoomImage);
popupImage.setEventListeners();
const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

Promise.all([api.getProfileInfo(), api.getStartedCards()])
  .then(([info, cardItems]) => {
    console.log(cardItems);
    userId = info._id;
    const section = new Section(
      { items: cardItems, renderer: createCard(handleCardClick) },      
      cardsContainer
    );
    
    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const handleAddCard = (values) => {
  section.addItem(createCard(handleCardClick)(values));
};

const popupAddCardForm = new PopupWithForm(addNewCard, handleAddCard);
popupAddCardForm.setEventListeners();

opeAddPopupButton.addEventListener("click", () => {
  popupAddCardForm.open();
  formAddCardValidator.resetValidation();
});

const handleEditProfile = ({ user_name, user_about }) => {
  userInfo.setUserInfo({
    name: user_name,
    about: user_about,
  });
};

const popupEditCardForm = new PopupWithForm(popupProfile, handleEditProfile);
popupEditCardForm.setEventListeners();
openEditPopupButton.addEventListener("click", () => {
  popupEditCardForm.open();

  const { name, about } = userInfo.getUserInfo();

  userNameInput.value = name;
  profileAboutInput.value = about;
  formEditProfileValidator.resetValidation();
});
