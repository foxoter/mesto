// Проект на Гитхабе: https://github.com/foxoter/mesto

'use strict';

/* Переменные */

const cardsContainer = document.querySelector('.places-list');

const newCardForm = document.querySelector('.popup');
const newCardButton = document.querySelector('.user-info__button');
const closeFormButton = newCardForm.querySelector('.popup__close');

const editForm = document.querySelector('.edit-popup');
const editProfileButton = document.querySelector('.user-info__edit');
const closeEditButton = document.querySelector('.edit-popup__close');

const closePicButton = document.querySelector('.image-popup__close');

const newCardData = document.forms.new;
const editFormData = document.forms.edit;

/* Функции */

// Собрать новую карточку
function createNewCard(name, link) {
  const markup = `<div class="place-card">
        <div class="place-card__image" style="background-image: url(https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg)">
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

  newCard.querySelector('.place-card__name').textContent = name;
  newCard.querySelector('.place-card__image').setAttribute('style', `background-image: url(${link})`);

  return newCard;
}

// Добавить карточку в контейнер
function addCard(card) {
  cardsContainer.appendChild(card);
}

// Добавить коллекцию карточек из массива
function addCollection(array) {
  array.forEach((item) => {
    const newCard = createNewCard(item.name, item.link);
    addCard(newCard);
  });
}

/* Обработчики событий */

// Открыть и закрыть форму новой карточки
function openForm() {
  const addPlaceButton = newCardForm.querySelector('.popup__button');
  const inputPlace = newCardData.elements.place;
  const placeError = newCardData.querySelector('#place-error');
  const linkError = newCardData.querySelector('#link-error');

  if (!newCardForm.classList.contains('.popup_is-opened')) {
    newCardData.reset();
    addPlaceButton.classList.remove('popup__button_mode_on');
    addPlaceButton.setAttribute('disabled', 'disabled');
    placeError.textContent = '';
    linkError.textContent = '';
  }
  newCardForm.classList.toggle('popup_is-opened');
  inputPlace.focus();
}

// Открыть и закрыть форму редактирования профиля
function openEditForm() {
  let heroName = document.querySelector('.user-info__name');
  let heroJob = document.querySelector('.user-info__job');
  const inputName = editFormData.elements.name;
  const inputAbout = editFormData.elements.about;
  const nameError = editFormData.querySelector('#name-error');
  const aboutError = editFormData.querySelector('#about-error');

  if (!editForm.classList.contains('edit-popup_is-opened')) {
    editFormData.reset();
    nameError.textContent = '';
    aboutError.textContent = '';
  }
  editForm.classList.toggle('edit-popup_is-opened');
  inputName.value = heroName.textContent;
  inputAbout.value = heroJob.textContent;
  inputName.focus();

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
  openEditForm();
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
  const inputPlace = newCardData.elements.place;
  const inputLink = newCardData.elements.link;
  event.preventDefault();
  const newCard = createNewCard(inputPlace.value, inputLink.value);
  addCard(newCard);
  newCardData.reset();
  openForm();
}

// Удалить карточку
function deleteCard(event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    const card = event.target.closest('.place-card');
    cardsContainer.removeChild(card);
  }
}

// Валидация текстового поля
function checkInputValidity(event) {
  const field = event.target;
  const error = field.parentNode.querySelector(`#${field.id}-error`);
  field.setCustomValidity('');
  if (field.validity.valueMissing) {
    field.setCustomValidity('Это обязательно поле');
  } else if (field.validity.typeMismatch) {
    field.setCustomValidity('Здесь должна быть ссылка');
  } else if (field.validity.tooShort || field.validity.tooLong) {
    field.setCustomValidity('Должно быть от 2 до 30 символов');
  }
  error.textContent = field.validationMessage;
}

// Валидация кнопки
function setSubmitButtonState(event) {
  const elements = Array.from(event.currentTarget.elements);
  const inputs = elements.slice(0, 2);
  const button = elements[2];
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
function setEventListeners(form) {
  form.addEventListener('input', checkInputValidity);
  form.addEventListener('input', setSubmitButtonState);
}

/* Слушатели событий */

newCardButton.addEventListener('click', openForm);
closeFormButton.addEventListener('click', openForm);
editProfileButton.addEventListener('click', openEditForm);
closeEditButton.addEventListener('click', openEditForm);
editFormData.addEventListener('submit', saveEditData);
cardsContainer.addEventListener('click', likeHandler);
newCardData.addEventListener('submit', submitCardClick);
cardsContainer.addEventListener('click', deleteCard);
cardsContainer.addEventListener('click', openImage);
closePicButton.addEventListener('click', openImage);

/* Вызовы функций */
addCollection(initialCards);
setEventListeners(editFormData);
setEventListeners(newCardData);