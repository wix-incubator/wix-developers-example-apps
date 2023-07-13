import { TextField } from '@mui/material';
import React from 'react';

function DiscountField({ value, onChange }) {
  return (
    <TextField
      autoComplete="off"
      label="Discount (%)"
      variant="standard"
      onChange={(e) => {
        if (Number(e.target.value) > 100) {
          return;
        }
        onChange(e.target.value);
      }}
      placeholder="0 - 100"
      value={value}
      fullWidth
      onKeyPress={(event) => {
        // block non numeric keys
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
    />
  );
}

export default DiscountField;
