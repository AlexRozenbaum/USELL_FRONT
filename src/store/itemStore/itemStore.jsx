import { makeAutoObservable } from "mobx";
import { doApiGet, doApiMethod } from "../../services/ApiService/ApiService";
import { API_URL } from "../../utils/constants/url.constants";

class Item {
  item = {};

  constructor() {
    makeAutoObservable(this);
  }
  fetchItem = async (id) => {
    let url = API_URL + "/lots/byId/" + id;
    try {
      let resp = await doApiGet(url);
      this.item = resp.data;
    } catch (err) {
      console.log(err);
      alert("there problem ,try again later");
    }
  };
  updateItem = async (id, bodyData) => {
    let url = API_URL + "/lots/" + id;
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData);
      console.log(bodyData);
      console.log(resp);
    } catch (err) {
      console.log(err.response);
      alert("There problem, or you try to change superAdmin to user");
    }
  };
  deleteItem =()=>
  {
    this.item={}
  }

}
const itemStore = new Item();
export default itemStore;
