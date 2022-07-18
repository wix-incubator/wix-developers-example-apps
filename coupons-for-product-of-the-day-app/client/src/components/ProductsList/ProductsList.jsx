import { Box, Stack } from '@mui/material';
import React from 'react';
import ProductCard from '../ProductCard';

function ProductsList({ products }) {
  return (
    <Box sx={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </Box>
  );
}

export default ProductsList;
