import { BrowserRouter, Route,  Routes } from "react-router-dom"
import React from 'react'
import Profile from "../../user/profile/Profile"
import Layout from "../../layout/layout"
import ItemList from "../../layout/items/ItemList"
export default function UserRoutes() {
  return (  
    <BrowserRouter> 
    <Routes>
        <Route path='user' >
             <Route path='profile' element={<Layout children={<Profile/>}/>}/>
             <Route path='myitems' element={<Layout children={<ItemList authUser={true}/>}/>}/>
             <Route path='additem' element={<Layout children={<AddItem />}/>}/>
      </Route>
         </Routes>
         </BrowserRouter>
        
  )
}
