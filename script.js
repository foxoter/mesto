'use strict';

/* Переменные */

const cardsContainer = document.querySelector('.places-list');
const newCardForm = document.querySelector('.popup');
const editForm = document.querySelector('.edit-popup');
const newCardButton = document.querySelector('.user-info__button');
const closeFormButton = newCardForm.querySelector('.popup__close');
const addPlaceButton = newCardForm.querySelector('.popup__button');
const editProfileButton = document.querySelector('.user-info__edit');
const closeEditButton = document.querySelector('.edit-popup__close');
let heroName = document.querySelector('.user-info__name');
let heroJob = document.querySelector('.user-info__job');
const closePicButton = document.querySelector('.image-popup__close');
const imagePopup = document.querySelector('.image-popup');
const imagePopupPicture = imagePopup.querySelector('.image-popup__picture');
const newCardData = document.forms.new;
const editFormData = document.forms.edit;
const inputPlace = newCardData.elements.place;
const inputLink = newCardData.elements.link;
const inputName = editFormData.elements.name;
const inputAbout = editFormData.elements.about;



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

    // После закрытия формы кнопка снова делается неактивной.
    // Добавляются соответствующий атрибут и меняется класс.
    // Хорошая ли практика писать это тут?

    addPlaceButton.classList.remove('popup__button_mode_on');
    addPlaceButton.setAttribute('disabled', 'true');
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
  inputName.value = heroName.textContent;
  inputAbout.value = heroJob.textContent;
  inputName.focus();
}

// Сохранить обновленную информацию профиля
function saveEditData(event) {
  event.preventDefault();
  if (event.target.classList.contains('edit-popup__button')) {
    heroName.textContent = inputName.value;
    heroJob.textContent = inputAbout.value;
    openEditForm();
  }
}

// Открыть и закрыть картинку
function openImage(event) {
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

// Активация, деакцтивация кнопки добавления новой карточки
function inputHandlerNewCard(event) {
  const place = event.currentTarget.elements.place;
  const link = event.currentTarget.elements.link;

  if (place.value !== '' && link.value !== '') {
    addPlaceButton.classList.add('popup__button_mode_on');
    addPlaceButton.removeAttribute('disabled');
  } else {
    addPlaceButton.classList.remove('popup__button_mode_on');
    addPlaceButton.setAttribute('disabled', 'true');
  }
}

// Активация, деакцтивация кнопки редактирования профиля
function inputHandlerEdit(event) {
  const name = event.currentTarget.elements.name;
  const about = event.currentTarget.elements.about;
  const button = event.currentTarget.save;

  if (name.value === '' || about.value === '') {
    button.classList.add('edit-popup__button_mode_off');
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove('edit-popup__button_mode_off');
    button.removeAttribute('disabled');
  }
}


/* Слушатели событий */

newCardButton.addEventListener('click', openForm);
closeFormButton.addEventListener('click', openForm);
editProfileButton.addEventListener('click', openEditForm);
closeEditButton.addEventListener('click', openEditForm);
editFormData.addEventListener('click', saveEditData);
cardsContainer.addEventListener('click', likeHandler);
newCardData.addEventListener('submit', submitCardClick);
cardsContainer.addEventListener('click', deleteCard);
cardsContainer.addEventListener('click', openImage);
closePicButton.addEventListener('click', openImage);
newCardData.addEventListener('input', inputHandlerNewCard);
editFormData.addEventListener('input', inputHandlerEdit);

addCollection(initialCards);