export default class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._name = profileName;
    this._about = profileAbout;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
