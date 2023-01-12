import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'
export default function SortBy({sortBy,setSortBy}) {
    const sort=[ "name","info","hand","location","phone",
                 "date_created" ,"start_price","active","item_lot","days", "winner_price"]
  return (
    <div> <InputLabel id="LabelCategory">Sort by</InputLabel>
    <Select
      labelId="SortBy"
      id="sortBy"
      value={sortBy}
      label="sortBy"
      name="sortBy"
      fullWidth
      onChange={(e) => {
        setSortBy(e.target.value);
      }}
    >
      <MenuItem value={""}>default by _id</MenuItem>
      {sort.map((item,index) => {
        return (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </Select></div>
  )
}

