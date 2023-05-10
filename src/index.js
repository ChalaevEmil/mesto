import { Card } from "./components/Card.js";
import { FormValidator, config } from "./components/FormValidator.js";
import {
  profileEditButton,
  popupAddCardForm,
  cardAddButton,
  popupEditProfileForm,
  profileNameInput,
  profileProfessionInput,
  formAvatar,
  profileAvatar,
} from "./utils/constants.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithConfirm } from "./components/PopupWithConfirm.js";
import { Api, token } from "./components/Api.js";
import "./pages/index.css";

const api = new Api(token);

let userId;

function createCard(item) {
  const card = new Card(
    {
      data: item,
      userId: userId,
      handleCardClick: (name, link) => {
        popupBigImage.open(name, link);
      },
      handleCardDelete: (card) => {
        popupDeleteCard.open(card);
      },
      handleCardLike: (thisCardId) => {
        if (!card.isButtomLiked()) {
          api.setCardLike(thisCardId).then((res) => {
            card.like(res.likes.length);
          });
        } else {
          api.deleteCardLike(thisCardId).then((res) => {
            card.like(res.likes.length);
          });
        }
      },
    },
    `#cardTempale`
  );
  const cardElement = card.randerCard();
  return cardElement;
}

const initialCards = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      initialCards.addItem(cardElement);
    },
  },
  `.elements`
);

const profileRedaction = new UserInfo({
  selectorProfileName: `.profile__name`,
  selectorProfileProfession: `.profile__profession`,
  selectorAvatar: `.profile__avatar`,
});

Promise.all([api.getProfileInfo(), api.getStartedCards()])
  .then(([info, cardItems]) => {
    userId = info._id;
    profileRedaction.setUserInfo(info);
    profileRedaction.setAvatar(info.avatar);
    initialCards.renderItems(cardItems);
  })
  .catch((err) => {
    console.log(err);
  });

profileEditButton.addEventListener(`click`, () => {
  const info = profileRedaction.getUserInfo();
  popupEditProfile.open();
  profileFormValidation.resetValidation();
  profileNameInput.value = info.userName;
  profileProfessionInput.value = info.userProfession;
});

const popupEditProfile = new PopupWithForm(
  `.popup_type_profile`,
  (newUserInfo) => {
    popupEditProfile.loadingConfirm(true);
    api
      .editingProfile(newUserInfo)
      .then((res) => {
        profileRedaction.setUserInfo(res);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfile.loadingConfirm(false, "Сохранить");
      });
  }
);

popupEditProfile.setEventListeners();

const popupCardForm = new PopupWithForm(`.popup_type_card`, (data) => {
  popupCardForm.loadingConfirm(true);
  api
    .addCard(data)
    .then((res) => {
      const cardElement = createCard(res);
      initialCards.addItem(cardElement);
      popupCardForm.close();
    })
    .finally(() => {
      popupCardForm.loadingConfirm(false, "Создать");
    });
});

popupCardForm.setEventListeners();

cardAddButton.addEventListener(`click`, () => {
  popupCardForm.open();
  cardFormValidation.resetValidation();
});

const popupBigImage = new PopupWithImage(`.popup_type_image`);
popupBigImage.setEventListeners();

const popupDeleteCard = new PopupWithConfirm(
  `.popup_type_delete-card`,
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
popupDeleteCard.setEventListeners();

const popupEditAvatar = new PopupWithForm(`.popup_type_avatar`, (data) => {
  popupEditAvatar.loadingConfirm(true);
  api
    .editAvatar({ avatar: data["input-description"] })
    .then(() => {
      profileRedaction.setAvatar(data["input-description"]);
      popupEditAvatar.close();
    })
    .finally(() => {
      popupEditAvatar.loadingConfirm(false, "Сохранить");
    });
});

popupEditAvatar.setEventListeners();

profileAvatar.addEventListener(`click`, () => {
  popupEditAvatar.open();
});

const cardFormValidation = new FormValidator(config, popupAddCardForm);
cardFormValidation.enableValidation();
const profileFormValidation = new FormValidator(config, popupEditProfileForm);
profileFormValidation.enableValidation();
const avatarFormValidation = new FormValidator(config, formAvatar);
avatarFormValidation.enableValidation();
