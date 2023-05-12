import { Card } from "../components/Card.js";
import {
  validationOptions,
  cardsContainer,
  openEditPopupButton,
  opeAddPopupButton,
  popupProfile,
  addNewCard,
  popupZoomImage,
  formEditProfile,
  profileName,
  profileAbout,
  profileAvatar,
  popupAvatar,
  userNameInput,
  profileAboutInput,
} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
/*import PopupWithConfirm from "../components/PopupWithConfirm.js";*/
import UserInfo from "../components/UserInfo.js";
import { Api, token } from "../components/Api.js";
import "./index.css";

const api = new Api(token);

let userId;
let section;

const userInfo = new UserInfo({
  profileName,
  profileAbout,
  profileAvatar,
});

const formAddCardValidator = new FormValidator(validationOptions, addNewCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(
  validationOptions,
  formEditProfile
);
formEditProfileValidator.enableValidation();

const avatarFormValidation = new FormValidator(validationOptions, profileAvatar);
avatarFormValidation.enableValidation();

const createCard = (openPopupImage) => (item) => {
  const card = new Card(
    {
      item: item,
      userId: userId,
      handleCardClick: openPopupImage,
      handleDeleteCard: (id) => api.deleteCard(id),
      handleCardLike: (thisCardId) => {
        if (!card.isButtonLiked()) {
          api
            .setCardLike(thisCardId)
            .then((res) => {
              card.like(res.likes.length);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .deleteCardLike(thisCardId)
            .then((res) => {
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
    userInfo.setUserInfo(info);
    userId = info._id;
    section = new Section(
      { items: cardItems, renderer: createCard(handleCardClick) },
      cardsContainer
    );

    section.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const handleAddCard = (values) => {
  api.addCard(values).then((item) => {
    section.addItem(createCard(handleCardClick)(item));
  });
};

const popupAddCardForm = new PopupWithForm(addNewCard, handleAddCard);
popupAddCardForm.setEventListeners();

opeAddPopupButton.addEventListener("click", () => {
  popupAddCardForm.open();
  formAddCardValidator.resetValidation();
});

const handleEditProfile = ({ user_name, user_about }) => {
  api.editingProfile({ name: user_name, about: user_about }).then((info) => {
    userInfo.setUserInfo(info);
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

/*const popupDeleteCard = new PopupWithConfirm(
  ".popup_delete-card",
  (card) => {
    popupDeleteCard.loadingConfirm(true);
    api
      .deleteCard(card.cardObj._id)
      .then(() => {
        card.cardDom.remove();
        popupDeleteCard.close();
      })
      .finally(() => {
        popupDeleteCard.loadingConfirm(false, "Да");
      });
  }
);
popupDeleteCard.setEventListeners();*/

const handleEditAvatar = ({ user_avatar }) => {
  api.editAvatar({ avatar: user_avatar }).then((info) => {
    userInfo.setUserInfo(info);
  });
};

const popupEditAvatar = new PopupWithForm(popupAvatar, handleEditAvatar);
popupEditAvatar.setEventListeners();
openEditPopupButton.addEventListener("click", () => {
  popupEditAvatar.open();

  avatarFormValidation.resetValidation();
});