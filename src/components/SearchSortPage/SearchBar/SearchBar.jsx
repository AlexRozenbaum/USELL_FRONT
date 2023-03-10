import React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
export default function SearchBar({ setSearchQuery }) {
  return (
    <div>
      <form >
        <TextField
         sx={{marginTop:2}}
          id="search-bar"
          className="text"
          onInput={(e) => {
            setSearchQuery(e.target.value);
            
          }}
          label="Enter a name or info"
          variant="outlined"
          placeholder="Search..."
          size="large"
          
        />
        <IconButton   sx={{marginTop:3}}type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
    </div>
  );
}
