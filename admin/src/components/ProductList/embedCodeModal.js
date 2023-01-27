import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { Accordion, AccordionToggle, AccordionContent } from '@strapi/design-system/Accordion';

import { stripeResponse, ProductRespone } from './constant';

const EmbedCodeModal = ({
  productId,
  isVisibleEmbedCode,
  handleCloseEmbedCode,
  isSubscription,
}) => {
  const [expandProduct, setExpandProduct] = useState(false);
  const [expandPayment, setExpandPayment] = useState(false);

  return (
    <Box>
      {isVisibleEmbedCode && (
        <ModalLayout onClose={handleCloseEmbedCode} labelledBy="title">
          <ModalHeader>
            <Flex direction="column" alignItems="start">
              <Box>
                <Typography
                  fontWeight="bold"
                  variant="beta"
                  textColor="neutral800"
                  as="h2"
                  id="title"
                >
                  Embed Code
                </Typography>
              </Box>
              <Box>
                <Typography variant="omega">
                  Enable the Stripe Payment button in your frontend app by following the simple
                  steps mentioned below:
                </Typography>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step&nbsp;1:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Embed the script tag in the html header section of your product list, payment
                  success and payment failure pages:
                </Typography>
              </Box>
            </Flex>
            <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
              <Typography>
                {`
                <script
                  type="text/javascript"
                  src="${window.location.origin}/plugins/strapi-stripe/static/stripe.js"
                >
                  
                </script>
                `}
              </Typography>
            </Box>
            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step&nbsp;2a:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Show the “{isSubscription ? 'Subscribe' : 'BuyNow'}” button next to your product
                  details on the product list page.
                </Typography>
              </Box>
            </Flex>
            <Box paddingRight={2} paddingTop={1}>
              <Typography variant="epsilon">
                If you provide the email address of the user, it will pre-populate the email field.
              </Typography>
            </Box>
            <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
              <Typography>
                {`
                <button class="css style" type="button" class="SS_ProductCheckout"  data-id="${productId}" data-email="<userEmail>" data-url="${
                  window.location.origin
                }">
                ${isSubscription ? 'Subscribe' : 'BuyNow'}
                </button>
                `}
              </Typography>
            </Box>
            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step&nbsp;2b:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Optionally, you can fetch product details such as title, description, image and
                  price from the API end-point mentioned below and show them.
                </Typography>
              </Box>
            </Flex>
            <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
              <Typography>
                {`const response = await axios.get(
                   " ${window.location.origin}/strapi-stripe/getProduct/${productId}"
                  ) `}
              </Typography>
            </Box>
            <Box padding={4} background="neutral100" marginBottom={4}>
              <Accordion
                expanded={expandProduct}
                toggle={() => setExpandProduct(s => !s)}
                id="acc-1"
                size="S"
              >
                <AccordionToggle title="Sample Product response object" />
                <AccordionContent>
                  <Box padding={3}>
                    <Typography>
                      <pre>{JSON.stringify(ProductRespone, null, 2)}</pre>
                    </Typography>
                  </Box>
                </AccordionContent>
              </Accordion>
            </Box>

            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step&nbsp;3:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Optionally, you can show payment transaction status and details on your payment
                  success (or error) page. Use the API call mentioned below:
                </Typography>
              </Box>
            </Flex>
            <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
              <Box>
                <Typography>
                  {`
                  const params = new URLSearchParams(document.location.search);
                  `}
                </Typography>
              </Box>
              <br />
              <Box>
                <Typography>{`const checkoutSessionId = params.get("sessionId");`}</Typography>
              </Box>
              <br />

              <Typography>
                {`const response = await axios.get(${
                  window.location.origin
                }/strapi-stripe/retrieveCheckoutSession/${'$'}{checkoutSessionId}
                    )
                   `}
              </Typography>
            </Box>
            <Box padding={4} background="neutral100" marginBottom={4}>
              <Accordion
                expanded={expandPayment}
                toggle={() => setExpandPayment(s => !s)}
                id="acc-1"
                size="S"
              >
                <AccordionToggle title="Sample stripe payment response object" />
                <AccordionContent>
                  <Box padding={3}>
                    <Typography>
                      <pre>{JSON.stringify(stripeResponse, null, 2)}</pre>
                    </Typography>
                  </Box>
                </AccordionContent>
              </Accordion>
            </Box>
            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step&nbsp;4:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Optionally, You can get the subscription status of the user, by using the below
                  API call:
                </Typography>
              </Box>
            </Flex>
            <Box background="neutral100" padding={2} marginTop={4} marginBottom={4}>
              <Typography>
                {`
                const response = await axios.get(${window.location.origin}/strapi-stripe/getSubscriptionStatus/<userEmail>)
                `}
              </Typography>
            </Box>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseEmbedCode} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={<Button onClick={handleCloseEmbedCode}>Finish</Button>}
          />
        </ModalLayout>
      )}
    </Box>
  );
};

EmbedCodeModal.propTypes = {
  productId: PropTypes.any.isRequired,
  isVisibleEmbedCode: PropTypes.any.isRequired,
  handleCloseEmbedCode: PropTypes.func.isRequired,
  isSubscription: PropTypes.any.isRequired,
};

export default EmbedCodeModal;
