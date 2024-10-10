import { cardList } from "..";
import { putLike } from "./like.js";
import { openModal, closeModal } from "./modal.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createCard(cardTitleValue, cardImageValue, deleteCard, putLike, handleCardImageClick) {
  // Создаем карточку
  const cardElement = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
  // Заполняем данными
  cardElement.querySelector(".card__title").textContent = cardTitleValue;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardImageValue;
  cardImage.alt = cardTitleValue;

  //кнопки внутри карточки(корзина и лайк)
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  cardImage.addEventListener("click", handleCardImageClick);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener('click', function(){
    putLike(likeButton);
  });
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

// Находим форму в DOM
const formElement = document.querySelector(".popup_type_new-card");
// Находим поля формы в DOM
const titleInput = formElement.querySelector(".popup__input_type_card-name");
const imgInput = formElement.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardTitleValue = titleInput.value;
  const cardImgValue = imgInput.value;
  const newCard = createCard(cardTitleValue, cardImgValue, deleteCard, putLike, handleCardImageClick);

  cardList.prepend(newCard);
  
  titleInput.value = "";
  imgInput.value = "";
}
formElement.addEventListener("submit", handleCardFormSubmit);


const popupWideCard = document.querySelector(".popup_type_image");
const popupImage = popupWideCard.querySelector(".popup__image");
const popupCaption = popupWideCard.querySelector(".popup__caption");

export function handleCardImageClick(evt) {
  const cardImage = evt.target;

  popupImage.src = cardImage.src;
  popupImage.alt = cardImage.alt;
  popupCaption.textContent = cardImage.alt;

  openModal(popupWideCard, closeModal);
}




