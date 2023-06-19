// @ts-nocheck
import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Stack,
  Flex,
  Button,
  Typography,
} from '@strapi/design-system';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import Trash from '@strapi/icons/Trash';
import { deleteStripeProduct } from '../../utils/apiCalls';

const apiToken = process.env.STRAPI_ADMIN_API_TOKEN;

const ConfirmDialog = ({
  isConfirmVisible,
  handleCloseModal,
  productId,
  stripeProductId,
  handleDeleteProductClick,
}) => {
  const handleDelete = async () => {
    const response = await deleteStripeProduct(productId, stripeProductId, apiToken);
    if (response.status === 200) {
      handleDeleteProductClick();
      handleCloseModal();
    }
  };
  return (
    <Dialog title="Confirmation" isOpen={isConfirmVisible}>
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">
              Are you sure you want to delete this ?
              <br />
              This will only delete from the database.
            </Typography>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={handleCloseModal} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button variant="danger-light" startIcon={<Trash />} onClick={handleDelete}>
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
};

export default ConfirmDialog;
