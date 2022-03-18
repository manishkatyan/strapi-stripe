/**
 *
 * This component is the responsible for opening modal when the Add Product
 * button clicks.
 *
 */

import React from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";

const CreateProduct = ({ isVisible, handleClose }) => {
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
            >
              Title
            </Typography>
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleClose} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button>Create</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default CreateProduct;
