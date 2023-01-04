import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import { API_URL } from '../../../utils/constants/url.constants';
import { doApiMethod } from '../../../services/ApiService/ApiService';
import { useForm } from "react-hook-form";
import MyAlert from '../../../MyAlert/MyAlert';
import { useEffect } from 'react';
import alertStore from '../../../store/alertStore/alertStore';
import { toJS } from 'mobx';

const theme = createTheme();

export default function RegistrationForm() {
  const state=(toJS(alertStore.state))
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  useEffect(() => {
     
  }, []);
  const navigate = useNavigate();
   const onSubmit = async () => {
    const bodyData={
      name:getValues('name'),
      email:getValues('email'),
      password: getValues('password') ,
      phone: getValues('phone'),
      birth_date: getValues('Date'),
      location:  getValues('location'),
      info:  getValues('info'),
      nickname: getValues('nickname'),
      img_url:''
    };
      let url = API_URL + "/users"
      try {
        let resp = await doApiMethod(url,"POST",bodyData);
        console.log(bodyData)
        alertStore.set("Welcome", `${resp.data.user.name} Welcome to U SELL!`, true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      catch (err) {
        console.log(err.response);
      //  setAlerts({title:'Error',message:'Something Wrong Error'})
      }
    }
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
      <Container component="main" maxWidth="xs">
      {state&&<MyAlert/>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  {...register("name", {
                    required: "Required field",
                     minLength: {value:2,
                     message:"At least 2 characters"}
                  })}
                  error={!!errors?.name}
                  helperText={errors?.name ? errors.name.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Required field",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Required field",
                    minLength: {value:2,
                      message:"At least 2 characters"}
                  })}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="new-phone"
                  {...register("phone", {
                    required: "Required field",
                    minLength: {value:9,
                    message:"At least 9 characters"}
                  })}
                  error={!!errors?.phone}
                  helperText={errors?.phone ? errors.phone.message : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Date"
                  label="BirthDate"
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"></InputAdornment>)
                  }}
                  type="Date"
                  id="Date"
                  autoComplete="new-date"
                  {...register("Date", {
                    required: "Required field",
                    minLength: 2
                  })}
                  error={!!errors?.Date}
                  helperText={errors?.Date ? errors.Date.message : null}
                />
              </Grid>
               <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="location"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  autoFocus
                  {...register("location", {
                    required: "Required field",
                    minLength: {value:2,
                      message:"At least 2 characters"}
                  })}
                  error={!!errors?.location}
                  helperText={errors?.location ? errors.location.message : null}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="info"
                  required
                  fullWidth
                  id="info"
                  label="Info about me"
                  autoFocus
                  {...register("info", {
                    required: "Required field",
                    minLength: {value:2,
                      message:"At least 2 characters"}
                  })}
                  error={!!errors?.info}
                  helperText={errors?.info ? errors.info.message : null}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="Nickname"
                  autoFocus
                  {...register("nickname", {
                    required: "Required field",
                    minLength: {value:2,
                      message:"At least 2 characters"}
                  })}
                  error={!!errors?.nickname}
                  helperText={errors?.nickname ? errors.nickname.message : null}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}