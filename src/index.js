import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import avatarImage from "./images/avatar.jpg";
import { createCard, deleteCard, handleCardImageClick } from "../src/components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { putLike } from "./components/like.js";

//Добавил аватар
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatarImage})`;

// Нахожу элементы на странице
export const cardList = document.querySelector(".places__list");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");


//Обработчики событий
editProfileButton.addEventListener("click", function () {
    openModal(popupEditProfile, closeModal);
});

addCardButton.addEventListener("click", function () {
    openModal(popupAddCard, closeModal);
});

// Вывод карточек на страницу
initialCards.forEach(function (item) {
  const cardElement = createCard(item.name, item.link, deleteCard, putLike, handleCardImageClick);
  cardList.append(cardElement);
});




