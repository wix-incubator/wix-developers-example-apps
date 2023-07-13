import { Box, Typography } from '@mui/material';
import React from 'react';
import discountSvg from '../../assets/discount.svg';

function ChooseProductButton({ onClick }) {
  return (
    <Box className="choose-product-button" onClick={onClick}>
      <img src={discountSvg} width="200px" height="200px" />
      <Typography variant="body1" color="#3899EC">
        Choose a Product
      </Typography>
    </Box>
  );
}

export default ChooseProductButton;
