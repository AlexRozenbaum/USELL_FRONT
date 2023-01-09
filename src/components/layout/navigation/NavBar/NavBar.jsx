import React, { useEffect } from 'react';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Lock,  PersonAddAlt1 } from '@mui/icons-material';
import UserIcons from '../../../user/UserIcons';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import myLogo from "../../../../assets/photos/Usell.png"
const NavBar = () => {
  const navigate = useNavigate();
  useEffect(() => {
  },[]);
  return (
    <>
      <AppBar>
        <Container maxWidth="lg">   
          <Toolbar disableGutters>
          <img alt='logo'
                src={myLogo}
                sx={{ width:20, height:40, cursor: 'pointer',border: 0.6  }}
                onClick={() => navigate ('/')}
           />
            <Typography
              variant="h6"
              component="h1"
              noWrap
              justifyContent='center'
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
              onClick={() => navigate ('/')}
            >
              You     Are     Welcome    to      USELL
            </Typography>
            <Typography
              variant="h6"
              component="h1"
              noWrap
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              YRWtUsell
            </Typography>
            {true?
              <UserIcons />
            : <>
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => navigate ('/login')}
              >
                Login
              </Button>
                <Button
                color="inherit"
                startIcon={<PersonAddAlt1/>}
                onClick={() => navigate ('/signup')}
              >
                SignUp
              </Button>
              </>
            }
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default observer(NavBar);