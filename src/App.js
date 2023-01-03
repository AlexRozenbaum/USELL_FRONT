
import './App.css';
import RegistrationPage from './pages/Registration/RegistrationPage/RegistrationPage';
import LoginPage from './pages/Login/LoginPage/LoginPage';
import Profile from './components/user/profile/Profile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage/HomePage';
import Layout from './components/layout/layout';
import ItemList from './components/layout/items/ItemList';
import { observer } from 'mobx-react';
import DashBoard from './components/admin/DashBoard/DashBoard';
import AddItem from './components/layout/items/AddItem';
import EditItem from './components/layout/items/EditItem';
import authStore from './store/authStore/authStore';
import userStore from './store/userStore/userStore';
import { toJS } from 'mobx';
import ChangePassword from './components/user/ChangePassword';
import ForgetPasswordPage from './pages/ForgetPassword/ForgetPasswordPage/ForgetPasswordPage';
function App() {
  const user=toJS(userStore.user);
  const authAdmin=(toJS(authStore.authAdmin)=== "true");
  const authUser=(toJS(authStore.authUser)=== "true");
  if(Object.keys(user).length === 0 && user.constructor === Object&&(authAdmin ||authUser))
  {userStore.refreshUser()}
  return (
    <>
    <BrowserRouter> 
    <Routes>
    <Route  index element={<HomePage authUser={authUser}/>}/>
    <Route path='/login' element={<Layout children={<LoginPage/>}/>} />
    <Route path='/signup' element={<Layout children={<RegistrationPage/>}/>}/>
    <Route path='/forgetpassword' element={<Layout children={<ForgetPasswordPage/>}/>}/>
        <Route path='user' >
             <Route path='profile' element={<Layout children={<Profile/>}/>}/>
              <Route path='changepassword' element={<Layout children={<ChangePassword/>}/>}/>
             <Route path='myitems' element={<Layout children={<ItemList authUser={authUser} myitems={true}/>}/>}/>
             <Route path='mywishlist' element={<Layout children={<ItemList authUser={authUser} wishlist={true}/>}/>}/>
             <Route path='mylotlist' element={<Layout children={<ItemList authUser={authUser} lotlist={true}/>}/>}/>
             <Route path='myitems/edit/:id' element={<Layout children={<EditItem/>}/>}/>
             <Route path='additem' element={<Layout children={<AddItem />}/>}/>
             
      </Route>
      <Route path='admin' >
             <Route path='dashboard' element={<Layout children={<DashBoard/>}/>}>
                      <Route path='users'/>
                      <Route path='categories'/>
             </Route>
      </Route>
         </Routes>
       </BrowserRouter>
       </>


  );
}

export default observer(App);
