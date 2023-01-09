import { Dashboard, Logout, Password, Settings, Work } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };
  useEffect(() => {
   },[]);
const navigate = useNavigate();
  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {true&& (
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
          true && (
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
        {true &&( <MenuItem onClick={() =>
                navigate ('/admin/dashboard')
             }>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem> )}
        {true &&( <MenuItem onClick={() =>
                navigate ('/user/myitems')
             }>
          <ListItemIcon>
            <Work fontSize="small" />
          </ListItemIcon>
          My items
        </MenuItem> )}
        
        {true &&( <MenuItem
           onClick={() => {navigate('/');}
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