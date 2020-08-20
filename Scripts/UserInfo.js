class UserInfo {
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