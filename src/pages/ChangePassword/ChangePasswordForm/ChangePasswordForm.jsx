import {
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
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import React from "react";
import alertStore from "../../../store/alertStore/alertStore";
import { doApiMethod } from "../../../services/ApiService/ApiService";
import { API_URL, USER_KEY } from "../../../utils/constants/url.constants";
const ChangePasswordForm = () => {
  useEffect(() => {}, []);
  const currentPassRef = useRef();
  const newPass1Ref = useRef();
  const newPass2Ref = useRef();
  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };
  const user = JSON.parse(localStorage.getItem(USER_KEY));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentPassword = currentPassRef.current.value;
    const newPass1 = newPass1Ref.current.value;
    const newPass2 = newPass2Ref.current.value;
    if (newPass1 === newPass2) {
      const bodyData = {
        email: user.email,
        password: currentPassword,
        newpassword: newPass1,
      };
      changePassword(bodyData);
    }
    navigate("/");
  };
  const changePassword = async (bodyData) => {
    let url = API_URL.concat("/users/changepassword");
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData);
      if (resp.data) {
        alertStore.set("Message", "Password changed succesfully", true);
      } else {
        alertStore.set("Message", "There problem , try again later", true);
      }
    } catch (err) {
      console.log(err);
      alertStore.set("Message", "There problem , try again later", true);
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
          <DialogContentText>You can change your password</DialogContentText>
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
            id="currentPass"
            label="Current Password"
            type="password"
            fullWidth
            inputRef={currentPassRef}
            inputProps={{ minLength: 6 }}
            required
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="newPass1"
            label="New Password"
            type="password"
            fullWidth
            inputRef={newPass1Ref}
            inputProps={{ minLength: 6 }}
            required
          />
          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="newPass2"
            label="New Password Again"
            type="password"
            fullWidth
            inputRef={newPass2Ref}
            inputProps={{ minLength: 6 }}
            required
          />
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Change Password
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default observer(ChangePasswordForm);
