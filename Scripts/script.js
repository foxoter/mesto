'use strict';

// попап новой карточки
const newCardForm = document.querySelector('.popup');
const newCardData = document.querySelector('#new-card');
const newCardButton = document.querySelector('.user-info__button');
const closeFormButton = newCardForm.querySelector('.popup__close');
const newCardPopup = new Popup(newCardForm,newCardButton,closeFormButton);
newCardPopup.openButton.addEventListener('click', newCardPopup.open);
newCardPopup.closeButton.addEventListener('click', function () {
  newCardPopup.open();
  newCardFormValidator.reset();
  newCardFormValidator.setSubmitButtonState();
});

// попап формы профиля
const editForm = document.querySelector('.edit-popup');
const editFormData = document.querySelector('#edit-form');
const editProfileButton = document.querySelector('.user-info__edit');
const closeEditButton = editForm.querySelector('.popup__close');
const editProfileForm = new Popup(editForm,editProfileButton,closeEditButton);
editProfileForm.openButton.addEventListener('click', editProfileForm.open);
editProfileForm.closeButton.addEventListener('click', function () {
  editProfileForm.open();
  editFormValidator.reset();
  const button = editProfileForm.popup.querySelector('.button');
  button.classList.add('popup__button_mode_on');
  button.removeAttribute('disabled');
});

// валидировать формы
const editFormValidator = new FormValidator(editFormData);
const newCardFormValidator = new FormValidator(newCardData);

// управление данными профиля
const userData = new UserInfo
(document.querySelector('.user-info__name').textContent,
  document.querySelector('.user-info__job').textContent);

// дать форме данные из объекта при открытии
editProfileButton.addEventListener('click', function () {
  const nameField = editForm.querySelector('#name');
  const aboutField = editForm.querySelector('#about');
  nameField.value = userData.name;
  aboutField.value = userData.about;
});

// Обновить данные профиля
editFormData.addEventListener('submit', function (event) {
  event.preventDefault();
  const nameField = editForm.querySelector('#name');
  const aboutField = editForm.querySelector('#about');
  const nameDisplay = document.querySelector('.user-info__name');
  const aboutDisplay = document.querySelector('.user-info__job');
  userData.setUserInfo(nameField.value,aboutField.value);
  userData.updateUserInfo(nameDisplay,aboutDisplay);
  editProfileForm.open();
})

// попап картинки
const picElement = document.querySelector('.image-popup');
const picClose = picElement.querySelector('.image-popup__close');
const imagePopup = new PopupImg(picElement, picClose);

// создает инстанс класса Card и преобразует его в ДОМ-ноду
function assembleCard(cardObj,imgHandler) {
  const card = new Card(cardObj,imgHandler);
  const assembledCard = card.createCard();
  return assembledCard;
}

// отрисовка карточек из коллекции
const cardsContainer = new CardList(document.querySelector('.places-list'), initialCards);
const collectionElements = [];
cardsContainer.collection.forEach(item => {
  const newCard = assembleCard(item,imagePopup.open);
  collectionElements.push(newCard);
});
cardsContainer.render(collectionElements);

// добавить новую карточку
newCardData.addEventListener('submit', function (event) {
  event.preventDefault();
  const objCard = {};
  objCard.name = event.target.elements.place.value;
  objCard.link = event.target.elements.link.value;
  const newCard =  assembleCard(objCard, imagePopup.open)
  cardsContainer.addCard(newCard);
  newCardPopup.open();
  newCardFormValidator.reset();
  newCardFormValidator.setSubmitButtonState();
});