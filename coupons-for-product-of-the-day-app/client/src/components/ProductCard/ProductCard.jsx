import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';

function ProductCard({ product }) {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ width: '260px', height: '180px' }}
        image={product?.src}
        alt="Live from space album cover"
      />
      <CardContent>
        <Box marginBottom="12px">
          <Typography variant="h6">{product?.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {product?.price}
          </Typography>
        </Box>
        <Button size="small" variant="contained">
          select
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
