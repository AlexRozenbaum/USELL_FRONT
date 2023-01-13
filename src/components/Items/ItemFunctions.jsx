import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { doApiMethod } from "../../services/ApiService/ApiService";
import authStore from "../../store/authStore/authStore";
import userStore from "../../store/userStore/userStore";
import { API_URL, USER_KEY } from "../../utils/constants/url.constants";
import { refreshUser } from "../user/refreshUser/refreshUser";
import { updateUser } from "../user/updateUser/updateUser";



function ItemFunctions(
  {item},
  PlaceBid,
  Bid,
  Edit,
  DeletefromMyitems,
  DeletefromLotlist,
  AddtoWishList,
  DeletefromWishList,
) {
  const user = userStore.user;
  const authUser = authStore.authUser;
  const navigate = useNavigate();
  const updateItem = async (id, bodyData) => {
    let url = API_URL.concat("/lots/", id);
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData);
      console.log(bodyData);
      console.log(resp);
    } catch (err) {
      console.log(err.response);
      alert("There problem, or you try to change superAdmin to user");
    }
  };
  doApi();
async function doApi(){
  if (authUser) {
    if (Edit) navigate("/user/myitems/edit/" + item.id);
    if (DeletefromMyitems) navigate("/user/myitems/delete/" + item.id);
    if (DeletefromLotlist) {
      const lotlist = user.lotlist.filter((lot) => lot != item.id);
      await updateUser({ lotlist: lotlist });
    }
    if (AddtoWishList) {
      let wishlist = user.wishlist.push(item.id);
      console.log("push");
      await updateUser({ wishlist: wishlist });
      console.log("update");
      await refreshUser();
      console.log("refresh");
    }
    if (DeletefromWishList) {
      console.log(DeletefromWishList);
      console.log(wishlist);
      const wishlist = user.wishlist.filter((f) => f != item.id);
      console.log(wishlist);
      await updateUser({ wishlist: wishlist });
    }
    if (PlaceBid) {
      if (user.lotlist(item.id) !== -1) {
        const lotlist = user.lotlist.push({ item_id: item.id, bid: Bid });
        await updateUser({ lotlist: lotlist });
      }
      await updateItem(item.id, {
        winner_user_id: user._id,
        winner_price: Bid,
      });
    }
  }
}
  
}
export default observer(ItemFunctions);
