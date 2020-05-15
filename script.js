'use strict';

/* Переменные */

const cardsContainer = document.querySelector('.places-list');
const newCardForm = document.querySelector('.popup');
const editForm = document.querySelector('.edit-popup');
const newCardButton = document.querySelector('.user-info__button');
const closeFormButton = newCardForm.querySelector('.popup__close');
const editProfileButton = document.querySelector('.user-info__edit');
const closeEditButton = document.querySelector('.edit-popup__close');
const newCardData = document.forms.new;
const editFormData = document.forms.edit;
const inputPlace = newCardData.elements.place;
const inputLink = newCardData.elements.link;
const inputName = editFormData.elements.name;

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
  if (!newCardForm.classList.contains('.popup_is-opened')) {
    newCardData.reset();
  }
  newCardForm.classList.toggle('popup_is-opened');
  inputPlace.focus();
}

// Открыть и закрыть форму редактирования профиля
function openEditForm() {
  if (!editForm.classList.contains('edit-popup_is-opened')) {
    editFormData.reset();
  }
  editForm.classList.toggle('edit-popup_is-opened');
  inputName.focus();
}

// Поставить и убрать лайк
function likeHandler(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
}

// Добавить новую карточку по клику
function submitCardClick(event) {
  event.preventDefault();
  if (inputPlace.value !== '' && inputLink.value !== '') {
    const newCard = createNewCard(inputPlace.value, inputLink.value);
    addCard(newCard);
    newCardData.reset();
    openForm();
  }
}

// Удалить карточку
function deleteCard(event) {
  if (event.target.classList.contains('place-card__delete-icon')) {
    const card = event.target.closest('.place-card');
    cardsContainer.removeChild(card);
  }
}

/* Слушатели событий */

newCardButton.addEventListener('click', openForm);
closeFormButton.addEventListener('click', openForm);
editProfileButton.addEventListener('click', openEditForm);
closeEditButton.addEventListener('click', openEditForm);

cardsContainer.addEventListener('click', likeHandler);
newCardData.addEventListener('submit', submitCardClick);
cardsContainer.addEventListener('click', deleteCard);

addCollection(initialCards);
