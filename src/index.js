import "../src/pages/index.css";
import avatarImage from "./images/avatar.jpg";
import { openModal, closeModal, closePopupEsc } from "./components/modal.js";
import { createCard, deleteCard, putLike } from "./components/card.js";
import {initialCards} from "./components/cards.js"
//Добавил аватар
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatarImage})`;

// Нахожу элементы на странице
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const cardList = document.querySelector(".places__list");

const popupCrossButtons = document.querySelectorAll(".popup__close");

//Формы
const newCardForm = document.querySelector(".popup_type_new-card");
const profileEditForm = document.querySelector(".popup_type_edit");

//Поля формы
const titleInput = newCardForm.querySelector(".popup__input_type_card-name");
const imgInput = newCardForm.querySelector(".popup__input_type_url");
const nameInput = profileEditForm.querySelector(".popup__input_type_name"); 
const jobInput = profileEditForm.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//Попап и его поля для клика на изображение карточки
const popupWideCard = document.querySelector(".popup_type_image");
const popupImage = popupWideCard.querySelector(".popup__image");
const popupCaption = popupWideCard.querySelector(".popup__caption");

//Обработчики событий
editProfileButton.addEventListener("click", function () {
  //отобразить в полях ввода инфу
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile, closeModal);
});
addCardButton.addEventListener("click", function () {
    openModal(popupAddCard, closeModal);
});

// Закрытие на крестик
popupCrossButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});


// //закрытие на клик вне попапа
// document.addEventListener("mousedown", function (evt) {
//   const openedPopup = document.querySelector(".popup_is-opened");
//   if (openedPopup && evt.target === openedPopup) {
//     closeModal(openedPopup);
//   }
// });

//Функции для форм
  //Функция для редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditForm);
}
profileEditForm.addEventListener("submit", handleFormProfileSubmit);

  //Функция для добавления карточки
function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const cardTitleValue = titleInput.value;
  const cardImgValue = imgInput.value;
  const newCard = createCard(cardTitleValue, cardImgValue, deleteCard, putLike, handleCardImageClick);

  cardList.prepend(newCard);
  closeModal(newCardForm);
  
  titleInput.value = "";
  imgInput.value = "";
}
newCardForm.addEventListener("submit", handleFormCardSubmit);

function handleCardImageClick(evt) {
  const cardImage = evt.target;

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  openModal(popupWideCard, closeModal);
}

// Вывод карточек на страницу
initialCards.forEach(function (item) {
  const cardElement = createCard(item.name, item.link, deleteCard, putLike, handleCardImageClick);
  cardList.append(cardElement);
});

