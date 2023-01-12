import { useNavigate } from "react-router-dom";
import { doApiMethod } from "../../services/ApiService/ApiService";
import { API_URL, USER_KEY } from "../../utils/constants/url.constants";
import { refreshUser } from "../user/refreshUser/refreshUser";
import { updateUser } from "../user/updateUser/updateUser";

export default async function ItemFunctions({
    
  item,
  PlaceBid,Bid,
  Edit,
  DeletefromMyitems,
  DeletefromLotlist,
  AddtoWishList,
  DeletefromWishList,
}) {
    const navigate = useNavigate();
  const updateItem = async (id, bodyData) => {
    let url = API_URL.concat("/lots/" , id);
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData);
      console.log(bodyData);
      console.log(resp);
    } catch (err) {
      console.log(err.response);
      alert("There problem, or you try to change superAdmin to user");
    }
  };

  const user = JSON.parse(localStorage.getItem(USER_KEY));
  if(user){
  let wishlist = user.wishlist;
  let lotlist = user.lotlist;
  
  if (Edit) navigate("/user/myitems/edit/" + item.id);
  if (DeletefromMyitems) navigate("/user/myitems/delete/" + item.id);
  if (DeletefromLotlist) {
     lotlist= lotlist.filter(lot => lot!= item.id);
   await updateUser({ lotlist: lotlist });
  }
  if (AddtoWishList) {
    wishlist.push(item.id);
    console.log("push")
    await updateUser({ wishlist: wishlist });
    console.log("update")
    await refreshUser();
    console.log("refresh")
  }
  if (DeletefromWishList) {
    console.log(DeletefromWishList)
    console.log(wishlist)
    wishlist= wishlist.filter(f => f!= item.id);
    console.log(wishlist)
    await  updateUser({ wishlist: wishlist });
    await refreshUser();
  }
  if (PlaceBid) {
    if (lotlist(item.id) !== -1) {
      lotlist.push({item_id:item.id,bid:Bid});
      await  updateUser({ lotlist: lotlist });
      await  refreshUser();
    }
    await updateItem(item.id, { winner_user_id: user._id, winner_price: Bid });
  }
}
}
