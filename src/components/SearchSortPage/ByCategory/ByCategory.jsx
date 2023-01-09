import { InputLabel, MenuItem, Select } from '@mui/material';
import { toJS } from 'mobx';
import React from 'react'
import categoryStore from '../../../store/categoryStore/categoryStore';

export default function ByCategory({category,setCategory}) {
    categoryStore.fetchCategories();
    const categories = toJS(categoryStore.categories);
  return (
    <div> <InputLabel id="LabelCategory">Search by Category</InputLabel>
    <Select
      labelId="LabelCategory"
      id="category_url"
      value={category}
      label="Category"
      name="category_url"
      fullWidth
      onChange={(e) => {
        setCategory(e.target.value);
      }}
    >
      <MenuItem value={"ALL"}>ALL categories</MenuItem>
      {categories.map((item) => {
        return (
          <MenuItem key={item._id} value={item.category_url}>
            {item.name}
          </MenuItem>
        );
      })}
    </Select></div>
  )
}

