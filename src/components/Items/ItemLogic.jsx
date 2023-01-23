import authStore from "../../store/authStore/authStore";
import userStore from "../../store/userStore/userStore";
function ItemLogic({ item }) {
    authStore.checkUser();
    const auth=authStore.auth;
  const user =userStore.user;
  const difference = item.date_expired - +Date.now();
  let 
    PlaceBid,
    EditEnable,
    DeletefromMyitems,
    DeletefromLotlist,
    AddtoWishList,
    DeletefromWishList;
  if (auth) {
    if (  
      item.item_lot &&
      user._id !== item.user_id &&
      difference > 0
    ) {
      
      PlaceBid = true;
    } else PlaceBid = false;

    if (!item.item_lot&&user._id === item.user_id) {
      EditEnable = true;
    } else EditEnable = false;

    if (!item.item_lot&&user._id===item.user_id) {
      DeletefromMyitems = true;
    } else DeletefromMyitems = false;
    if (item.item_lot && difference < 0 && item.winner_user_id!==null&&item.winner_user_id !== user._id)
    {
    const indexOfObject = user.lotlist.findIndex(object => {
      return object.item_id === item.id;})
      if(indexOfObject!==1){
      DeletefromLotlist = true;
      }
    }
    else DeletefromLotlist = false;
    if (item.user_id !== user._id && user.wishlist.indexOf(item._id) === -1) {
      AddtoWishList = true;
    } else AddtoWishList = false;
    if (user.wishlist.indexOf(item._id) !== -1) {
      DeletefromWishList = true;
    } else DeletefromWishList = false;
  } else {
    PlaceBid = false;
    EditEnable = false;
    DeletefromMyitems= false;
    DeletefromLotlist= false;
    AddtoWishList = false;
    DeletefromWishList=false;
  }

  return ( { PlaceBid, EditEnable, DeletefromMyitems, DeletefromLotlist, AddtoWishList,DeletefromWishList });
}
export default (ItemLogic)