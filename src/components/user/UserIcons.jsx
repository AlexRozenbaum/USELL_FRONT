import {
  AddCircle,
  Dashboard,
  ShoppingBag,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import authStore from "../../store/authStore/authStore";
import userStore from "../../store/userStore/userStore";


const UserIcons = () => {
const  user=(userStore.user);

let lotlist='';
let wishlist='';
  useEffect(() => {
authStore.checkUser();
      console.log("Toolbar hi from useEffect")
  }, []);
const authAdmin=authStore.authAdmin;
const authUser=authStore.authUser;
const auth=authStore.auth;
if(authUser)
{
 lotlist=user.lotlist.length;
 wishlist=user.wishlist.length;
}
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const navigate = useNavigate();
  return (
    <>{auth&&
    <Box>
      {authUser&&
        <>
          <Tooltip title="Check your lotlist and bids">
            <IconButton size="large" color="inherit">
              <Badge badgeContent={lotlist}>
                <ShoppingBag onClick={() => navigate("/user/mylotlist")} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Check your wishlist">
            <IconButton size="large" color="inherit">
              <Badge badgeContent={wishlist}>
                <ShoppingCart onClick={() => navigate("/user/mywishlist")} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Add item for sell">
            <IconButton size="large" color="inherit">
              <Badge>
                <AddCircle onClick={() => navigate("/user/additem/")} />
              </Badge>
            </IconButton>
          </Tooltip>
        </>}
          {authAdmin&& 
            <Tooltip title="Admin Dashboard">
              <ListItemIcon>
                <Dashboard
                  fontSize="small"
                  onClick={() => navigate("/admin/dashboard/")}
                />
              </ListItemIcon>
            </Tooltip>
          }
       
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={user?user.img_url:''} alt={user?user.name:''}>
            {user?user.name:''}
          </Avatar>
        </IconButton>
      </Tooltip>
      {<UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />}
    </Box>}</>
  );
};

export default observer(UserIcons);
