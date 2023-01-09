import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { doApiMethod } from "../../../services/ApiService/ApiService";
import {
  API_URL,
  LOGGINED_ADMIN,
  LOGGINED_USER,
  TOKEN_KEY,
} from "../../../utils/constants/url.constants";
import userStore from "../../../store/userStore/userStore";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import MyAlert from "../../../MyAlert/MyAlert";
import { useEffect } from "react";
import alertStore from "../../../store/alertStore/alertStore";
import { toJS } from "mobx";

const theme = createTheme();

function LoginForm() {
  const state=(toJS(alertStore.state))
  useEffect(() => {
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const bodyData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    doApiForm(bodyData);
  };
  const doApiForm = async (bodyData) => {
    const url = API_URL + "/users/login";

    try {
      const { data } = await doApiMethod(url, "POST", bodyData);
      // לשמור את הטוקן
      userStore.setUser (data.userclone._doc);
      localStorage.setItem(TOKEN_KEY, data.token);
      const user = toJS(userStore.user);
       console.log(user.activateLink==='')
      if (user.active===false&&user.activateLink!=='') 
      {
        alertStore.set('NOT ACTIVATED','Activate your link in mail and sign in after this ', true);
      }
      if (user.active===false&&user.activateLink==='') 
      {
        alertStore.set('BANNED','You banned ,contact administrators', true);
      }
      if (user.role === "user" && user.active) 
        {
          localStorage.setItem(LOGGINED_USER, true);
          alertStore.set("Welcome", `${user.name} Welcome to U SELL!`, true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
        if (user.role === "admin" && user.active) {
          localStorage.setItem(LOGGINED_ADMIN, true);
          alertStore.set("Welcome", `${user.name} Welcome to U SELL!`, true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
         
        }
      
    } catch (err) {
      if(err)
      alertStore.set("Error", `User or password wrong, or service down!`, true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {state&&<MyAlert/>}
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default observer(LoginForm);
