// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
//===============
const addCardButton = document.querySelector('.profile__add-button');
const popUp = document.querySelector('.popup')



// @todo: Функция создания карточки
function addCard(cardImageValue, cardTitleValue) {
    // клонируем контент шаблона
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // заполняем данными
    cardElement.querySelector('.card__image').src = cardImageValue;
    cardElement.querySelector('.card__title').textContent = cardTitleValue;

    
    //обработчик события ДОБАВЛЕНИЯ КАРТОЧКИ(ДОДЕЛАТЬ)
    addCardButton.addEventListener('click', function(){
        popUp.setAttribute('style', 'display: flex')
    });
    //================================================



    // добавляем в список (отображаем на странице)
    cardList.append(cardElement);
}

// @todo: Функция удаления карточки
    // const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    // cardDeleteButton.addEventListener('click', function(event) {
    //     cardElement.remove(); // удаление карточки
    // });

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item){
    addCard(item.link, item.name)
});

