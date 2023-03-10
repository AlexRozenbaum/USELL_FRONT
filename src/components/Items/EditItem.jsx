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
  import {  Close, Send } from "@mui/icons-material";
  import { useRef, useState } from "react";
  import { useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { upload } from "../../../services/CloudService/cloudServicetoNode";
  import { useParams } from "react-router";
  import Loading from "../../Loading/Loading";
  import React from 'react';
  import {  Controller, useForm } from "react-hook-form";
  import { doApiGet } from "../../../services/ApiService/ApiService";
  import { API_URL } from "../../../utils/constants/url.constants";
  import itemStore from "../../../store/itemStore/itemStore";
  import { observer } from "mobx-react";
  import categoryStore from "../../../store/categoryStore/categoryStore";
  import { toJS } from "mobx";
  let item={}
  let all_categories=[]
  const EditItem = () => {
    const [start, setStart] = useState(true);
    const {id} = useParams();
  
    const getData = async () => {
      console.log('getting data');
       await (itemStore.fetchItem(id));
       await categoryStore.fetchCategories();
       item=itemStore.item;
        all_categories=toJS(categoryStore.categories);
        console.log(all_categories)
      setStart(false);
  };
    useEffect (() => {
      if (start === true) 
      getData();
      console.log('mounted');
      return () => console.log('unmounting...');
      
    }, []);
    
  
  
  
    const [selectedFile, setSelectedFile] = useState();
    const [category, setCategory] = useState(item.category_url);
    const [HAND, setHAND] = useState(item.hand);
    const nameRef = useRef();
    const phoneRef = useRef();
    const infoRef = useRef();
    const locationRef = useRef();
    const start_priceRef = useRef();
    const handRef = useRef();
    const categoryRef = useRef();
    const navigate = useNavigate();
    const { control } = useForm();
    const handleClose = () => {
      setTimeout(() => {
      }, 2000);
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
      const hand = handRef.current.value;
      const category_url = categoryRef.current.value;
      const item_lot = null;
      const days = null;
      const bodyData = {
        name,
        phone,
        info,
        location,
        start_price,
        hand,
        category_url,
        item_lot,
        days,
        user_nickname: item.user_nickname,
        img_url: item.img_url,
      };
      console.log(bodyData)
      await itemStore.updateItem(item._id, bodyData);
      if (selectedFile) {
        await upload(selectedFile, "items_preset", item._id);
      }
      setTimeout(() => {
        navigate("/user/myitems");
      }, 2000);
      
    };
    return (
     <React.StrictMode> {(Object.keys(item).length === 0)?<Loading/>:
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
         
         
              <InputLabel id="LabelHand">Hand</InputLabel>
              <Select
                labelId="LabelHand"
                id="hand"
                required
                fullWidth
                value={HAND}
               
                label="Hand"
                name="hand"
                defaultValue={item.hand}
                inputRef={handRef}
              > <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
               </Select>
               
          
            <Divider />
         
              <InputLabel id="LabelCategory">Category</InputLabel>
              <Select
                id="category_url"
                required
                fullWidth
                value={category}
                defaultValue={item.category_url}
                inputRef={categoryRef}
                label="Category"
                name="category_url"
               > {all_categories.map((ITEM) => {
                  return (
                    <MenuItem key={ITEM._id} value={ITEM.category_url}>
                      {ITEM.name}
                    </MenuItem>
                  );
                })}</Select>
            
            
         
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
      </Dialog>}</React.StrictMode>
    );
  };
  
  export default observer(EditItem);
  