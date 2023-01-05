import { makeAutoObservable } from "mobx";
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
  refreshUser = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      if (resp.data) {
        this.user = resp.data;
      } else {
        alertStore.set('Message','There is problem , try again later', true);

      }
    } catch (err) {
      console.log(err);
      alertStore.set('Message','There problem , try again later', true);
    }
  };
  changePassword = async (bodyData) =>{
    let url = API_URL + "/users/changepassword";
    try {
      let resp = await doApiMethod(url, "PATCH",bodyData);
      if (resp.data) {
        alertStore.set('Message','Password changed succesfully', true);
      } else {
        alertStore.set('Message','There problem , try again later', true);
      }
    } catch (err) {
      console.log(err);
      alertStore.set('Message','There problem , try again later', true);
    }
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
