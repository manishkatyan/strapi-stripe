<div align="center">
   <img alt="stripe payment title" width="60" src="https://higheredlab.com/wp-content/uploads/strapi-stripe-logo-150x150.png">
</div>
<h1 align="center">Stripe Payments</h1>
<p align="center">Online payments and subscriptions made simple, secure and fast.</p>
<p align="center">This free plugin enables you to accept online payments and create subscriptions using Credit and Debit Cards, SEPA Direct Debit, ACH Direct Debit, AliPay, Apple pay and Google pay on your Strapi app via Stripe.</p>

<br />

<p align="center">
  <a href="https://www.npmjs.com/package/strapi-stripe">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/manishkatyan/strapi-stripe?label=npm&logo=npm">
</a>
<a href="https://www.npmjs.org/package/strapi-stripe">
<img src="https://img.shields.io/npm/dm/strapi-stripe.svg" alt="Monthly download on NPM" />
</a>
<a href="https://github.com/manishkatyan/strapi-stripe/actions/workflows/eslint.yml/badge.svg">
<img src="https://github.com/manishkatyan/strapi-stripe/actions/workflows/eslint.yml/badge.svg" alt="EsLint" />
</a>
</p>

<br>

<img style="width: 100%; height: auto;" src="/static/strapi-stripe-payment.gif" alt="strapi-stripe-payment" /> <br/>

<br/><br/>

## Stripe Payment plugin for Strapi

