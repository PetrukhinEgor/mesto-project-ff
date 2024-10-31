import { likeCard, unlikeCard } from "./api";

export function createCard(
  cardTitleValue,
  cardImageValue,
  likesCount,
  cardId,
  ownerId,
  currentUserId,
  deleteCard,
  putLike,
  handleCardImageClick
) {
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = cardTitleValue;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardImageValue;
  cardImage.alt = cardTitleValue;

  const likeCountElement = cardElement.querySelector(".card__like-count");
  likeCountElement.textContent = likesCount;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    putLike(cardId, likeButton, likeCountElement);
  });

  cardImage.addEventListener("click", handleCardImageClick);

  if (ownerId === currentUserId) {
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => deleteCard(cardId, cardElement));
  } else {
    cardElement.querySelector(".card__delete-button").style.display = "none";
  }
  
  return cardElement;
}

export function deleteCard(cardId, cardElement) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "daed3754-3575-4e1a-a7d0-daae90f95c75",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        cardElement.remove();
      } else {
        console.error("Ошибка при удалении карточки");
      }
    })
    .catch((err) => {
      console.error("Ошибка:", err);
    });
}


export function putLike(cardId, likeButton, likeCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    unlikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = updatedCard.likes.length; // Обновляем количество лайков
      })
      .catch((error) => console.log(error));
  } else {
    likeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = updatedCard.likes.length; // Обновляем количество лайков
      })
      .catch((error) => console.log(error));
  }
}
