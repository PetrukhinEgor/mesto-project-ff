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

export function createCard(cardTitleValue, cardImageValue, deleteCard) {
  // Создаем карточку
  const cardElement = document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);

  // Заполняем данными
  cardElement.querySelector(".card__title").textContent = cardTitleValue;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardImageValue;
  cardImage.alt = cardTitleValue;

  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}
