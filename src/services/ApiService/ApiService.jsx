import axios from "axios";
import { TOKEN_KEY } from "../../utils/constants/url.constants";
export const doApiGet = async(_url) => {
  try{
    let resp = await axios.get(_url,{
      headers:{
        'Content-Type': 'application/json' ,
        "x-api-key": localStorage.getItem(TOKEN_KEY)
      }
    })
    return resp;
  }
  catch(err){
    throw err;
  }
}
export const doApiMethod = async(_url,_method,_body={}) => {
  try{
    let resp = await axios({
      url:_url,
      method:_method,
      data:_body,
      headers:{
        'Content-Type': 'application/json' ,
        "x-api-key":localStorage.getItem(TOKEN_KEY)
      }
    })
    return resp;
  }
  catch(err){
    throw err;
  }
}