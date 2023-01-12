import { Dashboard, Logout, Password, Settings, Work } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import authStore from '../../store/authStore/authStore';
const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };
  const authAdmin=authStore.authAdmin;
const authUser=authStore.authUser;
const auth=authStore.authUser;
  useEffect(() => {
    authStore.checkUser();
  }, [auth]);
  

const navigate = useNavigate();
  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {auth&& (
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
           onClick={() => {navigate('/');authStore.deleteAuth();}
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