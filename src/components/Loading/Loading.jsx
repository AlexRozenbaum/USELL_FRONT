import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
     <div>
    <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
      <CircularProgress sx={{ color: 'white' }} />
    </Backdrop>
    </div>
  );
};

export default Loading;