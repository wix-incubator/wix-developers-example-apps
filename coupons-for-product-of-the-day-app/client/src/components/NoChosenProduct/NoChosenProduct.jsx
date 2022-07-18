import { Box, Stack } from '@mui/material';
import React from 'react';

function NoChosenProduct() {
  return (
    <Stack alignItems="center" spacing={4}>
      <Box>No Product Chosen</Box>
      <Box textAlign="center">
        Search for products, select one from the list, then set it's discount.
      </Box>
    </Stack>
  );
}

export default NoChosenProduct;
