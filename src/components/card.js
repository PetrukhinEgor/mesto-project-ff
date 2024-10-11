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

export function putLike(button){
    button.classList.toggle("card__like-button_is-active");
  }