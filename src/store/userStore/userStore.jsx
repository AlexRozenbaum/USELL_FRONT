import { action, makeAutoObservable } from "mobx";
import { doApiGet, doApiMethod } from "../../services/ApiService/ApiService";
import {
  API_URL
} from "../../utils/constants/url.constants";
import alertStore from "../alertStore/alertStore";

class User {
 
  user = {};
  constructor() {
    makeAutoObservable(this);
  }
  fetchUser() {
    const refreshUser = async () => {
      let url = API_URL + "/users/myInfo";
      try {
        let resp = await doApiGet(url);
       if (resp.data) {
         console.log(resp.data)
         this.user = resp.data;
       } 
       else {
         alertStore.set('Message','There is problem , try again later', true);
  
       }
       return resp.data;
      } catch (err) {
        console.log(err);
        alertStore.set('Message','There problem , try again later', true);
      }
    };
    this.user = {}
    refreshUser().then(
        action("fetchSuccess", data => {
         
            this.user = data ;
            console.log(data)
    
        }) 
    )
}
 
  updateUser = async () => {
    let url = API_URL + "/users/myinfo/edit";
    try {
      let resp = await doApiMethod(url, "PATCH", this.user);
      if (resp.data) {
        alertStore.set('Message','Your info updated', true);
      } else {
        alertStore.set('Message','There problem , try again later', true);
      }
    } catch (err) {
      console.log(err);
      alertStore.set('Message','There problem , try again later', true);
    }
  };
  deleteUser = () => {
    this.user = null;
  };
}
const userStore = new User();
export default userStore;
