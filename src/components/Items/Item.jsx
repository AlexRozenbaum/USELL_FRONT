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
  Collapse,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateService from "../../services/DateService/DateService";
import CalculateTimeLeft from "../CalculateTimeLeft/CalculateTimeLeft";
import MyBasicPopover from "../MyBasicPopover/MyBasicPopover";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import myImage from "../../assets/photos/undefined.jpg";
import IconMenu from "../IconMenu/IconMenu";
import ItemLogic from "./ItemLogic";
import ItemFunctions from "./ItemFunctions";
import { observer } from "mobx-react";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function Item({ item }) {
 
  const getData = async () => {
    console.log("getting data");
    setStart(false);
    useEffect(() => {
      if (start === true) {
        getData();
        console.log("mounted item");
      }
      return () => console.log("unmounting... item");
    }, []);
  };
  const enable = ItemLogic({ item })
  const [start, setStart] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [Bid, setBid] = useState('');
  const [PlaceBid, setPlaceBid] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [AddtoWishList, setAddtoWishlist] = useState(false);
  const [DeletefromWishList, setDeletefromWishlist] = useState(false);
  const [DeletefromLotlist, setDeletefromLotlist] = useState(false);
  const [DeletefromMyitems, setDeletefromMyitems] = useState(false);
  const MIN_BID=(item.winner_price==null?item.start_price:item.winner_price);
  const winner_priceRef = useRef();
   ItemFunctions(item,
    PlaceBid,Bid,
    Edit,
    DeletefromMyitems,
    DeletefromLotlist,
    AddtoWishList,
    DeletefromWishList);
  const handleOnInput = (e) => {
    if
   ( e.target.value<MIN_BID)
    e.target.value=MIN_BID
};

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
            {item.name}
          </Avatar>
        }
        action={<IconMenu enable={enable}  setEdit={setEdit} setAddtoWishlist={setAddtoWishlist}
        setDeletefromWishlist={setDeletefromWishlist} setDeletefromLotlist={setDeletefromLotlist}
        setDeletefromMyitems={setDeletefromMyitems}/>}
        title={item.name}
        subheader={"published " + DateService(item.date_created)}
      />
      <CardMedia
        component="img"
        height={"250"}
        image={item.img_url ? item.img_url : myImage}
        alt={item.name}
      />
      <CardContent>
        Category:{}
        Info: {item.info}
        Start Price:{item.start_price} ₪ Last Bid:{item.winner_price} ₪ Timeleft
        to buy:
        <CalculateTimeLeft date_expired={item.date_expired} />
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          Location:{item.location}
          Hand: {item.hand}
          Phone: {item.phone}
          Nickname:{item.user_nickname}
          The winner bid:{item.winner_price}
          The winner:{item.winner_user_id}
          {enable.PlaceBid&&<>
          <TextField
              margin="normal"
              required
              fullWidth
              defaultValue={MIN_BID} size={"small"}
              inputRef={winner_priceRef}
               inputProps={{ min: (MIN_BID),step:1 ,onInput: handleOnInput}}
              id="Bid"
              label="Bid"
              name="Bid"
            />
          <Button variant="contained" size={"large"} align="right" onClick={()=>{setPlaceBid(true);setBid(winner_priceRef)}}>
            Place Bid
          </Button></>}
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <MyBasicPopover
          icon={<Add />}
          title="add to your wishlist"
          text={"Added to your wishlist"}
          function={ () => {
            if(enable.AddtoWishList)
            setAddtoWishlist(true);
             }}>
             </MyBasicPopover>  
        <MyBasicPopover
          icon={<Share />}
          title="copy link"
          text={"copied link to clipboard"}
        ></MyBasicPopover>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {" "}
          <Tooltip title="show more">
            <ExpandMoreIcon />
          </Tooltip>
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
export default (Item);
