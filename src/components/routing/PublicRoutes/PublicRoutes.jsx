import {BrowserRouter, Route, Routes} from "react-router-dom"
import React from 'react'
import LoginPage from "../../../pages/Login/LoginPage/LoginPage"
import RegistrationPage from "../../../pages/Registration/RegistrationPage/RegistrationPage"
import HomePage from "../../../pages/Home/HomePage/HomePage"
export default function PublicRoutes() {
  return (
    <BrowserRouter>
    <Routes>
    <Route index element={<HomePage/>}/>
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signup' element={<RegistrationPage/>}/>
  </Routes>
  </BrowserRouter>
  )
}

