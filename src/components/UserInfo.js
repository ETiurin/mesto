export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._name = profileName;
    this._about = profileAbout;
    /*this._avatar = profileAvatar;*/
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      /*avatar: this._avatar.src,*/
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    /*this._avatar.src = avatar;*/
  }
}