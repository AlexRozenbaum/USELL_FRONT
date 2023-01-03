import { Grid } from "@mui/material";
import { toJS } from "mobx";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MyAlert from "../../../MyAlert/MyAlert";
import { doApiGet } from "../../../services/ApiService/ApiService";
import userStore from "../../../store/userStore/userStore";
import { API_URL } from "../../../utils/constants/url.constants";
import Loading from "../../Loading/Loading";
import Item from "./Item";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import alertStore from "../../../store/alertStore/alertStore";
import { observer } from "mobx-react";
function ItemList(props) {
  let state=(toJS(alertStore.state))
  const history = useLocation();
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(false);
  const category=props.category
  const [isLoading, setIsLoading] = useState(false);
  const searchQuery=props?.searchQuery;
  const [countPages,setcountPages] = useState(1);
  const [currentPage,setcurrentPage] = useState(1);
  useEffect(() => {
    setRender(false)
    doApi();
  }, [history.pathname,searchQuery,category,render,currentPage,props]);
  const wishlist = toJS(userStore.user.wishlist);
  const lotlist = toJS(userStore.user.lotlist);
  const doApi = async () => {
    setIsLoading(true);
    console.log(props.authUser)
    if (props.authUser&&props.myitems) {
      try { 
        let  url = API_URL + "/lots/myitems"+"?&&page="+currentPage; 
        let resp = await doApiGet(url);
        console.log(resp.data.data)
       setcountPages(Math.ceil((resp.data.count)/10))
      setItems(resp.data.data);
       setIsLoading(false);
    } catch (err) {
      console.log(err);
      alertStore.set('MESSAGE','There problem ,try again later', true);
      setIsLoading(false);
    }
  }
  if (props.authUser&&props.lotlist) 
  {
    try{
      const items = [];
      for (const element of lotlist) {
        let  url = API_URL + "/lots/byId/" + element.item_id;
       const resp = await doApiGet(url);
       items.push(resp.data);
      }
    setcountPages(Math.ceil(items.length/9))
    setItems(items);
    setIsLoading(false);}
    catch (err) {
      console.log(err);
      alertStore.set('MESSAGE','There problem ,try again later', true);
      setIsLoading(false);
    }
  }
    if (props.authUser&props.wishlist) 
    {
      try{
        const items = [];
        for (const element of wishlist) {
          let  url = API_URL + "/lots/byId/" + element;
         const resp = await doApiGet(url);
         items.push(resp.data);
        }
       setcountPages(Math.ceil(items.length/9))
        console.log(items)
      setItems(items);
      setIsLoading(false);}
      catch (err) {
        console.log(err);
        alertStore.set('MESSAGE','There problem ,try again later', true);
        setIsLoading(false);
      }
    }
    if (props.home) 
    {
      try {
       
        let  url = API_URL + "/lots/"+"?&&s="+searchQuery+"&&category="+category+"&&page="+currentPage
        let resp = await doApiGet(url);
        let url_count=API_URL + "/lots/count/"+"?&&s="+searchQuery+"&&category="+category
        let resp_count= await doApiGet(url_count);
        const totalPages=(Math.ceil(resp_count.data.count/9))
        console.log(totalPages)
         setcountPages(totalPages);
         setItems(resp.data)
         setIsLoading(false);
    } catch (err) {
      console.log(err);
      alertStore.set('MESSAGE','There problem ,try again later', true);
      setIsLoading(false);
    }
  }
  console.log(state)
  };
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (  <>
     {state&&<MyAlert/>}
        <Grid container spacing={1}> 
          {items.map((item, i) => {
            return (
              <Grid item xs={6} md={4} key={item._id}>
                <Item index={i} item={item}  render={(render)=>setRender(render)} authUser={props.authUser}/>
              </Grid>
            );
          })}
        </Grid>
        <Stack  alignItems={'center'} spacing={2}>
      <Pagination  count={countPages} page={currentPage}  onChange={(event, value) => setcurrentPage(value)}variant="outlined" shape="rounded" />
    </Stack></>
      )}
    </div>
  );
}
export default observer(ItemList)