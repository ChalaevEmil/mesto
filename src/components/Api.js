const token = {
  serverAdress: "https://mesto.nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "88dc7ceb-9803-4af5-9ccd-c9bd864518b0",
    "Content-Type": "application/json",
  },
};

class Api {
  constructor({ serverAdress, headers }) {
    this._serverAdress = serverAdress;
    this._headers = headers;
  }

  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  getProfileInfo() {
    return fetch(`${this._serverAdress}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  getStartedCards() {
    return fetch(`${this._serverAdress}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  editingProfile(profileInfo) {
    return fetch(`${this._serverAdress}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: profileInfo["name"],
        about: profileInfo["profession"],
      }),
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  addCard(cardInfo) {
    return fetch(`${this._serverAdress}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardInfo["input-name"],
        link: cardInfo["input-url"],
      }),
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._serverAdress}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  setCardLike(cardId) {
    return fetch(`${this._serverAdress}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  deleteCardLike(cardId) {
    return fetch(`${this._serverAdress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._serverResponse(res);
    });
  }

  editAvatar(data) {
    return fetch(`${this._serverAdress}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._serverResponse(res);
    });
  }
}

export { Api, token };
