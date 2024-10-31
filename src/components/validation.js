// Функция для показа ошибки
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error");
  }
};

// Функция для скрытия ошибки
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error");
  errorElement.textContent = "";
};

// Установка слушателей событий на каждый инпут
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
    });
  });

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    inputList.forEach((inputElement) => {
      checkInputValidity(formElement, inputElement);
    });
  });
};

// Включение валидации для каждой формы
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((form) => {
    setEventListeners(form);
  });
};

// const formBtn = document.querySelector('.popup__button');
const allowedPattern = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
const urlPattern =
  /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

// Проверка валидности инпутов
export const checkInputValidity = (formElement, inputElement) => {
  const errorMessage =
    inputElement.dataset.errorMessage || "Поле заполнено некорректно.";

  if (inputElement.validity.valueMissing) {
    showError(formElement, inputElement, "Вы пропустили это поле.");
  } else if (
    inputElement.type === "text" &&
    !allowedPattern.test(inputElement.value)
  ) {
    showError(formElement, inputElement, errorMessage);
  } else if (
    inputElement.type === "url" &&
    !urlPattern.test(inputElement.value)
  ) {
    showError(formElement, inputElement, "Введите корректный URL.");
  } else {
    hideError(formElement, inputElement);
  }
};

// Функция для очистки ошибок валидации и деактивации кнопки
export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const formBtn = formElement.querySelector(".popup__button");

  // Скрытие ошибок на всех инпутах формы
  inputList.forEach((inputElement) => hideError(formElement, inputElement));
  formBtn.removeAttribute("disabled");
};

// Вызов функции enableValidation с селектором форм
enableValidation();
