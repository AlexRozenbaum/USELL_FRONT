import { Category, Group } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import moment from 'moment';
import usersStore from '../../../store/UsersStore/UsersStore';
import categoryStore from '../../../store/categoryStore/categoryStore';
import {observer } from 'mobx-react';
import { toJS } from 'mobx';
import { useNavigate } from 'react-router-dom';

const Main = ({ setSelectedLink, link }) => {
  useEffect(() => {
     setSelectedLink(link);
    usersStore.fetchUsers();
    categoryStore.fetchCategories();
  }, []);
  const users=toJS(usersStore.users);
  const categories=toJS(categoryStore.categories);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }} onClick={() => {
    navigate ('users');
  }}>
        <Typography variant="h4">Total Users</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 } } onClick={() => {
    navigate ('categories');
  }}>
        <Typography variant="h4">Total Categories</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Category sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{categories.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
        <Box>
          <Typography>Recently added Users</Typography>
          <List>
            {users.map((user, i) => (
              <Box key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.img_url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={`Time Created: ${moment(user?.date_created).format(
                      'YYYY-MM-DD H:mm:ss'
                    )}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Recently added Categories</Typography>
          <List>
            {categories.map((category, i) => (
              <Box key={category.category_url}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={category?.name}
                      src={category?.img_url}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={category?.name}
                    secondary={`Added: ${moment(category?.date_created).format(
                        'YYYY-MM-DD H:mm:ss'
                      )}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default observer(Main);