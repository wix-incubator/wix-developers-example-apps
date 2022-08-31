import {
  Box,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQueryParams } from './hooks/useQueryParams';
import Loader from './components/Loader';
import { getProductOfTheDay, saveProductOfTheDay } from './api/productOfTheDay';
import ProductSelectionModal from './components/ProductSelectionModal';
import ProductOfTheDay from './components/ProductOfTheDay';
import DiscountField from './components/DiscountField';
import ChooseProductButton from './components/ChooseProductButton';

function App() {
  const [showProductSelectionModal, setShowProductSelectionModal] =
    useState(false);

  const [showAppLoader, setShowAppLoader] = useState(false);
  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [productOfTheDayDiscount, setProductOfTheDayDiscount] = useState('');

  const [saveError, setSaveError] = useState(null);
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [showSuccessfulSaveIndicator, setShowSuccessfulSaveIndicator] =
    useState(false);

  const queryParams = useQueryParams();

  useEffect(() => {
    setShowAppLoader(true);
    getProductOfTheDay(queryParams.get('instance'))
      .then((result) => {
        setProductOfTheDay(result.data?.productOfTheDay?.[0]);
        setProductOfTheDayDiscount(result.data?.discountPercentage);
      })
      .catch((err) => {
        // if there is no product of the day it will throw an error, maybe we want to return empty array from server
        console.error(err);
      })
      .finally(() => setShowAppLoader(false));
  }, []);

  const openProductSelectionModal = () => setShowProductSelectionModal(true);
  const closeProductSelectionModal = () => setShowProductSelectionModal(false);

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
    <>
      {showProductSelectionModal && (
        <ProductSelectionModal
          onRequestClose={closeProductSelectionModal}
          onProductSelection={(product) => {
            closeProductSelectionModal();
            setProductOfTheDay(product);
          }}
        />
      )}
      <Box sx={{ padding: '24px 156px' }}>
        <Typography fontWeight="bold" fontSize={32} variant="h1">
          Coupon of the day
        </Typography>
        <Typography variant="subtitle2">
          Offer your users a coupon for one of your products, they will get it
          once they interact with the Wix Chat bot.
        </Typography>
        <Box
          sx={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Stack alignItems="center" width="50%">
            <Box textAlign="center" marginBottom="30px">
              <Typography fontWeight="bold" variant="h4">
                Product of The Day
              </Typography>
              <Typography variant="body1">
                Choose a product and then set a discount and save
              </Typography>
            </Box>
            {productOfTheDay ? (
              <Stack spacing={4} width="100%">
                <ProductOfTheDay
                  product={productOfTheDay}
                  onReplaceRequest={openProductSelectionModal}
                />
                <Stack direction="row" spacing={10}>
                  <DiscountField
                    value={productOfTheDayDiscount}
                    onChange={setProductOfTheDayDiscount}
                  />
                  <Button
                    className="button"
                    disabled={
                      productOfTheDayDiscount === '' ||
                      showSuccessfulSaveIndicator
                    }
                    variant="outlined"
                    onClick={() => {
                      setSaveError(null);
                      setSaveInProgress(true);
                      saveProductOfTheDay({
                        instance: queryParams.get('instance'),
                        discountPercentage: productOfTheDayDiscount,
                        productId: productOfTheDay?.id,
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
                      'Saved'
                    ) : (
                      'Save'
                    )}
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <ChooseProductButton onClick={openProductSelectionModal} />
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default App;
