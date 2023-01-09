import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton, Menu } from "@mui/material";
import { Delete, MoreVert } from "@mui/icons-material";
import Edit from "@mui/icons-material/Edit";
import AlertDialog from "../AlertDialog/AlertDialog";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useEffect } from "react";
const ITEM_HEIGHT = 48;
 function IconMenu({actions,id}) {
  useEffect(() => {
  }, []);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "15ch",
          },
        }}
      >
       
          <MenuItem>
            <ListItemIcon
                onClick={
                 () =>navigate("/user/myitems/edit/"+id)}
              >
                <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        
        <MenuItem>
          <ListItemIcon  onClick={
                 () =>navigate("/user/myitems/delete/"+id)}
              >
            <Delete/>
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
           <AlertDialog/>
        </MenuItem>
      </Menu>
    </div>
  );
}
export default observer(IconMenu)