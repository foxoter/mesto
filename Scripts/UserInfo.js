class UserInfo {
  /**
   * Можно лучше:
   * Сохранять nameField и aboutField в конструкторе, чтобы не передавать их при каждом updateUserInfo
   */

  setUserInfo = (nameNew,aboutNew, avatarNew) => {
    this.name = nameNew;
    this.about = aboutNew;
    this.avatar = avatarNew;
  }

  updateUserInfo (nameField, aboutField, avatarElement) {
    nameField.textContent = this.name;
    aboutField.textContent = this.about;
    avatarElement.style.backgroundImage = `url(${this.avatar})`
  }
}