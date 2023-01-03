import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const DateTimeDisplay = ({ value, type }) => {
  return (
<CardContent sx={{ display: 'inline-block' }} align={'center'}>
<Typography fontWeight={"Bold"} variant="body3" style={{display: 'inline-block'}} >
<div>{type}</div></Typography>
<div>{value}</div>
</CardContent>   
  );
};

export default DateTimeDisplay;