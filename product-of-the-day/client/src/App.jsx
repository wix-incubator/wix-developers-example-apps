import React, { useEffect, useState } from "react";
import { useQueryParams } from "./hooks/useQueryParams";
import { getProductOfTheDay, saveProductOfTheDay } from "./api/productOfTheDay";
import {
  Page,
  WixDesignSystemProvider,
  Modal,
  Notification,
  FloatingNotification,
  Text,
  Box,
} from "@wix/design-system";
import { StatusWarning } from "@wix/wix-ui-icons-common";
import { ChooseProductButton } from "./components/ChooseProductButton";
import { ChooseProductModal } from "./components/ChooseProductModal/ChooseProductModal";
import { ProductCard } from "./components//ProductCard/ProductCard";

function App() {
  const [showProductSelectionModal, setShowProductSelectionModal] =
    useState(false);

  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [productOfTheDayDiscount, setProductOfTheDayDiscount] = useState(
    productOfTheDay?.price.discountedPrice || 15
  );
  const [showWrWarning, setShowWarningMsg] = React.useState(false);
  const [showSuccessfulSaveIndicator, setShowSuccessfulSaveIndicator] =
    useState(false);

  const queryParams = useQueryParams();

  const onSelectProduct = (product) => {
    setShowProductSelectionModal(false);
    setProductOfTheDay(product);

    setShowWarningMsg(true);
  };

  const onActive = async () => {
    saveProductOfTheDay({
      instance: queryParams.get("instance"),
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
        console.error(err);
      });
  };

  useEffect(() => {
    getProductOfTheDay(queryParams.get("instance"))
      .then((result) => {
        setProductOfTheDay(result.data?.productOfTheDay?.[0]);
        setProductOfTheDayDiscount(result.data?.discountPercentage);
      })
      .catch((err) => {
        // if there is no product of the day it will throw an error, maybe we want to return empty array from server
        console.error(err);
      });
  }, []);

  const onChangeDiscount = (discount) => {
    setProductOfTheDayDiscount(discount);
  };
  return (
    <WixDesignSystemProvider>
      <Page height={"100vh"}>
        <Page.Header
          title="Product of The Day"
          subtitle="Provide your website visitors with a discount for one of the products available in your store. The coupon will be visible to them once they engage with Wix Chat."
        />
        <Page.Content>
          <Notification
            type="sticky"
            theme="success"
            show={showSuccessfulSaveIndicator}
          >
            <Notification.TextLabel>
              Product of the day is live on your site.
            </Notification.TextLabel>
            <Notification.CloseButton
              onClose={() => setShowSuccessfulSaveIndicator(false)}
            />
          </Notification>

          {showWrWarning && (
            <Box marginBottom="SP4">
              <FloatingNotification
                prefixIcon={<StatusWarning />}
                width={"100%"}
                onClose={() => setShowWarningMsg(false)}
                type="warning"
                buttonProps={{
                  label: "Got It",
                  onClick: () => setShowWarningMsg(false),
                }}
                text={
                  <Text>
                    Click “Update” to activate your coupon and any other changes
                    you make.
                  </Text>
                }
              />
            </Box>
          )}
          {productOfTheDay ? (
            <ProductCard
              product={productOfTheDay}
              discountPercentage={productOfTheDayDiscount}
              onChangeDiscount={onChangeDiscount}
              onReplace={() => setShowProductSelectionModal(true)}
              onDelete={() => setProductOfTheDay(null)}
              onSave={onActive}
            />
          ) : (
            <ChooseProductButton
              onClick={() => setShowProductSelectionModal(true)}
            />
          )}
          <Modal
            isOpen={showProductSelectionModal}
            onRequestClose={() => setShowProductSelectionModal(false)}
            shouldCloseOnOverlayClick
            screen="desktop"
          >
            <ChooseProductModal
              onSelectProduct={onSelectProduct}
              onClose={() => setShowProductSelectionModal(false)}
              onSave={onSelectProduct}
            />
          </Modal>
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
}

export default App;
