'use strict';

/* Переменные */

const cardsContainer = document.querySelector('.places-list');

const newCardForm = document.querySelector('.popup');

const newCardButton = document.querySelector('.user-info__button');
const closeFormButton = newCardForm.querySelector('.popup__close');

const editForm = document.querySelector('.edit-popup');

const editProfileButton = document.querySelector('.user-info__edit');
const closeEditButton = editForm.querySelector('.popup__close');

const closePicButton = document.querySelector('.image-popup__close');
/* done - REVIEW. Можно лучше. В стилевых правилах написания js-кода требуется, чтобы поиск DOM-элементов во всём проекте
осуществлялся одним способом, например только с помощью querySelector */
const newCardData = document.querySelector('#new-card');
const editFormData = document.querySelector('#edit-form');

/* Функции */

function createNewCard(object) {
  const markup = `<div class="place-card">
        <div 
        class="place-card__image" 
        style="background-image: url(https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg)"
        >
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name">Камчатка</h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>`;

  const shell = document.createElement('div');
  shell.insertAdjacentHTML('afterbegin', markup);
  const newCard = shell.firstElementChild;
  newCard.querySelector('.place-card__name').textContent = object.name;
  newCard.querySelector('.place-card__image').setAttribute('style', `background-image: url(${object.link})`);
  return newCard;
}

// Добавить карточку в контейнер
function addCard(card) {
  cardsContainer.appendChild(card);
}

// Добавить коллекцию карточек из массива
function addCollection(array) {
  array.forEach((item) => {
    const newCard = createNewCard(item);
    addCard(newCard);
  });
}

/* Обработчики событий */

// Отрисовать и скрыть попап
function renderPopup(popupElement) {
  popupElement.classList.toggle('popup_is-opened');
  popupElement.querySelector('.popup__input').focus();
}

// Сбросить данные попапа
function resetPopup(popupElement) {
  const form = popupElement.querySelector('.popup__form');
  const errors = popupElement.querySelectorAll('.error-message');
  const button = popupElement.querySelector('.button');
  if (popupElement.classList.contains('edit-popup')) {
    button.classList.add('popup__button_mode_on');
    button.removeAttribute('disabled');
  } else {
    button.classList.remove('popup__button_mode_on');
    button.setAttribute('disabled', 'disabled');
  }
  form.reset();
  errors.forEach(function (item) {
    item.textContent = '';
  });
}

// Открыть форму новой карточки
function openNewCardForm(popupElement) {
  if (!popupElement.classList.contains('.popup_is-opened')) {
    resetPopup(popupElement);
  }
  renderPopup(popupElement);
}


// Открыть форму редактирования профиля
function openEditForm(popupElement) {
  let heroName = document.querySelector('.user-info__name');
  let heroJob = document.querySelector('.user-info__job');
  const inputName = editFormData.elements.name;
  const inputAbout = editFormData.elements.about;
  if (!popupElement.classList.contains('.popup_is-opened')) {
    resetPopup(popupElement);
  }
  renderPopup(popupElement);
  inputName.value = heroName.textContent;
  inputAbout.value = heroJob.textContent;
}


// Сохранить обновленную информацию профиля
function saveEditData(event) {
  let heroName = document.querySelector('.user-info__name');
  let heroJob = document.querySelector('.user-info__job');
  const inputName = editFormData.elements.name;
  const inputAbout = editFormData.elements.about;
  event.preventDefault();
  heroName.textContent = inputName.value;
  heroJob.textContent = inputAbout.value;
  openEditForm(editForm);
}

// Открыть и закрыть картинку
function openImage(event) {
  const imagePopup = document.querySelector('.image-popup');
  const imagePopupPicture = imagePopup.querySelector('.image-popup__picture');
  if (event.target.classList.contains('place-card__image')) {
    imagePopup.classList.toggle('image-popup_is-opened');
    const picture = event.target.style.backgroundImage.slice(5, -2);
    imagePopupPicture.setAttribute('src', picture);
  } else if (event.target.classList.contains('image-popup__close')) {
    imagePopup.classList.toggle('image-popup_is-opened');
  }
}

// Поставить и убрать лайк
function likeHandler(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
}

// Добавить новую карточку по клику
function submitCardClick(event) {
  const object = {};
  const inputPlace = newCardData.elements.place;
  const inputLink = newCardData.elements.link;
  object.name = inputPlace.value;
  object.link = inputLink.value;
  event.preventDefault();
  const newCard = createNewCard(object);
  addCard(newCard);
  newCardData.reset();
  openNewCardForm(newCardForm);
}

// Удалить карточку
function deleteCard(event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    const card = event.target.closest('.place-card');
    card.remove();
  }
}

// Валидация текстового поля
function checkInputValidity(inputElement) {
  const error = inputElement.parentNode.querySelector(`#${inputElement.id}-error`);
  inputElement.setCustomValidity('');
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity('Это обязательно поле');
  } else if (inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity('Здесь должна быть ссылка');
  } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
    inputElement.setCustomValidity('Должно быть от 2 до 30 символов');
  }
  error.textContent = inputElement.validationMessage;
}

// Валидация кнопки
function setSubmitButtonState(form) {
  const inputsTemp = form.querySelectorAll('input');
  const button = form.querySelector('button');
  const inputs = Array.from(inputsTemp);
  const buttonState = inputs.every(function (item) {
    return item.validity.valid;
  });
  if (buttonState) {
    button.classList.add('popup__button_mode_on');
    button.removeAttribute('disabled');
  } else {
    button.classList.remove('popup__button_mode_on');
    button.setAttribute('disabled', 'disabled');
  }
}

// Повесить валидаторы на форму
function setEventListeners(popup) {
  const form = popup.querySelector('form');
  const inputs = popup.querySelectorAll('input');

  inputs.forEach(function (item) {
    item.addEventListener('input', function () {checkInputValidity(item)});
  })
  form.addEventListener('input', function () {setSubmitButtonState(form)});
}

/* Слушатели событий */

editProfileButton.addEventListener('click', function () {openEditForm(editForm)});
closeEditButton.addEventListener('click', function () {openEditForm(editForm)});
newCardButton.addEventListener('click', function (){openNewCardForm(newCardForm)});
closeFormButton.addEventListener('click', function (){openNewCardForm(newCardForm)});
editFormData.addEventListener('submit', saveEditData);
cardsContainer.addEventListener('click', likeHandler);
newCardData.addEventListener('submit', submitCardClick);
cardsContainer.addEventListener('click', deleteCard);
cardsContainer.addEventListener('click', openImage);
closePicButton.addEventListener('click', openImage);

/* Вызовы функций */
addCollection(initialCards);
setEventListeners(editForm);
setEventListeners(newCardForm);