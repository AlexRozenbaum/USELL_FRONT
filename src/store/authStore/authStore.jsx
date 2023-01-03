import { makeAutoObservable } from "mobx";
import {LOGGINED_ADMIN, LOGGINED_USER, TOKEN_KEY } from "../../utils/constants/url.constants";
class Auth{
   authAdmin=false;
   authUser=false;
  constructor() {
    makeAutoObservable(this);
  }
    checkUser=()=> {
    if(localStorage.getItem(TOKEN_KEY)){
    this.authAdmin=localStorage.getItem(LOGGINED_ADMIN);
    }
    if(localStorage.getItem(TOKEN_KEY)){
      this.authUser=localStorage.getItem(LOGGINED_USER);
    }
    }
    deleteAuth=()=>{
    this.authAdmin=false;
    this.authUser=false;
    localStorage.setItem(TOKEN_KEY,null)
    localStorage.setItem(LOGGINED_ADMIN,false)
    localStorage.setItem(LOGGINED_USER,false)
   }
}
const authStore = new Auth();
export default authStore;