//закрытие на esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

//закрытие на оверлей
function closeOnOverlayClick(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup && evt.target === openedPopup) {
    closeModal(openedPopup);
  }
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupEsc);
  document.addEventListener("mousedown", closeOnOverlayClick);

}

export function closeModal(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    popup.classList.add("popup_is-animated");
    document.removeEventListener("keydown", closePopupEsc);
    document.removeEventListener("mousedown", closeOnOverlayClick);

  }
}
