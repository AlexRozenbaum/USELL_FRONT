import { CardContent, Typography } from '@mui/material';
import React from 'react';

const DateTimeDisplay = ({ value, type }) => {
  return (
<CardContent sx={{ display: 'inline-block' ,bgcolor: 'rgba(0, 0, 0, 0.00)'}} align={'center'}>
<Typography fontWeight={"Bold"} variant="body3" color={"white"} style={{display: 'inline-block'}} >
<div>{type}</div>
<div>{value}</div></Typography>
</CardContent>   
  );
};

export default DateTimeDisplay;