import { likeCard, unlikeCard, deleteCardFromServer} from "./api";

export function createCard(
  cardTitleValue,
  cardImageValue,
  likes, 
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
  likeCountElement.textContent = likes.length; 

  const likeButton = cardElement.querySelector(".card__like-button");


  if (likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

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
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
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
