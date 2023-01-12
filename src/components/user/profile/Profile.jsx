import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { Close, Send } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { upload } from "../../../services/CloudService/cloudServicetoNode";
import DateService from "../../../services/DateService/DateService";
import alertStore from "../../../store/alertStore/alertStore";
import React from "react";
import { API_URL } from "../../../utils/constants/url.constants";
import { doApiMethod } from "../../../services/ApiService/ApiService";
import { USER_KEY } from "../../../utils/constants/url.constants";
const user = JSON.parse(localStorage.getItem(USER_KEY));
const Profile = () => {
  const [start, setStart] = useState(true);
  useEffect(() => {
    if (start === true) console.log("mounted");
    return () => console.log("unmounting...");
  }, [start]);
  const [selectedFile, setSelectedFile] = useState();
  const nameRef = useRef();
  const phoneRef = useRef();
  const birth_dateRef = useRef();
  const infoRef = useRef();
  const locationRef = useRef();
  const nicknameRef = useRef();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
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
    const bodyData = {
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      birth_date: birth_dateRef.current.value,
      info: infoRef.current.value,
      location: locationRef.current.value,
      nickname: nicknameRef.current.value,
    };
    updateUser(bodyData);
    if (selectedFile) {
      await upload(selectedFile, "users_preset","");
    }
  };
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>
        Profile
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
            You can update your profile by updating these fields:
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
            defaultValue={user.name}
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="text"
            fullWidth
            disabled
            defaultValue={user.email}
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
            defaultValue={user.phone}
          />
          <TextField
            id="birth_date"
            label="Birthday"
            type="date"
            inputRef={birth_dateRef}
            defaultValue={DateService(user.birth_date)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="info"
            label="Info"
            type="text"
            fullWidth
            inputRef={infoRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={user.info}
          />
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
            defaultValue={user.location}
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="nickname"
            label="Nickname"
            type="text"
            fullWidth
            inputRef={nicknameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={user.nickname}
          />
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={selectedFile ? selectedFile : user.img_url}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default observer(Profile);
