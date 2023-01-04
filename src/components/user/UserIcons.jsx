import { AddCircle, Dashboard, ShoppingBag, ShoppingCart } from '@mui/icons-material';
import { Avatar, Badge, Box, IconButton, ListItemIcon, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import userStore from '../../store/userStore/userStore';
import UserMenu from './UserMenu';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { toJS } from 'mobx';
import authStore from '../../store/authStore/authStore';
const UserIcons = () => {
  useEffect(() => {
    authStore.checkUser();
   },[]);
   const authAdmin=(toJS(authStore.authAdmin)=== "true");
   const authUser= (toJS(authStore.authUser)=== "true");
 const user=userStore.user;
const wishlength= user.wishlist.length ;
const lotlength= user.lotlist.length ;
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
const navigate=useNavigate();
  return (
    <Box>{authUser?<>
       <Tooltip title="Check your lotlist and bids">
      <IconButton size="large" color="inherit" >
        <Badge  badgeContent={lotlength?lotlength:""}>
          <ShoppingBag onClick={() =>
                navigate ('/user/mylotlist')
             }/>
        </Badge>
      </IconButton>
      </Tooltip>
      <Tooltip title="Check your wishlist">
      <IconButton size="large" color="inherit" >
        <Badge  badgeContent={wishlength?wishlength:""}>
          <ShoppingCart onClick={() =>
                navigate ('/user/mywishlist')
             }/>
        </Badge>
      </IconButton>
      </Tooltip>
      <Tooltip title="Add item for sell">
      <IconButton size="large" color="inherit">
        <Badge >
          <AddCircle onClick={() =>
                navigate ('/user/additem/')
             }/>
        </Badge>
      </IconButton>
      </Tooltip></>:<>
      {authAdmin&&
        <Tooltip title="Admin Dashboard"><ListItemIcon>
            <Dashboard fontSize="small" onClick={() =>
                navigate ('/admin/dashboard/')}  />
          </ListItemIcon>
          </Tooltip>}</>}
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={user.img_url} alt={user.name}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      {<UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} /> }
    </Box>
  );
};

export default observer (UserIcons);