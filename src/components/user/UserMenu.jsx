import { Dashboard, Logout, Password, Settings, Work } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../../store/userStore/userStore';
import { observer } from 'mobx-react';
import authStore from '../../store/authStore/authStore';
import { toJS } from 'mobx';
import alertStore from '../../store/alertStore/alertStore';
const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };
  useEffect(() => {
    authStore.checkUser();
   },[]);

   const authAdmin=(toJS(authStore.authAdmin)=== "true");
   const authUser= (toJS(authStore.authUser)=== "true");
   const auth= authAdmin || authUser ;
const navigate = useNavigate();

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {auth && (
          <MenuItem
             onClick={() =>
                navigate ('/user/profile')
             }
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>  
        )}
        {
          auth && (
            <MenuItem
            onClick={() =>
               navigate ('/user/changepassword')
            }
         >
           <ListItemIcon>
             <Password fontSize="small" />
           </ListItemIcon>
           Change Password
         </MenuItem>
          )
        }
        {authAdmin &&( <MenuItem onClick={() =>
                navigate ('/admin/dashboard')
             }>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem> )}
        {authUser &&( <MenuItem onClick={() =>
                navigate ('/user/myitems')
             }>
          <ListItemIcon>
            <Work fontSize="small" />
          </ListItemIcon>
          My items
        </MenuItem> )}
        
        {auth &&( <MenuItem
           onClick={() => {alertStore.set('','',false);userStore.deleteUser();authStore.deleteAuth();navigate('/');}
           }
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>)}
      </Menu>
    </>
  );
};

export default  observer (UserMenu);