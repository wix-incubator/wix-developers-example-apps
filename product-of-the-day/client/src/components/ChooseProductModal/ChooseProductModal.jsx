import {
  CustomModalLayout,
  Box,
  Search,
  Image,
  Text,
  Thumbnail,
  Loader,
  EmptyState,
  Heading,
  TextButton,
  Layout,
} from "@wix/design-system";
import React from "react";
import { useQueryParams } from "../../hooks/useQueryParams";
import addProduct from "../../assets/add-product.svg";
import { searchProducts } from "../../api/products";

export function ChooseProductModal({ onClose, onSave }) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [products, setProducts] = React.useState(null);
  const [searchInProgress, setSearchInProgress] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const queryParams = useQueryParams();

  const onClickSave = () => onSave(selectedProduct);

  const onSearch = (searchTerm) => {
    setSearchInProgress(true);
    searchProducts({
      searchTerm,
      instance: queryParams.get("instance"),
    })
      .then((result) => {
        console.log(result.data);
        setProducts([...result.data]);
        setSearchQuery(searchTerm);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setSearchInProgress(false));
  };

  const renderProduct = (product) => {
    const onClickThumbnail = () =>
      product.id === selectedProduct?.id
        ? setSelectedProduct(null)
        : setSelectedProduct(product);

    return (
      <div>
        <Thumbnail
          image={
            <Image
              height={109}
              width={109}
              showBorder={true}
              borderRadius={"6px"}
              fit="cover"
              src={product?.media?.mainMedia?.image?.url}
            />
          }
          title={
            <Box direction="vertical" align="center">
              <Text weight="normal" size="small">
                {product.name}
              </Text>
              <Text size="small" weight="thin">
                {product.price.formatted.price}
              </Text>
            </Box>
          }
          onClick={onClickThumbnail}
          selected={product.id === selectedProduct?.id}
        />
      </div>
    );
  };

  const modalContent = (
    <Box direction="vertical" gap="3">
      <Search
        size="medium"
        placeholder="Search by product name"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        status={searchInProgress ? "loading" : ""}
      />
      {products?.length ? (
        <Layout gap={"18px"} cols={4}>
          {products.map((prod) => renderProduct(prod))}
        </Layout>
      ) : (
        <EmptyState
          theme="page-no-border"
          image={
            <Image transparent width="120px" height="120px" src={addProduct} />
          }
          title={
            searchQuery === ""
              ? "No products to show"
              : `No results for “${searchQuery}”`
          }
          subtitle={
            searchQuery === ""
              ? "Search for a product in your store to see it here."
              : ""
          }
        >
          {searchQuery !== "" && (
            <TextButton onClick={() => setSearchQuery("")}>Reset</TextButton>
          )}
        </EmptyState>
      )}
    </Box>
  );

  return (
    <CustomModalLayout
      primaryButtonText="Done"
      secondaryButtonText="Cancel"
      width={"100%"}
      onCloseButtonClick={onClose}
      secondaryButtonOnClick={onClose}
      primaryButtonOnClick={onClickSave}
      title="Choose a product"
      content={modalContent}
    />
  );
}
