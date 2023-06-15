import { Box } from '@mui/material';
import React from 'react';
import ProductCard from '../ProductCard';

function ProductsList({ products, onSelect, selectedProduct }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          onClick={() => onSelect(product)}
          selected={selectedProduct?.id === product?.id}
        />
      ))}
    </Box>
  );
}

export default ProductsList;
