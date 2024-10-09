import "../src/pages/index.css";
import { initialCards } from "./components/cards.js";
import avatarImage from "./images/avatar.jpg";
import { createCard, deleteCard } from "../src/components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

//Добавил аватар
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatarImage})`;

// Нахожу элементы на странице
export const cardList = document.querySelector(".places__list");
const popupEditProfile = document.querySelector(".popup_type_edit");
export const popupAddCard = document.querySelector(".popup_type_new-card");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

//Обработчики событий
editProfileButton.addEventListener("click", function () {
    openModal(popupEditProfile, closeModal);
});

addCardButton.addEventListener("click", function () {
    openModal(popupAddCard, closeModal);
});

// Обработчики событий для открытия/закрытия модальных окон и других действий
// Например, здесь можно добавить обработчики событий для кнопок

// Вывод карточек на страницу
initialCards.forEach(function (item) {
  const cardElement = createCard(item.name, item.link, deleteCard);
  cardList.append(cardElement);
});
