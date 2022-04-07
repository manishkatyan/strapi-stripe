/**
 *
 * This component is the responsible for opening modal when the edit
 * button clicks.
 *
 */

import React, { useState, useEffect } from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { TextInput } from "@strapi/design-system/TextInput";
import { Tooltip } from "@strapi/design-system/Tooltip";
import Information from "@strapi/icons/Information";
import { NumberInput } from "@strapi/design-system/NumberInput";
import { Textarea } from "@strapi/design-system/Textarea";
import { getStripeProductProductById } from "../../utils/apiCalls";

const EditProduct = ({
  productId,
  isEditVisible,
  handleCloseEdit,
  handleClickUpdateEdit,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [stripeProductId, setStripeProductId] = useState("");

  const [error, setError] = useState({
    title: "",
    price: "",
    url: "",
    description: "",
  });

  useEffect(async () => {
    const response = await getStripeProductProductById(productId);

    if (response.status === 200 && response.data) {
      const { title, price, productImage, description, stripeProductId } =
        response.data;
      setTitle(title);
      setPrice(price);
      setUrl(productImage);
      setDescription(description);
      setStripeProductId(stripeProductId);
    }
  }, [productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
      setError({ ...error, title: "" });
    } else if (name === "price") {
      setPrice(value);
      setError({ ...error, price: "" });
    } else if (name === "url") {
      setUrl(value);
      setError({ ...error, url: "" });
    } else if (name === "description") {
      setDescription(value);
      setError({ ...error, description: "" });
    }
  };

  const handleUpdateProduct = async () => {
    if (!title && !price && !url && !description) {
      setError({
        ...error,
        title: "Title is required",
        price: "Price is required",
        url: "Image Url is required",
        description: "Description is required",
      });
    } else if (!title) {
      setError({
        ...error,
        title: "Title is required",
        price: "",
        url: "",
        description: "",
      });
    } else if (!price) {
      setError({
        ...error,
        title: "",
        price: "Price is required",
        url: "",
        description: "",
      });
    } else if (!url) {
      setError({
        ...error,
        title: "",
        price: "",
        url: "Image Url is required",
        description: "",
      });
    } else if (!description) {
      setError({
        ...error,
        title: "",
        price: "",
        url: "",
        description: "Description is required",
      });
    } else {
      handleClickUpdateEdit(
        productId,
        title,
        url,
        description,
        stripeProductId
      );
    }
  };

  return (
    <>
      {isEditVisible && (
        <ModalLayout onClose={handleCloseEdit} labelledBy="title">
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
              variant="beta"
            >
              Add Product
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Grid gap={5}>
              <GridItem col={6}>
                <TextInput
                  placeholder="Enter title of the product"
                  label="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  error={error.title ? error.title : ""}
                  required
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  placeholder="Enter the price of the product"
                  type="number"
                  label="Price"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  error={error.price ? error.price : ""}
                  required
                  disabled
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  placeholder="Enter the image url of the product"
                  label="Image Url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  error={error.url ? error.url : ""}
                  required
                />
              </GridItem>
              <GridItem col={6}>
                <Textarea
                  placeholder="Enter the product description"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  error={error.description ? error.description : ""}
                  required
                >
                  {description}
                </Textarea>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseEdit} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button variant="default" onClick={handleUpdateProduct}>
                  Update
                </Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default EditProduct;
