import "./App.css";
import React, { useEffect } from "react";
import RegistrationPage from "./pages/Registration/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/Login/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage/HomePage";
import { observer } from "mobx-react";
import DashBoard from "./components/admin/DashBoard/DashBoard";
import MyItemsPage from "./pages/MyItems/MyItemsPage/MyItemsPage";
import MyWishListPage from "./pages/MyWishList/MyWishListPage/MyWishListPage";
import MyLotListPage from "./pages/MyLotList/MyLotListPage/MyLotListPage";
import ChangePasswordPage from "./pages/ChangePassword/ChangePasswordPage/ChangePasswordPage";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage/ForgetPasswordPage";
import ProfilePage from "./pages/Profile/ProfilePage/ProfilePage";
import AddItemPage from "./pages/AddItem/AddItemPage/AddItemPage";
import EditItemPage from "./pages/EditItem/EditItemPage/EditItemPage";
import Layout from "./components/layout/layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<RegistrationPage/>}/>
          <Route path="/forgetpassword"element={<ForgetPasswordPage/>}/>
          <Route path="user">
                <Route path="profile"            element={<ProfilePage/>}/>
                <Route path="changepassword"     element={<ChangePasswordPage/>}/>
                <Route path="myitems"            element={<MyItemsPage/>}/>
                <Route path="mywishlist"         element={<MyWishListPage/> }/>
                <Route path="mylotlist"          element={<MyLotListPage/> }/>
                <Route path="myitems/edit/:id"   element={<EditItemPage />}/>
                <Route path="additem"            element={<AddItemPage/>} />
          </Route>
          <Route path="admin">
                <Route path="dashboard/*" element={<Layout children={<DashBoard />} />}> 
                     <Route path="categories"/>
                      <Route path="users" />
                      
                </Route>
          </Route>
          <Route path='*'   element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
