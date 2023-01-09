import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function ItemsList({items, countPages,currentPage,setcurrentPage,actions}) {
  const handleChange = (event, value) => {
    setcurrentPage(value);
  };
  return (
    <div>
      <>
        <Grid container spacing={1}>
          {items.map((item, i) => {
            return (
              <Grid item xs={6} md={4} key={item._id}>
                <Item index={i} item={item} actions={actions}/>
              </Grid>
            );
          })}
        </Grid>
        <Stack alignItems={"center"} spacing={2}>
          <Pagination
            count={countPages}
            page={currentPage}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </>
    </div>
  );
}
export default ItemsList;
