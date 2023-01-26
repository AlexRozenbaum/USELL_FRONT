
import { Add, Share } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doApiGet, doApiMethod } from "../../../services/ApiService/ApiService";
import userStore from "../../../store/userStore/userStore";
import MyBasicPopover from "../../../components/MyBasicPopover/MyBasicPopover";
import ItemLogic from "../../../components/Items/ItemLogic";
import authStore from "../../../store/authStore/authStore";
import { API_URL } from "../../../utils/constants/url.constants";
import { updateUser } from "../../../components/user/updateUser/updateUser";
import IconMenu from "../../../components/IconMenu/IconMenu";
import CalculateTimeLeft from "../../../components/CalculateTimeLeft/CalculateTimeLeft";
import myImage from "../../../assets/photos/undefined.jpg"
import DateService from "../../../services/DateService/DateService";

function SingleItemForm() {
  const {id} = useParams();
  
    const  fetchItem = async (id) => {
    
        let url = API_URL + "/lots/byId/" + id;
        try {
          let resp = await doApiGet(url);
           setItem(resp.data);
          console.log(resp.data)
          
        } catch (err) {
          console.log(err);
          alert("there problem ,try again later");
        }
      }; 

 const [start, setStart] = useState(true);
 const [item, setItem] = useState({});
  const [Bid, setBid] = useState("");
  const [PlaceBid, setPlaceBid] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [AddtoWishList, setAddtoWishlist] = useState(false);
  const [DeletefromWishList, setDeletefromWishlist] = useState(false);
  const [DeletefromLotlist, setDeletefromLotlist] = useState(false);
  const [DeletefromMyitems, setDeletefromMyitems] = useState(false);
  const MIN_BID =item.winner_price == null ? item.start_price : item.winner_price;
  const winner_priceRef = useRef();
  const user = userStore.user;
  const authUser = authStore.authUser;
  const navigate = useNavigate();
  useEffect(() => {
    if (start === true) {
        console.log(item)
      getData();
      console.log(item)
      console.log("mounted item");
    }
    return () => console.log("unmounting... item");
  }, []); 
  const updateItem = async (id, bodyData) => {
    let url = API_URL.concat("/lots/", id);
    console.log(bodyData)
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData);
      console.log(resp);
    } catch (err) {
      console.log(err.response);
      alert("There problem, or you try to change superAdmin to user");
    }
  };
  const deleteItem = async (id) => {
    let url = API_URL.concat("/lots/", id);
    try {
      let resp = await doApiMethod(url, "DELETE");
      console.log(resp);
    } catch (err) {
      console.log(err.response);
      alert("There problem, or you try to change superAdmin to user");
    }
  };
  const getData = async () => {
    console.log("getting data");
   await  fetchItem(id);
    console.log(enable)
    setStart(false);
  };
