import {
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
import { upload } from "../../../services/CloudService/cloudServicetoNode";
import { useParams } from "react-router";
import Loading from "../../Loading/Loading";
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { doApiGet } from "../../../services/ApiService/ApiService";
import { API_URL } from "../../../utils/constants/url.constants";
const EditItem = () => {
  const [start, setStart] = useState(true);
  const {id} = useParams();
   const [item,setItem]= useState({})
   const [all_categories,setCategories]=useState([])
  const getData = async () => {
    console.log('getting data');
    let url = API_URL + "/categories/";
      let resp = await doApiGet(url);
      setCategories(resp.data);
      let url1 = API_URL + "/lots/byId/" + id;
      let resp1 = await doApiGet(url1);
      setItem(resp1.data);
    setStart(false);
};
  useEffect (() => {
    if (start === true) 
      getData();
    console.log('mounted');
    return () => console.log('unmounting...');
    
  }, [start]);
  
  const defaultHand=item.hand;
  const defaultCategory=item.category_url;

  const [selectedFile, setSelectedFile] = useState();
  const [category, setCategory] = useState(defaultCategory);
  const [HAND, setHAND] = useState(defaultHand);
  const nameRef = useRef();
  const phoneRef = useRef();
  const infoRef = useRef();
  const locationRef = useRef();
  const start_priceRef = useRef();
  const navigate = useNavigate();
  const { control } = useForm();
  const handleClose = () => {
    setTimeout(() => {
    }, 2000);
  };
  const handleChangeHand = (event) => {
    setHAND(event.target.value);
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
      hand:HAND,
      category_url: category,
      item_lot,
      days,
      user_nickname: item.user_nickname,
      img_url: item.img_url,
    };
    console.log(bodyData)
    //await itemStore.updateItem(item._id, bodyData);
    if (selectedFile) {
      await upload(selectedFile, "items_preset", item._id);
    }
    setTimeout(() => {
      
      navigate("/user/myitems");
    }, 2000);
    
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
            <Controller
              labelId="LabelHand"
              id="hand"
              required
              fullWidth
              value={HAND}
              control={control}
              label="Hand"
              name="hand"
              onChange={handleChangeHand}
              defaultValue={item.hand}
             render={({ field }) =>
              <Select labelId="LabelHand" { ...field }
            > <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
             </Select>}>
              </Controller>
          </FormControl>
          <Divider />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel id="LabelCategory">Category</InputLabel>
            <Controller
              id="category_url"
              required
              fullWidth
              value={category}
              defaultValue={item.category_url}
              control={control}
              label="Category"
              name="category_url"
              onChange={handleChangeCategory}
             render={({ field }) =>
              <Select labelId="LabelCategory" { ...field }
             > {all_categories.map((ITEM) => {
                return (
                  <MenuItem key={ITEM._id} value={ITEM.category_url}>
                    {ITEM.name}
                  </MenuItem>
                );
              })}</Select>}>
              </Controller>
            
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

export default (EditItem);