[Stripe](https://stripe.com/) Online payment processing for internet businesses. It's a suite of payment APIs that powers commerce for online businesses of all sizes.

[Strapi](https://strapi.io/) is the leading open-source headless Content Management System. It’s 100% JavaScript, fully customizable and developer-first.

## Overview: Start accepting online payments

The Stripe Payments plugin enables you to accept debit and credit card payments on your Strapi website or app.

Setting up the plugin is super easy and can be completed within 10 minutes.

1. Enter your Stripe API credentials.
1. Create some products, for which the plugin will automtically generate the payment button code.
1. Embed the payment button code on your product listing page.
1. On clicking the payment button, your customer will be redirected to the payment page, securely hosted by Stripe.
1. On making payment, your customer is redirected back to your checkout result page that you can customize.
1. Every transaction is recorded, giving you visibility and insights.

That's all you need to do to turn your Strapi website or application into an e-commerce site!

<br/><br/>

## ✨ Features

1. Accept payments via Credit and Debit Cards, SEPA Direct Debit, ACH Direct Debit, AliPay, Apple pay and Google pay.
2. Request one-time payments or create subscriotions on your Strapi application.
3. Quick installation and setup. Run in test mode for debugging.
4. Automatically creates payment buttons for you to embed anywhere on your site.
5. Add multiple “Buy Now” payment buttons on a page.
6. View transaction details for all your products from your Strapi admin dashboard.
7. Specify a custom name, image and description for a product.
8. Setup email notification to the buyer and seller (aka you) after the purchase.
9. Customize the message on the checkout page
10. Configure multiple currencies

<br/><br/>

## 🖐 Requirements

The requirements to install the Stripe Payments plugin is the same as those to install Strapi.

Please refer to the official Strapi installation requirement doc here: [Installation Requirements](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

**Minimum environment requirements**

- Node.js `>=18.x.x`
- NPM `>=8.x.x`

We are following the [official Node.js releases timelines](https://nodejs.org/en/about/releases/).

**Supported Strapi versions**:

- Strapi v4.11.1 (recently tested)

- Strapi v4.x

> The Stripe Payments plugin is designed for **Strapi v4.x**. It won't work with Strapi v3.x.

<br/><br/>

## ⏳ Installation

> From strapi-stripe plugin version 2.6.1 onwards, we have renamed these two tables `strapi-stripe_strapi-stripe-payment` `strapi-stripe_strapi-stripe-product` to `strapi-stripe_ss-payment` `strapi-stripe_ss-product` for mysql server compatability.

> If you are using the strapi-stripe plugin verion 2.6.0 or any other below versions, please do take the data backup of these two table `strapi-stripe_strapi-stripe-payment` `strapi-stripe_strapi-stripe-product`, before updating to new version.

Use **npm** to install this plugin within your Strapi project.

[Refer to this doc to install npm](https://docs.npmjs.com/cli/v6/commands/npm-install)

```bash
npm i strapi-stripe
```

After successful installation you would need to Add .env file in your root directory and add the following keys in it.

```bash
STRAPI_ADMIN_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRAPI_ADMIN_LIVE_STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRAPI_ADMIN_TEST_STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> Note: You can get the STRAPI_ADMIN_API_TOKEN from your Strapi Admin Panel. Go to ` Settings -> Global settings ->API Tokens -> Create new API Token`. Make Sure to Select `Token duration-> Unlimited` and `Token type -> Full Access` and save it Copy the token and add it in .env file.

> Note: Please Make sure to add the .env variables and verify them before starting the server.

To Build a fresh package that includes the Stripe Payments plugin UI. Execute the commands below:

```bash
# with npm (option 1)
$ npm run build
$ npm run develop

# with npx (option 2)
$ npx strapi  build
$ npx strapi  develop

```

The **Payment** plugin should appear in the **Plugins** section of the Strapi sidebar after you run the app again.

Now you are ready to accept online payments via Stripe on your Strapi website 🎉

<br/><br/>

## 🔧 Configuration

You can easily configure the Stripe Payments plugin to connect with your Stripe Account.

- Go to `Strapi Settings -> Payment -> Configuration`.
- On the configiration page, Enter All the fields.
- Using `Live Mode` Switch Box, you can easily toggle between Stripe Test and Live mode.
- Click on Save to save the Stripe confiiguration.

<br/><br/>
<img style="width: 100%; height: auto;" src="/static/strapi-stripe-configuration.gif" alt="strapi-stripe-Configuration" />
<br/><br/>

<br/>

## Create a Product

After configuring Stripe, you can create products.

The products or subscription that you would create via the plugin will also automatically get created in Stripe.

Follow the steps below to create a product:

1. Click on Payment in the **Plugins** section.
1. Click on Add Product.
1. choose Payment type,One-Time or Subscription.
   - For One-Time, you would charge your customer only one-time.
   - For a subscription, you would charge your customer every month.
1. Enter all the required fields.
1. Click on create button to create a product or subscription.

<br/><br/>
<img style="width: 100%; height: auto;" src="/static/strapi-stripe-create.gif" alt="strapi-stripe-product-create" />
<br/><br/>

<br/>

## Embed Payment Button Code

After creating a product, click on the Embed Code icon.

You would see a popup with easy-to-follow steps, detailed below, to embed the Payment button on your product listing page.

- Embed the script tag to Your product listing, payment success and payment failure pages.
- Embed the Payment Button Code on your product listing page.
- You can customize the text of the Payment Button (example - Buy Now, Pay Now) and style using the appropriate css.

Your product listing page is where you would show all your products for your customers to browse through and purcase. Setting up the product listing page is beyond the scope of this plugin as that would depend on your choice for the frontend.

<br/>

## Accept Online Payments

After you embedding the Payment Button on your product list page, you are ready to accept online payments.

<br/>

## Payment Reports

The Stripe Payments plugin also provides the payment transaction report. To view the transaction report, click on Report Icon in the action column.

<br/><br/>
<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe-payment_report-v2.gif" alt="strapi-stripe-payment-report" />
<br/><br/>

## Webhook URL

The stripe Payments plugins also provides ability to add webhook URL. The response from Stripe will be posted to provided Webhook URL.
<br/>
To test this Functionality visit this [Link](https://webhook.site/)

1. Copy the unique URL and paste it in webhook URL field.
2. Whenever successfull stripe payment happens webhook URL recieve stripe data.
   <br/><br/>

## Subscription Payment Status

The stripe Payments plugins also provides ability to check the status of subscription using customer Email.
<br/>
You can easily embed the subscription status on your website, using plugin Api-End point.
<br/><br/>
<img style="width: 100%; height: auto;" src="/static/strapi-stripe-embed.png" alt="strapi-stripe-embed" />

<br/>

> You can get user email from payment report.

<br/><br/>

<br/>

## 📝 License

[MIT License](LICENSE.md)

Copyright © 2022 [HigherEdLab.com](https://higheredlab.com/)