const enable =  ItemLogic({ item });
  doApi();
  async function doApi() {
    if (authUser) {
      if (Edit) {
        navigate("/user/myitems/edit/" + item.id);
        setEdit(false);
      }
      if (DeletefromMyitems) {
        setDeletefromMyitems(false);
        deleteItem(item.id);
      }
      if (DeletefromLotlist) {
        setDeletefromLotlist(false);
        const indexOfObject = user.lotlist.findIndex((object) => {
          return object.item_id === item.id;
        });
        const lotlist = user.lotlist;
        lotlist = lotlist.splice(indexOfObject, 1);
        await updateUser({ lotlist: lotlist });
      }
      if (AddtoWishList) {
        userStore.AddtoWishList(item.id);
        setAddtoWishlist(false);
        userStore.updateUser();
      }
      if (DeletefromWishList) {
        userStore.DeleteFromWishList(item.id)
        setDeletefromWishlist(false);
        userStore.updateUser();
      }
      if (PlaceBid) {
        setPlaceBid(false);
        const indexOfObject = user.lotlist.findIndex((object) => {
          return object.item_id === item.id;
        });
        if (indexOfObject === -1) {
          const lotlist = user.lotlist;
          lotlist.push({ item_id: item.id, bid: Bid });
          await updateUser({ lotlist: lotlist });
        }
        if (indexOfObject !== -1) {
          const lotlist = user.lotlist;
          lotlist.splice(indexOfObject, 1, { item_id: item.id, bid: Bid });
          await updateUser({ lotlist: lotlist });
        }
        await updateItem(item.id, {
          winner_user_id: user._id,
          winner_price: Bid,
        });
      }
    }
  }
  const handleOnInput = (e) => {
    if (e.target.value < MIN_BID) e.target.value = MIN_BID;
  };

  return (
    <Box alignItems={'center'} display={'flex'} justifyContent={'center'}>
    <Card sx={{ margin: 5,width:500}}>
  
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
            {item.name}
          </Avatar>
        }
        action={
          (enable?.EditEnable ||
            enable?.DeletefromWishList ||
            enable?.DeletefromLotlist ||
            enable?.DeletefromMyitems) && (
            <IconMenu
              enable={enable}
              setEdit={setEdit}
              setDeletefromWishlist={setDeletefromWishlist}
              setDeletefromLotlist={setDeletefromLotlist}
              setDeletefromMyitems={setDeletefromMyitems}
            />
          )
        }
        title={item.name}
        subheader={"published " + DateService(item.date_created)}
      />
      <Box sx={{ position: 'relative' }}>
      
      <CardMedia
        component="img"
        height={"350"}
        image={item.img_url ? item.img_url : myImage}
        alt={item.name}
        
      />
      <Box
      sx={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        width: '100%',
        bgcolor: 'rgba(0, 0, 0, 0.00)',
        color: 'white',
        padding: '10px',
      }}
    >
    <CalculateTimeLeft date_expired={item.date_expired} />

    </Box>
      </Box>
      <CardContent>
      {enable?.PlaceBid && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                defaultValue={MIN_BID}
                size={"small"}
                inputRef={winner_priceRef}
                inputProps={{ min: MIN_BID, step: 1, onInput: handleOnInput }}
                id="Bid"
                label="Bid"
                name="Bid"
              />
              <Button
                variant="contained"
                size={"large"}
                align="right"
                onClick={() => {
                  setPlaceBid(true);
                  setBid(winner_priceRef.current.value);
                }}
              >
                Place Bid
              </Button>
            </>
          )}
          <Typography  fontWeight={"Bold"}  color={"black"} >
          Category:{item.name}
          </Typography>
          <Typography   fontWeight={"Bold"}  color={"black"}  >
          Info: {item.info}
          </Typography>
          <Typography fontWeight={"Bold"} color={"black"}  >
          Start Price:{item.start_price} ₪ 
          </Typography>
          <Typography fontWeight={"Bold"} color={"black"}  >
          Last Bid:{item.winner_price || '0'} ₪
          </Typography>
      </CardContent>
        <CardContent>
        <Typography fontWeight={"Bold"} color={"black"}  >
        Location:{item.location}
          </Typography>
          <Typography fontWeight={"Bold"} color={"black"}  >
          Hand: {item.hand}
          </Typography>
          <Typography fontWeight={"Bold"} color={"black"}  >
          Phone: {item.phone}
          </Typography>
          <Typography fontWeight={"Bold"} color={"black"}  >
          Owner:{item.user_id}
          </Typography>
          <Typography fontWeight={"Bold"} color={"black"}  >
          Last Bid:{item.winner_price || 'nobody'} ₪
          </Typography>
          <Typography fontWeight={"Bold"} color={"black"}  >
          The winner bid:{item.winner_price || 'nobody'}
          </Typography>
          <Typography fontWeight={"Bold"} color={"black"}  >
          The winner:{item.winner_user_id || 'nobody'}
          </Typography>
        </CardContent>
      <CardActions disableSpacing>
        <MyBasicPopover
          icon={<Add />}
          title="add to your wishlist"
          text={"Added to your wishlist"}
          function={() => {
            if (enable?.AddtoWishList) 
            setAddtoWishlist(true);
          }}
        ></MyBasicPopover>
        <MyBasicPopover
          icon={<Share />}
          title="copy link"
          text={"copied link to clipboard"}
        ></MyBasicPopover>
      </CardActions>
    </Card>
    </Box>
  );
}
export default observer(SingleItemForm);
