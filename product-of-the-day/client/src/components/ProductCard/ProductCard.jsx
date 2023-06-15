import React from "react";
import {
  Card,
  Box,
  FormField,
  Image,
  NumberInput,
  Input,
  Button,
  IconButton,
} from "@wix/design-system";
import { Replace } from "@wix/wix-ui-icons-common";
import css from "./ProductCard.module.css";

const getPrice = (price, discount) =>
  (Number(price) * ((100 - Number(discount)) / 100)).toFixed(2);
export function ProductCard({
  product,
  discountPercentage,
  onChangeDiscount,
  onReplace,
  onDelete,
  onSave,
}) {
  const [newPrice, setNewPrice] = React.useState(
    `${getPrice(product.price.price, discountPercentage)}`
  );

  const onChangeDiscountMount = (discount) => {
    onChangeDiscount(discount);
    const priceAfterDiscount = getPrice(product.price.price, discount);
    setNewPrice(priceAfterDiscount);
  };

  const headerSuffix = (
    <Box gap={2}>
      <IconButton size="small" onClick={onReplace} priority="secondary">
        <Replace />
      </IconButton>
      <Button size="small" onClick={onSave}>
        Update
      </Button>
    </Box>
  );
  return (
    <Card className={css.selectedProduct}>
      <Card.Header
        title={product.name}
        subtitle={product.price.formatted.price}
        suffix={headerSuffix}
      ></Card.Header>
      <Card.Divider />
      <Card.Content>
        <Box gap={4}>
          <Box gap={4} direction="vertical">
            <Box gap={4}>
              <FormField label="Discount" stretchContent={false}>
                <NumberInput
                  size="small"
                  className={css.productNumberInput}
                  onChange={onChangeDiscountMount}
                  value={discountPercentage}
                  suffix={<Input.Affix>%</Input.Affix>}
                />
              </FormField>

              <FormField
                className={css.productNumberInput}
                label="New price"
                stretchContent={false}
              >
                <Input
                  className={css.productNumberInput}
                  readOnly
                  size="small"
                  prefix={<Input.Affix>$</Input.Affix>}
                  value={newPrice}
                />
              </FormField>
            </Box>
          </Box>
          <Box width={"100%"}>
            <Image
              src={product?.media?.mainMedia?.image?.url}
              height={168}
              width={168}
              borderRadius={"6px"}
            />
          </Box>
        </Box>
      </Card.Content>
    </Card>
  );
}
