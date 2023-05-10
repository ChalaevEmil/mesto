export class UserInfo {
  constructor({ selectorProfileName, selectorProfileProfession, selectorAvatar }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileProfession = document.querySelector(selectorProfileProfession);
    this._selectorAvatar = document.querySelector(selectorAvatar)
  }

  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userProfession: this._profileProfession.textContent,
    };
  }

  setUserInfo(info) {
    this._profileName.textContent = info.name;
    this._profileProfession.textContent = info.about;
    }

  setAvatar (userAvatar) {
    this._selectorAvatar.style.backgroundImage = `url(${userAvatar})`;
  }   
}
