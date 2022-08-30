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
    <Card
      sx={{
        borderRadius: '8px',
        boxShadow: 'none',
      }}
    >
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
          sx={{
            borderRadius: '15px',
            height: '30px',
            backgroundColor: '#116DFF',
            textTransform: 'none',
            boxShadow: 'none',
          }}
          disabled={disableSelect}
          onClick={() => onSelect(product)}
          size="small"
          variant="contained"
        >
          Select
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
