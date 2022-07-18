import { TextField, Button, Stack, Box } from '@mui/material';
import React, { useState } from 'react';

function DiscountForm({ chosenProduct }) {
  const [discount, setDiscount] = useState('');

  const saveProductOfTheDay = () => {
    alert('saving product of the day...');
  };

  return (
    <Stack spacing={5}>
      <Box>{chosenProduct?.name}</Box>
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
        <Button variant="outlined" onClick={saveProductOfTheDay}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}

export default DiscountForm;
