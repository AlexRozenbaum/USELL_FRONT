import { makeAutoObservable } from "mobx";
import { doApiGet, doApiMethod } from "../../services/ApiService/ApiService";
import { API_URL } from "../../utils/constants/url.constants";
import alertStore from "../alertStore/alertStore";
class Users {
  users = [];
  constructor() {
    makeAutoObservable(this);
  }
  fetchUsers = async () => {
    let url = API_URL + "/users/usersList";
    try {
      let resp = await doApiGet(url);
      this.users = resp.data;
    } catch (err) {
      console.log(err);
      alertStore.set('Message','There problem , try again later', true);
    }
  };
  updateUser = async (id, field, value) => {
    let bodyData = { [field]: value };
    let url = API_URL + "/users/change" + field + "/" + id;
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData);
    } catch (err) {
      console.log(err.response);
      alertStore.set('There problem, or you try to change superAdmin to user', true);
    }
  };
}
const usersStore = new Users();
export default usersStore;
