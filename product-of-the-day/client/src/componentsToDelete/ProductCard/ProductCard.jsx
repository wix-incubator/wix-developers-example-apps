import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';

function ProductCard({ product, onClick, selected }) {
  return (
    <Card
      className={`product-card ${selected ? 'product-card-selected' : ''}`}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        sx={{ height: '168px' }}
        image={product?.media?.mainMedia?.image?.url}
        alt="Live from space album cover"
      />
      <CardContent>
        <Box marginBottom="12px">
          <Typography>{product?.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {product?.price?.formatted?.price}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
