import { EmptyState, Image, TextButton } from "@wix/design-system";
import React from "react";
import addProduct from "../assets/add-product.svg";
import { Add } from "@wix/wix-ui-icons-common";

export function ChooseProductButton({ onClick }) {
  return (
    <EmptyState
      theme="page"
      width={"100%"}
      image={
        <Image transparent width="120px" height="120px" src={addProduct} />
      }
      title="Select the product for which you would like to offer a discount."
    >
      {
        <TextButton prefixIcon={<Add />} onClick={onClick}>
          Choose Product
        </TextButton>
      }
    </EmptyState>
  );
}
