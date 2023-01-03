import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { toJS } from "mobx";
import React, { useEffect, useState } from "react";
import ItemList from "../../../components/layout/items/ItemList";
import Layout from "../../../components/layout/layout";
import SearchBar from "../../../components/SearchBar/SearchBar";
import categoryStore from "../../../store/categoryStore/categoryStore";
import { observer } from 'mobx-react';
function HomePage(props) {
  useEffect(() => {
    categoryStore.fetchCategories();
  }, []);
   const categories = toJS(categoryStore.categories);
  const [searchQuery, setSearchQuery] = useState('');
   const [category, setCategory] = useState("ALL");
   const handleChangeCategory = (event) => {
     setCategory(event.target.value);
  };
  return (
    <div>
      <Layout 
        children={<>
            <Grid    sx={{
               mt: 6 ,
               display: "flex",
               alignItems:'center',
               alignContent:'center',
               justifyContent: "center",height: '100%',justifyItems:'center'}} >
              <Grid item xs={6}  sx={{
               
               display: "flex",
               alignItems:'center',
               alignContent:'center',
               justifyContent: "center",height: '100%',justifyItems:'center',
        width: 400,
        height: 60}} >
                <SearchBar   setSearchQuery={setSearchQuery} />
              </Grid><FormControl>
              <Grid item xs={6}  sx={{
               display: "flex",
               alignContent:'center',
               justifyContent: "center",height: '100%',justifyItems:'center',
        width: 250,
        height: 60}}  >
          
                <InputLabel id="LabelCategory">Search by Category</InputLabel>
                <Select
                  labelId="LabelCategory"
                  id="category_url"
                  value={category}
                  label="Category"
                  name="category_url"
                  fullWidth
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={"ALL"}>ALL categories
                  </MenuItem>
                  {categories.map((item) => {
                    return (
                      <MenuItem key={item._id}  value={item.category_url} >
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select> 
              </Grid></FormControl>
            </Grid>
            <ItemList home={true} category={category} authUser={props.authUser}  searchQuery={searchQuery}
           /></>
        }
      />
    </div>
  );
}
export default  observer(HomePage)