export class UserInfo {
  constructor({ selectorProfileName, selectorProfileProfession }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileProfession = document.querySelector(selectorProfileProfession);
  }

  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userProfession: this._profileProfession.textContent,
    };
  }

  setUserInfo({ userName, userProfession }) {
    this._profileName.textContent = userName;
    this._profileProfession.textContent = userProfession;
  }
}
