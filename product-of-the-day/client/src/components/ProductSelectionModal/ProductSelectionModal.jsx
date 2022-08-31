import React, { useState } from 'react';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '../SearchBar';
import UpArrowsAnimation from '../UpArrowsAnimation/UpArrowsAnimation';
import Loader from '../Loader';
import { useQueryParams } from '../../hooks/useQueryParams';
import { searchProducts } from '../../api/products';
import ProductsList from '../ProductsList';

function ProductSelectionModal({ onProductSelection, onRequestClose }) {
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchApiError, setSearchApiError] = useState(null);

  const queryParams = useQueryParams();

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    onRequestClose();
  };

  const renderModalContent = () => {
    if (searchInProgress) {
      return <Loader />;
    }
    if (searchApiError) {
      return (
        <Typography>Something went wrong... Please try again later.</Typography>
      );
    }
    if (products) {
      if (products.length === 0) {
        return <Typography variant="h5">{'No products found :('}</Typography>;
      }
      return (
        <ProductsList
          selectedProduct={selectedProduct}
          products={products}
          onSelect={(product) => setSelectedProduct(product)}
        />
      );
    }

    return <UpArrowsAnimation />;
  };

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: '8px' },
      }}
      fullWidth={true}
      maxWidth="lg"
      onClose={handleClose}
      open={true}
    >
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography fontWeight="bold" variant="h5">
            Choose Your Product of The Day
          </Typography>
          <IconButton onClick={onRequestClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ minHeight: '600px' }}>
        <SearchBar
          sx={{ marginBottom: '48px' }}
          onSearch={(searchTerm) => {
            setSearchApiError(null);
            setSelectedProduct(null);
            setSearchInProgress(true);
            searchProducts({
              searchTerm,
              instance: queryParams.get('instance'),
            })
              .then((result) => {
                setProducts(result.data);
              })
              .catch((err) => {
                setSearchApiError(err);
                console.error(err);
              })
              .finally(() => setSearchInProgress(false));
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {renderModalContent({ searchInProgress, products, searchApiError })}
        </Box>
      </DialogContent>
      {selectedProduct && (
        <DialogActions>
          <Button
            className="button"
            sx={{ margin: '12px' }}
            variant="contained"
            onClick={() => {
              onProductSelection(selectedProduct);
            }}
          >
            Select
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default ProductSelectionModal;
