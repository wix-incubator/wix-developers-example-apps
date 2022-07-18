import { TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <TextField
      label="Search for product..."
      variant="outlined"
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
      onKeyPress={(ev) => {
        if (ev.key === 'Enter') {
          onSearch(searchTerm);
        }
      }}
      value={searchTerm}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton onClick={() => onSearch(searchTerm)}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
