import { makeAutoObservable } from "mobx";
import { TOKEN_KEY, USER_KEY } from "../../utils/constants/url.constants";

class Auth {
  authAdmin = false;
  authUser = false;
  auth = false;
  constructor() {
    makeAutoObservable(this);
  }
  checkUser = () => {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      if (user)
        if (user.active === true && user.role === "user") {
          this.authUser = true;
        }  
    }
    if (token) {
      if (user)
        if (user.active === true && user.role === "admin") {
          this.authAdmin = true;
        }
    }
    this.auth = this.authAdmin || this.authUser;
  };
  deleteAuth = () => {
    this.authAdmin = false;
    this.authUser = false;
    this.auth = false;
    localStorage.setItem(TOKEN_KEY, null);
    localStorage.setItem(USER_KEY, null);
  };
}
const authStore = new Auth();
export default authStore;
