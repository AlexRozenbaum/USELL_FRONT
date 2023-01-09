import "./App.css";
import React, { useEffect } from "react";
import RegistrationPage from "./pages/Registration/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/Login/LoginPage/LoginPage";
import Profile from "./components/user/profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage/HomePage";
import Layout from "./components/layout/layout";
import { observer } from "mobx-react";
import DashBoard from "./components/admin/DashBoard/DashBoard";
import AddItem from "./components/layout/items/AddItem";
import EditItem from "./components/layout/items/EditItem";
import MyItemsPage from "./pages/MyItems/MyItemsPage/MyItemsPage";
import MyWishListPage from "./pages/MyWishList/MyWishListPage/MyWishListPage";
import MyLotListPage from "./pages/MyLotList/MyLotListPage/MyLotListPage";
import ChangePasswordPage from "./pages/ChangePassword/ChangePasswordPage/ChangePasswordPage.jsx"
function App() {
  // useEffect(() => {
  //  },[]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Layout children={<LoginPage />} />} />
          <Route
            path="/signup"
            element={<Layout children={<RegistrationPage />} />}
          />
          <Route
            path="/forgetpassword"
            element={<ChangePasswordPage/>}
          />
          <Route path="user">
            <Route path="profile" element={<Layout children={<Profile />} />} />
            <Route
              path="changepassword"
              element={<ChangePasswordPage/>}
            />
            <Route
              path="myitems"
              element={<MyItemsPage/> 
              }
            />
            <Route
              path="mywishlist"
              element={<MyWishListPage/> }
            />
            <Route
              path="mylotlist"
              element={<MyLotListPage/> }
            />
            <Route
              path="myitems/edit/:id"
              element={<EditItem />}
            />
            <Route path="additem"  children={<AddItem />} />
          </Route>
          <Route path="admin">
            <Route
              path="dashboard"
              element={<Layout children={<DashBoard />} />}
            >
              <Route path="users" />
              <Route path="categories" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
