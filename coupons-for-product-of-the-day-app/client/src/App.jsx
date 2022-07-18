import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import DiscountForm from './components/DiscountForm';
import NoChosenProduct from './components/NoChosenProduct';
import ProductsList from './components/ProductsList';
import SearchBar from './components/SearchBar';

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Nike Air',
      price: '43.65$',
      src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    },
    {
      id: 2,
      name: 'Vans Classic',
      price: '30.65$',
      src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    },
    {
      id: 3,
      name: 'Vans Classic',
      price: '30.65$',
      src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    },
    // {
    //   id: 4,
    //   name: 'Vans Classic',
    //   price: '30.65$',
    //   src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    // },
  ]);

  const searchProducts = (value) => {
    alert('searching for products with search term: ' + value);
  };

  const chosenProduct = {
    name: 'Nike shoes',
  };

  return (
    <Grid container spacing="30px" padding="0 120px">
      <Grid item xs={12}>
        <Box sx={{ margin: '24px 0' }}>
          <Typography fontWeight="bold" variant="h5">
            Coupon of the day
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Stack spacing="30px">
          <SearchBar
            onSearch={(value) => {
              searchProducts(value);
            }}
          />
          {products && <ProductsList products={products} />}
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            minHeight: '210px',
            border: '1px solid #ababab',
            borderRadius: '5px',
            padding: '24px',
          }}
        >
          {chosenProduct ? (
            <DiscountForm chosenProduct={chosenProduct} />
          ) : (
            <NoChosenProduct />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
