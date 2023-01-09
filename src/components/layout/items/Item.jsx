import { Add,  Share } from "@mui/icons-material";
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
  Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toJS } from "mobx";
import { useEffect, useRef, useState } from "react";
import { doApiMethod } from "../../../services/ApiService/ApiService";
import DateService from "../../../services/DateService/DateService";
import userStore from "../../../store/userStore/userStore";
import { API_URL } from "../../../utils/constants/url.constants";
import CalculateTimeLeft from "../../CalculateTimeLeft/CalculateTimeLeft";
import IconMenu from "../../IconMenu/IconMenu";
import MyBasicPopover from "../../MyBasicPopover/MyBasicPopover";
import { observer } from "mobx-react";
import myImage from "../../../assets/photos/undefined.jpg"
import { styled } from '@mui/material/styles';
import alertStore from "../../../store/alertStore/alertStore";
import React from "react";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

  
 function  Item  (props)  {
  const state=(toJS(alertStore.state))
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let user=toJS(userStore.user);

  useEffect(() => {
  }, [user,state]);
  const item=props.item;
  const winner_priceRef = useRef();
  const MIN_BID=(item.winner_price==null?item.start_price:item.winner_price)
  const handleOnInput = (e) => {
    if
   ( e.target.value<MIN_BID)
    e.target.value=MIN_BID
};
if(user)
{console.log("word")}
  let defaultwinner='';
 if((item.winner_price===null)&&(user._id===item.user_id))
  {defaultwinner='NO ONE YET';}
  if((item.winner_price===null)&&(user._id!==item.user_id))
 {defaultwinner='YOU CAN BE FIRST';} 
  if((item.winner_price!==null))
   {defaultwinner=item.winner_price;}
  const PlaceBid =async(e) =>
   {
    e.preventDefault();
    if (user._id!==item.user_id)
    {
     
    const winner_price=winner_priceRef.current.value;
    const winner_user_id=user._id;
    const bodyData= {winner_user_id:winner_user_id,winner_price:winner_price}
    let url = API_URL+"/lots/bid/"+item.id;
    const index = userStore.user.lotlist.findIndex((e) => e.item_id === item.id);
            try{
              let resp = await doApiMethod(url,"PATCH",bodyData)
              console.log(resp)
              if (index === -1) {
                userStore.user.lotlist.push({item_id:item.id,bid:winner_price});
                await userStore.updateUser();
                props.render(true);
                alertStore.set('MESSAGE','Added to your lotlist', true);
              } else {
                userStore.user.lotlist[index].bid = winner_price;
                await userStore.updateUser();
                props.render(true);
                alertStore.set('MESSAGE','Added to your lotlist', true);
              }
            }
            catch(err){
              console.log(err.response);
              alertStore.set('MESSAGE','There problem, or you must be a user ', true);

            }
            }
        }
   
  const DeleteItem = async()=>{
  let url = API_URL + "/lots/"+item.id;
  try {
    let resp = await doApiMethod(url,"delete");
    if (resp.data) {
      alertStore.set('MESSAGE','Deleted successfully', true);
      props.render(true);
    } else {
      alertStore.set('MESSAGE','There problem , try again later', true);
    }
  } catch (err) {
    console.log(err);
    alertStore.set('MESSAGE','There problem , try again later', true);
  }
};
 const DeleteItemFromWishlist= async()=>{
  props.render(true);
    userStore.user.wishlist.remove(item._id)
    userStore.updateUser();
};
return(
    <Card sx={{ margin: 5 }}  >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "black" }} aria-label="recipe">
            {item.name.slice(0,1)}
          </Avatar>
        }
        action={props.authUser&&
          <>
            {(item.item_lot===false ||item.item_lot===null) && item.user_id=== (user?user._id:false)&&<IconMenu editId={item._id} delete={DeleteItem} question={"Delete item?"}/>}
            {((item.item_lot===true&&(item.winner_user_id!==user._id))||(item.item_lot===false))&&(user?(userStore.user.wishlist.includes(item._id)):false)&& <IconMenu delete={DeleteItemFromWishlist} question={"Delete item from wishlist?"}/> }
        </>
        }
        title={item.name}
        subheader={"published " + DateService(item.date_created)+`${user._id===item.user_id?" MY ITEM": ""}`} 
      />
      <CardMedia
        component="img"
        height={item.item_lot?"212":"360"}
        image={item.img_url?item.img_url:myImage}
        alt={item.name}
      /><CardContent>
        <Box  display={'flex'}   alignContent={'center'} alignItems={'center'} align="left" >
        
        <Typography fontWeight={"Bold"} style={{display: 'inline-block'}}> Category:</Typography>
         <Typography style={{display: 'inline-block'}}> {item?item.categories[0].name:""}
        </Typography>
         {
          <Avatar sx={{display: 'inline-block',marginLeft:2}} src= {item?item.categories[0].img_url:""}>
          </Avatar>
        }
        </Box>
        <Box>
        <Box  align="left"   >
         <Typography fontWeight={"Bold"} style={{display: 'inline-block'}} >
        Info:</Typography> <Typography style={{display: 'inline-block'}}>{item.info}</Typography> 
        </Box>
        <Box  align="left" >
         <Typography fontWeight={"Bold"}  style={{display: 'inline-block'}}>
        Start Price:</Typography><Typography fontStyle="italic" variant="h5" style={{display: 'inline-block'}}>{item.start_price} ₪</Typography>  
        </Box>
        {item.item_lot&& <Box  align="left" >
         <Typography fontWeight={"Bold"}  style={{display: 'inline-block'}}>
        Last Bid:</Typography><Typography fontStyle="italic" variant="h5" style={{display: 'inline-block'}}>{item.winner_price} ₪</Typography>  
        </Box>}</Box>
       {item.item_lot&&
        <Box  align="left" sx={{ mt: 2 }}>
          <Typography fontWeight={"Bold"} fontStyle="italic" variant="body3" style={{display: 'inline-block'}} >
          Timeleft to buy:</Typography><CalculateTimeLeft date_expired={item.date_expired} /> 
          </Box>
          }
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Box  align="left" >
        <TextField id="filled-basic"  fullWidth  InputProps={{
            readOnly: true,
          }}label={ <Typography fontWeight={"Bold"}  >
        Location:</Typography>} variant="filled" defaultValue= {item.location}/>
        </Box>
        <Box  align="left" >
        <TextField id="filled-basic" fullWidth   InputProps={{
            readOnly: true,
          }}label={ <Typography fontWeight={"Bold"}  >
        Hand:</Typography>} variant="filled" defaultValue= {item.hand}/>
        </Box>
        <Box  align="left" >
        <TextField id="filled-basic"  fullWidth  InputProps={{
            readOnly: true,
          }}label={ <Typography fontWeight={"Bold"}  >
        Phone:</Typography>} variant="filled" defaultValue= {item.phone}/>
        </Box>
        <Box  align="left" >
        <TextField id="filled-basic" fullWidth  InputProps={{
            readOnly: true,
          }} label={ <Typography fontWeight={"Bold"}  >
        Nickname:</Typography>} variant="filled" defaultValue= {item.user_nickname} />
        </Box>
          {item.item_lot &&
          <>
          <Box align="left"  >
          <TextField id="filled-basic" fullWidth  InputProps={{
            readOnly: true,
          }} label={ <Typography fontWeight={"Bold"}  >
        The winner bid:</Typography>} variant="filled" fontStyle="italic" defaultValue={defaultwinner} />
        </Box>
        {user._id!==item.user_id&&(props.authUser)&&
          < Box  align="left" >
          <TextField id="filled-basic" fullWidth  InputProps={{
            readOnly: true,
          }} label={<Typography fontWeight={"Bold"}   >
          The winner:</Typography>}  variant="filled" fontStyle="italic"defaultValue={user._id===item.winner_user_id?"YOU":"Somebody bet bigger bit"}/>
          <TextField  type="number" 
       inputRef={winner_priceRef}  defaultValue={MIN_BID} size={"small"} inputProps={{ min: (MIN_BID),step:1 ,onInput: handleOnInput}} />      
        <Button variant="contained" size={"large"} align="right" onClick={PlaceBid}>Place Bid</Button>
        </Box>}
          </>
          }  
      </CardContent></Collapse>
      <CardActions disableSpacing>
      <MyBasicPopover icon={<Add/>}  title="add to your wishlist" function={ () => {
        if (userStore.user.wishlist.indexOf(item._id) === -1 && user._id!==item.user_id)
        {
        userStore.user.wishlist.push(item._id);
        userStore.updateUser();
        alertStore.set('MESSAGE','Added to your wishlist', true);
        }
        else
        alertStore.set('MESSAGE','Already in your wishlist or you owner', true);
  }} text={"Added to your wishlist"}>
  </MyBasicPopover>
        <MyBasicPopover icon={<Share/>}  title="copy link" function={async () => {
    await navigator.clipboard.writeText(API_URL+"/lots/byId/"+item._id);
  }} text={"copied link to clipboard"}>
  </MyBasicPopover>
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
           more info
          </ExpandMore>
          
      </CardActions>
    </Card>
  );
};
export default observer(Item)