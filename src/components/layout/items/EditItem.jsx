import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { upload } from "../../../services/CloudService/cloudServicetoNode";
import itemStore from "../../../store/itemStore/itemStore";
import { useParams } from "react-router";
import categoryStore from "../../../store/categoryStore/categoryStore";
import { toJS } from "mobx";
import Loading from "../../Loading/Loading";
const EditItem = () => {
  const {id} = useParams();
  useEffect (() => {
    itemStore.fetchItem(id);
    categoryStore.fetchCategories();
  }, []);
  const all_categories = toJS(categoryStore.categories);
  const [selectedFile, setSelectedFile] = useState();
  const item = toJS(itemStore.item);

  const [category, setCategory] = useState(item.category_url);
  const [hand, setHand] = useState(item.hand);
  const nameRef = useRef();
  const phoneRef = useRef();
  const infoRef = useRef();
  const locationRef = useRef();
  const start_priceRef = useRef();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/user/myitems");
    itemStore.deleteItem();
  };
  const handleChangeHand = (event) => {
    setHand(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setSelectedFile(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const info = infoRef.current.value;
    const location = locationRef.current.value;
    const start_price = start_priceRef.current.value;
    const item_lot = null;
    const days = null;
    const bodyData = {
      name,
      phone,
      info,
      location,
      start_price,
      hand,
      category_url: category,
      item_lot,
      days,
      user_nickname: item.user_nickname,
      img_url: item.img_url,
    };
    itemStore.updateItem(item._id, bodyData);
    if (selectedFile) {
      await upload(selectedFile, "items_preset", item._id);
    }
    navigate("/user/myitems");
    itemStore.deleteItem();

  };
  return (
   <> {(Object.keys(item).length === 0)?<Loading/>:
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        Item Details
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your item by updating these fields:
          </DialogContentText>

          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="name"
            label="Name"
            type="text"
            fullWidth
            inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={item.name}
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="indo"
            label="Info"
            type="text"
            inputRef={infoRef}
            fullWidth
            defaultValue={item.info}
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            inputRef={phoneRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={item.phone}
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="LabelHand">Hand</InputLabel>
            <Select
              labelId="LabelHand"
              id="hand"
              required
              fullWidth
              value={hand}
              label="Hand"
              name="hand"
              onChange={handleChangeHand}
              defaultValue={item.hand}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <Divider />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="LabelCategory">Category</InputLabel>
            <Select
              labelId="LabelCategory"
              id="category_url"
              required
              fullWidth
              value={category }
              defaultValue={item.category_url}
              label="Category"
              name="category_url"
              onChange={handleChangeCategory}
            >
              {all_categories.map((ITEM) => {
                return (
                  <MenuItem key={ITEM._id} value={ITEM.category_url}>
                    {ITEM.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="location"
            label="Location"
            type="text"
            fullWidth
            inputRef={locationRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={item.location}
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="start_price"
            label="Start_price"
            type="number"
            fullWidth
            inputRef={start_priceRef}
            inputProps={{ minLength: 1 }}
            required
            defaultValue={item.start_price}
          />
          <label htmlFor="ItemPhoto">
            <input
              accept="image/*"
              id="ItemPhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Box
              component="img"
              src={selectedFile ? selectedFile : item.img_url}
              sx={{ width: 500, height: 500, cursor: "pointer" }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>}</>
  );
};

export default observer(EditItem);
