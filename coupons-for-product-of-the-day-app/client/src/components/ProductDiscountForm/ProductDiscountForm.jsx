import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect';
import { useQueryParams } from '../../hooks/useQueryParams';
import { saveProductOfTheDay } from '../../api/productOfTheDay';

function ProductDiscountForm({ selectedProduct, initialDiscount }) {
  const [discount, setDiscount] = useState(initialDiscount);
  const [saveError, setSaveError] = useState(null);
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [showSuccessfulSaveIndicator, setShowSuccessfulSaveIndicator] =
    useState(false);
  const queryParams = useQueryParams();

  useDidUpdateEffect(() => {
    setDiscount('');
  }, [selectedProduct]);

  return (
    <Stack spacing={2}>
      <Box textAlign="center">
        <Typography>Product of The Day</Typography>
      </Box>
      <Box
        component="img"
        src={selectedProduct?.media?.mainMedia?.image?.url}
      />
      <Typography>{selectedProduct?.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {selectedProduct?.price?.formatted?.price}
      </Typography>
      <Box>
        <TextField
          label="Discount (%)"
          variant="standard"
          onChange={(e) => {
            if (Number(e.target.value) > 100) {
              return;
            }
            setDiscount(e.target.value);
          }}
          placeholder="0 - 100"
          value={discount}
          fullWidth
          onKeyPress={(event) => {
            // block non numeric keys
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </Box>
      <Box textAlign="end">
        <Button
          disabled={discount === '' || showSuccessfulSaveIndicator}
          variant="outlined"
          onClick={() => {
            setSaveError(null);
            setSaveInProgress(true);
            saveProductOfTheDay({
              instance: queryParams.get('instance'),
              discountPercentage: discount,
              productId: selectedProduct?.id,
            })
              .then(() => {
                setShowSuccessfulSaveIndicator(true);
                setTimeout(() => {
                  setShowSuccessfulSaveIndicator(false);
                }, 3500);
              })
              .catch((err) => {
                setSaveError(err);
                console.error(err);
              })
              .finally(() => setSaveInProgress(false));
          }}
        >
          {saveInProgress ? (
            <CircularProgress size={'24px'} />
          ) : showSuccessfulSaveIndicator ? (
            'product saved'
          ) : (
            'save'
          )}
        </Button>
      </Box>
      {saveError && <Typography>Error... Please try again later.</Typography>}
    </Stack>
  );
}

export default ProductDiscountForm;
