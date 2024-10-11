const popupCrossButtons = document.querySelectorAll(".popup__close");

// Закрытие на крестик
popupCrossButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

//закрытие на esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

//закрытие на клик вне попапа
document.addEventListener("mousedown", function (evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup && evt.target === openedPopup) {
    closeModal(openedPopup);
  }
});

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupEsc);
}

export function closeModal(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    popup.classList.add("popup_is-animated");
    document.removeEventListener("keydown", closePopupEsc);
  }
}
