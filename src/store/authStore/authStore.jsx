import { action, makeAutoObservable } from "mobx";
import { TOKEN_KEY } from "../../utils/constants/url.constants";
import userStore from "../userStore/userStore";

class Auth {
  authAdmin = false;
  authUser = false;
  auth = false;
  constructor() {
    makeAutoObservable(this,{checkUser:action,deleteAuth:action});

  }
  checkUser  () {
   const user=userStore.user;
    const token = localStorage.getItem(TOKEN_KEY);
    if (token){
        if (user.active === true && user.role === "user") {
          this.authUser = true;

        }  
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
    localStorage.clear(TOKEN_KEY);
  };
}
const authStore = new Auth();
export default authStore;
