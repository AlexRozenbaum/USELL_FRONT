import { makeAutoObservable } from "mobx";
import { doApiGet, doApiMethod } from "../../services/ApiService/ApiService";
import { API_URL } from "../../utils/constants/url.constants";
import alertStore from "../alertStore/alertStore";
class Category {
  constructor() {
    makeAutoObservable(this);
  }
  categories = [];
  fetchCategories = async () => {
    let url = API_URL + "/categories/";
    try {
      let resp = await doApiGet(url);
      this.categories = resp.data;
    } catch (err) {
      console.log(err);
      alertStore.set('there problem ,try again later', true);
    }
  };
  createCategory = async (newRow) => {
    let url = API_URL + "/categories/";
    console.log(url);
    try {
      let resp = await doApiMethod(url, "POST", newRow);
    } catch (err) {
      console.log(err.response);
      alertStore.set('Message','There problem, or you try to change superAdmin to user', true);

    }
  };
  updateCategory = async (updatedRow) => {
    let url = API_URL + "/categories/" + updatedRow.category_url;
    try {
      let resp = await doApiMethod(url, "PATCH", updatedRow);
    } catch (err) {
      console.log(err.response);
      alertStore.set('Message','There problem, or you try to change superAdmin to user', true);
    }
  };
  deleteCategory = async (category_url) => {
    let url = API_URL + "/categories/" + category_url;
    try {
      let resp = await doApiMethod(url, "delete");
    } catch (err) {
      console.log(err.response);
      alertStore.set('Message','There problem, or you try to change superAdmin to user', true);

    }
  };
}
const categoryStore = new Category();
export default categoryStore;

