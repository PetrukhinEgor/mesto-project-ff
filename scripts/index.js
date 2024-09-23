// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

// @todo: Функция создания карточки
function addCard(cardImageValue, cardTitleValue, deleteCard) {
    // клонируем шаблон
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // заполняем данными
    cardElement.querySelector('.card__image').src = cardImageValue;
    cardElement.querySelector('.card__title').textContent = cardTitleValue;

    // добавляем в список (отображаем на странице)
    cardList.append(cardElement);

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function(){
        deleteCard(cardElement);
    });
}

//@todo: Функция удаления карточки
function deleteCard(cardElement){
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item){
    addCard(item.link, item.name, deleteCard);
});


//test
//addCard(123,123, deleteCard)
