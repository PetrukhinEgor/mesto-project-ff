// Функция для показа ошибки
const showError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
  }
};

// Функция для скрытия ошибки
const hideError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  if (errorElement) {
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = "";
  }
};

// Функция для переключения состояния кнопки
const toggleButtonState = (inputList, button, selectors) => {
  if (inputList.some((input) => !input.validity.valid)) {
    button.setAttribute("disabled", true);
    button.classList.add(selectors.inactiveButtonClass);
  } else {
    button.removeAttribute("disabled");
    button.classList.remove(selectors.inactiveButtonClass);
  }
};

// Установка слушателей событий на каждый инпут
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const formBtn = formElement.querySelector(selectors.submitButtonSelector);

  // Включение/отключение кнопки при вводе данных
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, formBtn, selectors);
    });
  });
};

// Проверка валидности инпутов
export const checkInputValidity = (formElement, inputElement, selectors) => {
  const errorMessage =
    inputElement.dataset.errorMessage || "Поле заполнено некорректно.";

  if (inputElement.validity.valueMissing) {
    showError(formElement, inputElement, "Вы пропустили это поле.", selectors);
  } else if (
    inputElement.type === "text" &&
    !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(inputElement.value)
  ) {
    showError(formElement, inputElement, errorMessage, selectors);
  } else if (
    inputElement.type === "url" &&
    !/^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6})([\/\w.-]*)*\/?$/.test(inputElement.value)
  ) {
    showError(formElement, inputElement, "Введите корректный URL.", selectors);
  } else {
    hideError(formElement, inputElement, selectors);
  }
};

// Функция для очистки ошибок валидации и деактивации кнопки
export const clearValidation = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const formBtn = formElement.querySelector(selectors.submitButtonSelector);

  // Скрытие ошибок на всех инпутах формы
  inputList.forEach((inputElement) => hideError(formElement, inputElement, selectors));
  formBtn.removeAttribute("disabled");
  formBtn.classList.remove(selectors.inactiveButtonClass);
};

// Включение валидации для каждой формы
export const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};
