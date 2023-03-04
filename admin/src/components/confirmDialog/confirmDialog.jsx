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

const ConfirmDialog = ({
  isConfirmVisible,
  handleCloseModal,
  productId,
  stripeProductId,
  handleDeleteProductClick,
}) => {
  const handleDelete = async (productId, stripeProductId) => {
    const response = await deleteStripeProduct(productId, stripeProductId);
    handleCloseModal();
    handleDeleteProductClick();
  };
  return (
    <Dialog onClose={handleCloseModal} title="Confirmation" isOpen={isConfirmVisible}>
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">Are you sure you want to delete this?</Typography>
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
          <Button
            variant="danger-light"
            startIcon={<Trash />}
            onClick={() => handleDelete(productId, stripeProductId)}
          >
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
};

export default ConfirmDialog;
