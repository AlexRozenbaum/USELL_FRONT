import { useLocalStorage } from "../../../Hooks/useLocalStorage";
import { doApiGet } from "../../../services/ApiService/ApiService";
import alertStore from "../../../store/alertStore/alertStore";
import { API_URL, USER_KEY } from "../../../utils/constants/url.constants";

export async  function refreshUser ()  {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      if (resp.data) {
        console.log(resp.data)
      localStorage.setItem(USER_KEY,JSON.stringify(resp.data)); 
      }
    } catch (err) {
      console.log(err);
      alertStore.set('Message','There problem , try again later', true);
    }
  };