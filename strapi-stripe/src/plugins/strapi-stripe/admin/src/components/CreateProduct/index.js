/**
 *
 * This component is the responsible for opening modal when the Add Product
 * button clicks.
 *
 */

import React, { useState } from "react";
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

const CreateProduct = ({ isVisible, handleClose }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState({
    title: "",
    price: "",
    url: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
      setError({ ...error, title: "" });
    } else if (name === "url") {
      setUrl(value);
      setError({ ...error, url: "" });
    } else if (name === "description") {
      setDescription(value);
      setError({ ...error, description: "" });
    }
  };

  const handleChangeNumber = (value) => {
    setPrice(value);
    setError({ ...error, price: "" });
  };

  const handleClickSave = () => {
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
      console.log("Success");
      console.log(title, price, url, description);
    }
  };

  const toolTipStyle = {
    border: "none",
    padding: 0,
    background: "transparent",
  };

  return (
    <>
      {isVisible && (
        <ModalLayout onClose={handleClose} labelledBy="title">
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
                  onChange={handleChange}
                  error={error.title ? error.title : ""}
                  labelAction={
                    <Tooltip description="Enter the title of the product">
                      <button
                        aria-label="Information about the title of the product"
                        style={toolTipStyle}
                      >
                        <Information aria-hidden={true} />
                      </button>
                    </Tooltip>
                  }
                />
              </GridItem>
              <GridItem col={6}>
                <NumberInput
                  placeholder="Enter the price of the product"
                  label="Price"
                  name="price"
                  onValueChange={(value) => handleChangeNumber(value)}
                  value={price}
                  error={error.price ? error.price : ""}
                  labelAction={
                    <Tooltip description="Enter the price of the product">
                      <button
                        aria-label="Information about the price of the product"
                        style={toolTipStyle}
                      >
                        <Information aria-hidden={true} />
                      </button>
                    </Tooltip>
                  }
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  placeholder="Enter the image url of the product"
                  label="Image Url"
                  name="url"
                  onChange={handleChange}
                  error={error.url ? error.url : ""}
                  labelAction={
                    <Tooltip description="Enter the image url of the product">
                      <button
                        aria-label="Information about the image url  of the product"
                        style={toolTipStyle}
                      >
                        <Information aria-hidden={true} />
                      </button>
                    </Tooltip>
                  }
                />
              </GridItem>
              <GridItem col={6}>
                <Textarea
                  placeholder="Enter the product description"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  error={error.description ? error.description : ""}
                  labelAction={
                    <Tooltip
                      description="Enter the product description"
                      position="right"
                    >
                      <button
                        aria-label="Information about the Description of the product"
                        style={toolTipStyle}
                      >
                        <Information aria-hidden={true} />
                      </button>
                    </Tooltip>
                  }
                >
                  {description}
                </Textarea>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleClose} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button variant="default" onClick={handleClickSave}>
                  Save
                </Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default CreateProduct;
