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

const UserIcons = () => {
  useEffect(() => {
  }, []);

  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const navigate = useNavigate();
  return (
    <>{true&&
    <Box>
      {true? (
        <>
          <Tooltip title="Check your lotlist and bids">
            <IconButton size="large" color="inherit">
              <Badge badgeContent={12}>
                <ShoppingBag onClick={() => navigate("/user/mylotlist")} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Check your wishlist">
            <IconButton size="large" color="inherit">
              <Badge badgeContent={10}>
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
        </>
      ) : (
        <>
          {true && (
            <Tooltip title="Admin Dashboard">
              <ListItemIcon>
                <Dashboard
                  fontSize="small"
                  onClick={() => navigate("/admin/dashboard/")}
                />
              </ListItemIcon>
            </Tooltip>
          )}
        </>
      )}
      <Tooltip title="Open User Settings">
        <IconButton onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
          <Avatar src={""} alt={10}>
            {10}
          </Avatar>
        </IconButton>
      </Tooltip>
      {<UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />}
    </Box>}</>
  );
};

export default observer(UserIcons);
