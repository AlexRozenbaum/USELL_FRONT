import {
    ChevronLeft,
    Dashboard,
    Logout,
    PeopleAlt,
    Category
  } from '@mui/icons-material';
  import {
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Tooltip,
    Typography,
  } from '@mui/material';
  import MuiDrawer from '@mui/material/Drawer';
  import { useMemo, useState } from 'react';
  import { Route, Routes, useNavigate } from 'react-router-dom';
import alertStore from '../../../store/alertStore/alertStore';
import authStore from '../../../store/authStore/authStore';
import userStore from '../../../store/userStore/userStore';
import CategoryList from '../CategoryList/CategoryList';
import Main from '../Main/Main';
import UserList from '../UserList/UserList';
import React from 'react';
  const drawerWidth = 240;
  
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));
  
  const SideList = ({ open, setOpen }) => {
    const user=userStore.user;
    const [selectedLink, setSelectedLink] = useState('');
  
    const list = useMemo(
      () => [
        {
          title: 'Main',
          icon: <Dashboard />,
          link: '',
           component: <Main {...{ setSelectedLink, link: '' }} />,
        },
        {
          title: 'Categories',
          icon: <Category />,
          link: 'categories',
          component: <CategoryList {...{ setSelectedLink, link: '' }} />,
        },
        {
          title: 'Users',
          icon: <PeopleAlt />,
          link: 'users',
           component: <UserList {...{ setSelectedLink, link: '' }} />
        },
      ],
      []
    );
  
    const navigate = useNavigate();
  
    const handleLogout = () => {
      alertStore.set('','',false);
      userStore.deleteUser();
      authStore.deleteAuth();
      navigate('/');
    };
    return (
      <>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeft />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {list.map((item) => (
              <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(item.link)}
                  selected={selectedLink === item.link}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
            <Tooltip title={user.name || ''}>
              <Avatar
                src={user.img_url}
                {...(open && { sx: { width: 100, height: 100 } })}
              />
            </Tooltip>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            {open && <Typography>{user.name}</Typography>}
            <Typography variant="body2">{user.role || 'role'}</Typography>
            {open && (
              <Typography variant="body2">{user.email}</Typography>
            )}
            <Tooltip title="Logout" sx={{ mt: 1 }}>
              <IconButton onClick={handleLogout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            {list.map((item) => (
              <Route key={item.title} path={item.link} element={item.component} />
            ))}
          </Routes>
        </Box>
      </>
    );
  };
  
  export default SideList;