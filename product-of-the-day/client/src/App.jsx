import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductDiscountForm from './components/ProductDiscountForm';
import NoProductSelected from './components/NoProductSelected';
import ProductsList from './components/ProductsList';
import SearchBar from './components/SearchBar';
import { useQueryParams } from './hooks/useQueryParams';
import Loader from './components/Loader';
import { searchProducts } from './api/products';
import { getProductOfTheDay } from './api/productOfTheDay';

function App() {
  const [showAppLoader, setShowAppLoader] = useState(false);
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productOfTheDayDiscount, setProductOfTheDayDiscount] = useState('');
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const queryParams = useQueryParams();

  useEffect(() => {
    setShowAppLoader(true);
    getProductOfTheDay(queryParams.get('instance'))
      .then((result) => {
        setSelectedProduct(result.data?.productOfTheDay?.[0]);
        setProductOfTheDayDiscount(result.data?.discountPercentage);
      })
      .catch((err) => {
        // if not found it will throw an error, maybe we want to return empty array from server
        console.error(err);
      })
      .finally(() => setShowAppLoader(false));
  }, []);

  if (showAppLoader) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <Loader size={180} />
      </Box>
    );
  }

  return (
    <Grid container spacing="30px" padding="0 120px">
      <Grid item xs={12}>
        <Box sx={{ marginTop: '24px' }}>
          <Typography
            fontWeight='bold'
            fontSize={32}
            variant="h1"
          >
            Coupon of the day
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Stack spacing="30px">
          <SearchBar
            onSearch={(searchTerm) => {
              setSearchError(null);
              setSearchInProgress(true);
              searchProducts({
                searchTerm,
                instance: queryParams.get('instance'),
              })
                .then((result) => {
                  setProducts(result.data);
                })
                .catch((err) => {
                  setSearchError(err);
                  console.error(err);
                })
                .finally(() => setSearchInProgress(false));
            }}
          />
          {searchInProgress ? (
            <Loader />
          ) : searchError ? (
            <Typography>Error... Please try again later.</Typography>
          ) : (
            products &&
            (products.length > 0 ? (
              <ProductsList
                selectedProduct={selectedProduct}
                products={products}
                onSelect={(product) => setSelectedProduct(product)}
              />
            ) : (
              <Box textAlign="center" marginBottom="30px">
                <Typography variant="h5">{'No products found :('}</Typography>
              </Box>
            ))
          )}
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Box
          sx={{
            position: 'sticky',
            top: '30px',
            minHeight: '420px',
            border: '1px solid #ababab',
            borderRadius: '5px',
            padding: '24px',
          }}
        >
          {selectedProduct ? (
            <ProductDiscountForm
              selectedProduct={selectedProduct}
              initialDiscount={productOfTheDayDiscount}
            />
          ) : (
            <NoProductSelected />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
