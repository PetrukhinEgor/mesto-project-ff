import "../src/pages/index.css";
import avatarImage from "./images/avatar.jpg";
import { openModal, closeModal, closePopupEsc } from "./components/modal.js";
import { createCard, deleteCard, putLike } from "./components/card.js";
import {
  checkInputValidity,
  clearValidation,
  enableValidation,
} from "./components/validation.js";
import {
  getUserInfo,
  getCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
} from "./components/api.js";

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    const currentUserId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((item) => {
      const cardElement = createCard(
        item.name,
        item.link,
        item.likes,
        item._id,
        item.owner._id,
        currentUserId,
        deleteCard,
        putLike,
        handleCardImageClick
      );
      cardList.append(cardElement);
    });
  })
  .catch((error) => console.log(error));

// Добавил аватар
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatarImage})`;

// Нахожу элементы на странице
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const cardList = document.querySelector(".places__list");

const popupCrossButtons = document.querySelectorAll(".popup__close");

const profileAvatar = document.querySelector(".profile__avatar");

profileAvatar.addEventListener("click", function () {
  clearValidation(avatarEditForm);
  openModal(avatarEditForm);
});

// Формы
const newCardForm = document.querySelector(".popup_type_new-card");
const profileEditForm = document.querySelector(".popup_type_edit");
const avatarEditForm = document.querySelector(".popup_type_avatar");

// Формы и поля для валидации
const form = document.querySelector(".popup__form");
const formInput = form.querySelector(".popup__input");

// Поля формы
const titleInput = newCardForm.querySelector(".popup__input_type_card-name");
const imgInput = newCardForm.querySelector(".popup__input_type_url");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const jobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Попап и его поля для клика на изображение карточки
const popupWideCard = document.querySelector(".popup_type_image");
const popupImage = popupWideCard.querySelector(".popup__image");
const popupCaption = popupWideCard.querySelector(".popup__caption");

// Валидация форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Обработчики событий
editProfileButton.addEventListener("click", function () {
  // Отобразить в полях ввода инфу
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileEditForm, validationConfig);
  openModal(popupEditProfile);
});
addCardButton.addEventListener("click", function () {
  openModal(popupAddCard);
});

// Закрытие на крестик
popupCrossButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

// Функции для форм
// Функция для редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;

  const submitButton = profileEditForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  updateUserInfo(name, about)
    .then((updatedUserData) => {
      profileTitle.textContent = updatedUserData.name;
      profileDescription.textContent = updatedUserData.about;
      closeModal(profileEditForm);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

profileEditForm.addEventListener("submit", handleFormProfileSubmit);

// Функция для добавления новой карточки
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const cardTitleValue = titleInput.value;
  const cardImgValue = imgInput.value;

  const submitButton = profileEditForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  addNewCard(cardTitleValue, cardImgValue)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData.name,
        newCardData.link,
        deleteCard,
        putLike,
        handleCardImageClick
      );
      cardList.prepend(newCard);
      closeModal(newCardForm);
      titleInput.value = "";
      imgInput.value = "";
      clearValidation(profileEditForm, validationConfig);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

newCardForm.addEventListener("submit", handleFormCardSubmit);

// Функция для обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarLink = avatarEditForm.querySelector("#avatar-link").value;

  const submitButton = profileEditForm.querySelector(".popup__button");
  submitButton.textContent = "Сохранение...";

  updateAvatar(avatarLink)
    .then((updatedUserData) => {
      profileImage.style.backgroundImage = `url(${updatedUserData.avatar})`;
      closeModal(avatarEditForm);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      submitButton.textContent = "Сохранить";
    });
}

// Добавляем обработчик события на форму
avatarEditForm.addEventListener("submit", handleAvatarFormSubmit);

function handleCardImageClick(evt) {
  const cardImage = evt.target;

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  openModal(popupWideCard);
}
