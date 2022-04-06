import React, { useState } from "react";
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "@strapi/design-system/ModalLayout";
import { Typography } from "@strapi/design-system/Typography";
import { Button } from "@strapi/design-system/Button";
import { Flex } from "@strapi/design-system/Flex";
import { Box } from "@strapi/design-system/Box";
import { stripeResponse, ProductRespone } from "./constant";
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
} from "@strapi/design-system/Accordion";

const EmbedCodeModal = ({
  productId,
  isVisibleEmbedCode,
  handleCloseEmbedCode,
}) => {
  const [expandProduct, setExpandProduct] = useState(false);
  const [expandPayment, setExpandPayment] = useState(false);
  return (
    <>
      {isVisibleEmbedCode && (
        <ModalLayout onClose={handleCloseEmbedCode} labelledBy="title">
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Embed Code
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step1:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Add this script tag, in product page, stripe susccess page,
                  and stripe cancel page.if you already added ignore this step.
                </Typography>
              </Box>
            </Flex>
            <Box
              background="neutral100"
              padding={2}
              marginTop={4}
              marginBottom={4}
            >
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
                <Typography variant="epsilon">Step2:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Use this api end point to get product Detail.
                </Typography>
              </Box>
            </Flex>
            <Box
              background="neutral100"
              padding={2}
              marginTop={4}
              marginBottom={4}
            >
              <Typography>
                {`const response = await axios.get(
                   " ${window.location.origin}/strapi-stripe/getProduct/${productId}"
                  ) `}
              </Typography>
            </Box>
            <Box padding={4} background="neutral100" marginBottom={4}>
              <Accordion
                expanded={expandProduct}
                onToggle={() => setExpandProduct((s) => !s)}
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
                <Typography variant="epsilon">Step3:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  Add Payment button to your code.
                </Typography>
              </Box>
            </Flex>
            <Box
              background="neutral100"
              padding={2}
              marginTop={4}
              marginBottom={4}
            >
              <Typography>
                {`
                <button class="Your style" type="button" id="SS_ProductCheckout"  data-id="${productId}" data-url="${window.location.origin}">
                PayNow
                </button>
                `}
              </Typography>
            </Box>
            <Flex alignItems="top">
              <Box paddingRight={2}>
                <Typography variant="epsilon">Step4:</Typography>
              </Box>
              <Box>
                <Typography variant="epsilon">
                  If you want to show the extra information in success page,
                  payment details,etc. Use this api end point.
                </Typography>
              </Box>
            </Flex>
            <Box
              background="neutral100"
              padding={2}
              marginTop={4}
              marginBottom={4}
            >
              <Box>
                <Typography>
                  {`
                  const params = new URLSearchParams(document.location.search);
                  `}
                </Typography>
              </Box>
              <br />
              <Box>
                <Typography>
                  {`const checkoutSessionId = params.get("sessionId");`}
                </Typography>
              </Box>
              <br />

              <Typography>
                {`const response = await axios.get(${
                  window.location.origin
                }/strapi-stripe/retrieveCheckoutSession/${"$"}{checkoutSessionId}
                    )
                   `}
              </Typography>
            </Box>
            <Box padding={4} background="neutral100">
              <Accordion
                expanded={expandPayment}
                onToggle={() => setExpandPayment((s) => !s)}
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
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseEmbedCode} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              <>
                <Button onClick={handleCloseEmbedCode}>Finish</Button>
              </>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default EmbedCodeModal;
