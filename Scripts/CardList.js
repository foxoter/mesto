class CardList {
  constructor(container, collection) {
    this.container = container;
    this.collection = collection;
  }

  // добавить элемент карточки в контейнер
  addCard(card) {
    this.container.appendChild(card);
  }

  // отрисовка карточек при загрузке
  render(array) {
    array.forEach(item => {
      this.addCard(item);
    })
  }
}



