import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton, Menu } from "@mui/material";
import { Delete, MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useEffect } from "react";
import AlertDialog from "../AlertDialog/AlertDialog"
const ITEM_HEIGHT = 48;
 function IconMenu({enable, setEdit,
  setDeletefromWishlist, setDeletefromLotlist,
  setDeletefromMyitems}) {
  useEffect(() => {
  }, []);
  let {
    PlaceBid,
    Edit,
    DeletefromMyitems,
    DeletefromLotlist,
    AddtoWishList,
    DeletefromWishList,
  } = enable;
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
            width: "30ch",
          },
        }}
      >
       
          {Edit&&<MenuItem>
            <ListItemIcon>
                
             <AlertDialog  icon={<Edit/>} question={"Do you want to Edit?"} answer={setEdit}/>
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>}
        {DeletefromMyitems&&<MenuItem>
          <ListItemIcon  
              >
            <AlertDialog  icon={<Delete/>} question={"Do you want to delete from your items?"} answer={setDeletefromMyitems}/>
          </ListItemIcon>
          <ListItemText>Delete from My Items</ListItemText>
        </MenuItem>}
        {DeletefromLotlist&&<MenuItem>
          <ListItemIcon  
              >
                 <AlertDialog  icon={<Delete/>}  question={"Do you want to delete from your lotlist?"} answer={setDeletefromLotlist}/>
          </ListItemIcon>
          <ListItemText>Delete from Lotlist</ListItemText>
        </MenuItem>}
        {DeletefromWishList&&<MenuItem>
          <ListItemIcon  
              >
                 <AlertDialog   icon={<Delete/>}  question={"Do you want to delete from your wishlist?"} answer={setDeletefromWishlist}/>
          </ListItemIcon>
          <ListItemText>Delete from Wishlist</ListItemText>
        </MenuItem>}
      </Menu>
    </div>
  );
}
export default observer(IconMenu)