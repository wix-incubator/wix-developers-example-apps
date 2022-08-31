import { Button, Stack, Box, Typography } from '@mui/material';
import React from 'react';

function ProductOfTheDay({ product, onReplaceRequest }) {
  return (
    <Stack spacing={3}>
      <Box
        component="img"
        src={product?.media?.mainMedia?.image?.url}
        height="350px"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">{product?.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {product?.price?.formatted?.price}
          </Typography>
        </Box>
        <Button
          onClick={onReplaceRequest}
          className="button"
          variant="outlined"
        >
          Replace
        </Button>
      </Box>
    </Stack>
  );
}

export default ProductOfTheDay;
