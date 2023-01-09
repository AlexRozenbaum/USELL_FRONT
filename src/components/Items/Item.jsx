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
import React, { useEffect, useState } from "react";
import myImage from "../../assets/photos/undefined.jpg";
import IconMenu from "../IconMenu/IconMenu";
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
function Item({ item ,actions}) {
  const Item = item;
  const [start, setStart] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const getData = async () => {
    console.log("getting data");
    setStart(false);
    useEffect(() => {
      if (start === true) {
        getData();
        console.log("mounted Item");
      }
      return () => console.log("unmounting... Item");
    }, []);
  };
  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
            {Item.name}
          </Avatar>
        }
        action={ <IconMenu actions={actions} id={Item._id}/>}
        title={Item.name}
        subheader={"published " + DateService(Item.date_created)}
      />
      <CardMedia
        component="img"
        height={"250"}
        image={Item.img_url ? Item.img_url : myImage}
        alt={Item.name}
      />
      <CardContent>
        Category:{}
        Info: {Item.info}
        Start Price:{Item.start_price} ₪ Last Bid:{Item.winner_price} ₪ 
        Timeleft to buy:
        <CalculateTimeLeft date_expired={Item.date_expired} />
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          Location:{Item.location}
          Hand: {Item.hand}
          Phone: {Item.phone}
          Nickname:{Item.user_nickname}
          The winner bid:{Item.winner_price}
          The winner:{Item.winner_user_id}
          <Button variant="contained" size={"large"} align="right">
            Place Bid
          </Button>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <MyBasicPopover
          icon={<Add />}
          title="add to your wishlist"
          text={"Added to your wishlist"}
        ></MyBasicPopover>
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
        > <Tooltip title="show more">
        <ExpandMoreIcon/></Tooltip>
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
export default Item;
