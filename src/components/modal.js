export function openModal(popup, closeModal) {
  //найдем крестик и кнопку "Сохранить" для каждого попапа
  const popupCrossButton = popup.querySelector(".popup__close");
  const popupSaveButton = popup.querySelector(".popup__button");

  //показываем попап
  // Добавляем класс для открытия попапа с анимацией
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');

  //закрытие на крестик
  popupCrossButton.addEventListener("click", function () {
    closeModal(popup);
  });

  //закрытие на "Сохранить"
  if (popupSaveButton) {
    popupSaveButton.addEventListener("click", function(){
      closeModal(popup);
    });
  }
  //закрытие на esc
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal(popup);
    }
  });

  //закрытие на клик вне попапа
  popup.addEventListener("mousedown", function (event) {
    if (event.target === popup) {
        closeModal(popup);
    }
  });
}

export function closeModal(popup) {
  // Скрываем попап
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
}

// Находим форму в DOM
const formElement = document.querySelector(".popup_type_edit");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()


function handleFormSubmit(evt) {
  evt.preventDefault();

  const profile_title = document.querySelector(".profile__title");
  const profile_description = document.querySelector(".profile__description");

  profile_title.textContent = nameInput.value;
  profile_description.textContent = jobInput.value;
}
formElement.addEventListener("submit", handleFormSubmit);





