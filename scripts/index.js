// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(cardTitleValue, cardImageValue, deleteCard) {
    // клонируем шаблон
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // заполняем данными
    cardElement.querySelector('.card__title').textContent = cardTitleValue;

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardImageValue;
    cardImage.alt = cardTitleValue;

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function(){
        deleteCard(cardElement);
    });

    return cardElement;
}

//@todo: Функция удаления карточки
function deleteCard(cardElement){
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item){
    const cardElement = createCard(item.name, item.link, deleteCard);
    cardList.append(cardElement);
});

// test
// const tmp = createCard(123,123,deleteCard);
// cardList.append(tmp);