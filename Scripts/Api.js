class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getCards() {
    return fetch(`${this.url}cards`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => {
        return res.json()
      });
  }

  getUser() {
    return fetch(`${this.url}users/me`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
      .then(res => {
        return res.json()
      });
  }

  updateUser(name,about) {
    return fetch(`${this.url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }
}