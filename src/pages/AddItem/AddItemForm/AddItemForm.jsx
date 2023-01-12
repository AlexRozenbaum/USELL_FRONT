import { Box, Button, Container, createTheme, CssBaseline, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { doApiMethod } from "../../../services/ApiService/ApiService";
import { upload } from "../../../services/CloudService/cloudServicetoNode";
import categoryStore from "../../../store/categoryStore/categoryStore";
import { API_URL, USER_KEY } from "../../../utils/constants/url.constants";
import { ONE_DAY, ONE_WEEK, THREE_DAYS } from "../../../utils/time.constants";
import myImage from "../../../assets/photos/undefined.jpg"
import { toJS } from "mobx";
const theme = createTheme();
const user=localStorage.getItem(USER_KEY)
function AddItem() {
    useEffect(() => {
        categoryStore.fetchCategories(); 
      }, []);
  const categories = toJS(categoryStore.categories);
  const navigate = useNavigate();
  const [hand, setHand] = useState('');
  const [category, setCategory] = useState('');
  const [item_lot, setItemLot] = useState('false');
  const [days, setDateExpired] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    } = useForm(); 
  const handleChangeHand = (event) => {
     setHand(event.target.value);
    }
  const handleChangeCategory = (event) => {
   setCategory(event.target.value);
 };
 const handleChangeItemLot = (event) => {
    setItemLot(event.target.value);
  };
  const handleChangeDateExpired = (event) => {
    setDateExpired(event.target.value);
  };
  const handleChangePhoto =(e) => {
    const file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend =  function () {
        setSelectedFile(reader.result)
      };
      reader.onerror = function (error) {
          console.log('Error: ', error);
      }
  };
  const onSubmit = () => {
    const bodyData = {
      name: getValues("name"),
      info: getValues("info"),
      hand: hand,
      category_url:category,
      location: getValues("location"),
      phone: getValues("phone"), 
      start_price:getValues("start_price"),
    item_lot:item_lot,
     days:days,
      user_nickname:user.nickname,
      img_url:''
    };
    doApiForm(bodyData);
  };
  const doApiForm = async (bodyData) => {
    const url = API_URL + "/lots";
    try {
      const resp = await doApiMethod(url, "POST", bodyData);
      if(selectedFile)
      { await upload(selectedFile,"items_preset",resp.data._id)}
  setTimeout(()=> {navigate('/user/myitems')},1000);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
            inputProps={{
                minLength: 2
              }}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              {...register("name", {
                required: "Required field",
                 minLength: {value:2,
                 message:"At least 2 characters"}
              })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              minLength={2}
              id="info"
              label="Info"
              name="info"
              {...register("info", {
                required: "Required field",
                 minLength: {value:2,
                 message:"At least 2 characters"}
              })}
              error={!!errors.info}
              helperText={errors.info ? errors.info.message : null}
            />
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
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            <InputLabel id="LabelCategory">Category</InputLabel>
            <Select
              labelId="LabelCategory"
              id="category_url"
              required
              fullWidth
              value={category}
              label="Category"
              name="category_url"
              onChange={handleChangeCategory}
            >
                {categories.map((item) => {
        return (       
            <MenuItem  key={item._id} value={item.category_url}>
             {item.name}
          </MenuItem>
        );
      })}
            </Select>
            <TextField
              margin="normal"
              required
              fullWidth
              minLength={1}
              id="start_price"
              label="Price"
              name="start_price"
              {...register("start_price", {
                required: "Required field",
                 minLength: {value:1,
                 message:"At least 1 characters"}
              })}
              error={!!errors.start_price}
              helperText={errors.start_price ? errors.start_price.message : null}
            />
            <InputLabel id="ItemLot">Sell as</InputLabel>
              <Select
              labelId="ItemLot"
              id="itemlot"
              required
              fullWidth
              value={item_lot}
              label="ItemLot"
              name="itemlot"
              onChange={handleChangeItemLot}
            >
              <MenuItem value={false}>Regular Item</MenuItem>
              <MenuItem value={true}>Sell as Lot</MenuItem>
            </Select>
            {item_lot===true &&
            (<>
            <InputLabel id="DateExpired">Date Expired</InputLabel>
              <Select
              labelId="DateExpired"
              id="days"
              required
              fullWidth
              value={days}
              label="days"
              name="days"
              onChange={handleChangeDateExpired}
            >
              <MenuItem value={ONE_DAY}>24 hours</MenuItem>
              <MenuItem value={THREE_DAYS}>3 days</MenuItem>
              <MenuItem value={ONE_WEEK}>1 week</MenuItem>
            </Select></>)}
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              autoFocus={true}
              {...register("location", {
                required: "Required field",
                 minLength: {value:2,
                 message:"At least 2 characters"}
              })}
              error={!!errors.location}
              helperText={errors.location ? errors.location.message : null}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              {...register("phone", {
                required: "Required field",
                 minLength: {value:8,
                 message:"At least 8 characters"}
              })}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : null}
            />
             <label htmlFor="itemPhoto">
              <input
                accept="image/*"
                id="itemPhoto"
                type="file"
                style={{ display: 'none' }}
                 onChange={handleChangePhoto}
              />
              <Box
               component="img"
                src={selectedFile?selectedFile: myImage}
                sx={{ width: 400, height: 400, cursor: 'pointer' }}
              />
            </label>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >
              Add Item
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default observer(AddItem);
