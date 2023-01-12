import { doApiMethod } from "../../../services/ApiService/ApiService";
import alertStore from "../../../store/alertStore/alertStore";
import { API_URL } from "../../../utils/constants/url.constants";

 export async function  updateUser  (bodyData) {
    let url = API_URL.concat("/users/myinfo/edit");
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData);
      if (resp.data) {
        alertStore.set("Message", "Your info updated", true);
      } else {
        alertStore.set("Message", "There problem , try again later", true);
      }
    } catch (err) {
      console.log(err);
      alertStore.set("Message", "There problem , try again later", true);
    }
  };
  
  