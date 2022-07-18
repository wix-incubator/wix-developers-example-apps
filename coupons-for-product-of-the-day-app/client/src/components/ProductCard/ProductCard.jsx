import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';

function ProductCard({ product, onSelect, disableSelect }) {
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{ width: '260px', height: '180px' }}
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
        <Button
          disabled={disableSelect}
          onClick={() => onSelect(product)}
          size="small"
          variant="contained"
        >
          select
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
