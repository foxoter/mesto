'use strict';

// попап новой карточки
const newCardForm = document.querySelector('.popup');
const newCardData = document.querySelector('#new-card');
const newCardButton = document.querySelector('.user-info__button');
const closeFormButton = newCardForm.querySelector('.popup__close');
const newCardPopup = new Popup(newCardForm,newCardButton,closeFormButton);


// попап формы профиля
const editForm = document.querySelector('.edit-popup');
const editFormData = document.querySelector('#edit-form');
const editProfileButton = document.querySelector('.user-info__edit');
const closeEditButton = editForm.querySelector('.popup__close');
const editProfileForm = new Popup(editForm,editProfileButton,closeEditButton);


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
})

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

// отрисовка карточек из коллекции
const cardsContainer = new CardList(document.querySelector('.places-list'), initialCards);
const collectionElements = [];
cardsContainer.collection.forEach(item => {
  const card = new Card(item.name, item.link, imagePopup.open);
  const newCard = card.createCard();
  collectionElements.push(newCard);
});
cardsContainer.render(collectionElements);

// добавить новую карточку
function submitNewCard(event) {
  event.preventDefault();
  const place = event.target.elements.place.value;
  const link = event.target.elements.link.value;
  const card = new Card(place,link,imagePopup.open);
  const newCard = card.createCard();
  cardsContainer.addCard(newCard);
  newCardPopup.open();
  newCardPopup.reset();
}
newCardData.addEventListener('submit', submitNewCard);

// валидировать формы
const editFormValidator = new FormValidator(editFormData);
const newCardFormValidator = new FormValidator(newCardData);