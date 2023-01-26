import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react'

export default function PerPage({perPage,setPerPage}) {
   
  return (
    <div>
      <InputLabel id="PerPage">PerPage</InputLabel>
      <Select
    labelId="PerPage"
    id="perPage"
    value={perPage}
    label="perPage"
    name="perPage"
    fullWidth
    onChange={(e) => {
        setPerPage(e.target.value);
      }}
  >
    <MenuItem value={10}>10</MenuItem>
    <MenuItem value={25}>25</MenuItem>
    <MenuItem value={50}>50</MenuItem>
  </Select></div>
  )
}
