# Strapi-stripe

[Stripe](https://stripe.com/) Online payment processing for internet businesses. It's a suite of payment APIs that powers commerce for online businesses of all sizes.

[Strapi](https://strapi.io/) is the leading open-source headless CMS. It’s 100% JavaScript, fully customizable and developer-first.

## Stripe Payment

The Stripe Payments plugin allows you to accept credit card payments via Stripe payment gateway on your Strapi site with surprising ease and efficiency.

Setting up the plugin is super easy. 

After installing the plugin, enter your Stripe API credentials in the plugin Settings.

You create the products that you want to sell online. The plugin will automtically generate code to embed the payment button for those products. 

You would embed the automatically generated payment button code next to the product that you want to sell online.

On clicking the payment button, your customer will be redirected to the payment page, securely hosted by Stripe, to make online payment. 

After payment success (or failure), your customer is redirected to the easily customizable `Checkout Result` page to get more information about the transaction.

Eevry transaction is recorded in the Report section of the plugin, giving you an overview of all transactions

To test the plugin, you can toggle the test mode, prividing test API credentials from Stripe.

<a href="https://www.npmjs.com/package/strapi-stripe">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/manishkatyan/strapi-stripe?label=npm&logo=npm">
</a>
<a href="https://www.npmjs.org/package/strapi-stripe">
<img src="https://img.shields.io/npm/dm/strapi-stripe.svg" alt="Monthly download on NPM" />
</a>

<br/><br/>

## ✨ Features

- Quick installation and setup.
- Easily take payment for a product that you sell on your site.
- Create buy buttons for your products or services on the fly and embed it anywhere on your site using a user-friendly embed code.
- Ability to add multiple “Buy Now” buttons to a page.
- View transaction details for all your products from your Strapi admin dashboard.
- Ability to specify a custom name, photo and description for a product.
- Ability to configure a notification email to be sent to the buyer and seller after the purchase.
- Ability to customize the message on the Checkout Result page.
- Ability to configure the currency type for the payment.

<br/><br/>

<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe_payment.gif" alt="strapi-stripe-payment" /> <br/>

<br/><br/>

## ⚙️ Versions

- **Strapi v4**

<br/><br/>

## 🖐 Requirements

The requireemnts to install the Strapi-Stripe plugin is same as those to install Strapi.

Please refer to the official Strapi installation requirement doc here: [Installation Requirements](https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html).

**Minimum environment requirements**

- Node.js `>=14.x.x`
- NPM `>=6.x.x`

We are following the [official Node.js releases timelines](https://nodejs.org/en/about/releases/).

**Supported Strapi versions**:

- Strapi v4.1.5 (recently tested)
- Strapi v4.x

> The Stripe Payments plugin is designed for **Strapi v4.x**. It won't work with Strapi v3.x.

<br/><br/>

## ⏳ Installation

Use **npm** to install this plugin within your Strapi project (recommended).

[Refer to this doc to install npm](https://docs.npmjs.com/cli/v6/commands/npm-install)

```bash
npm i strapi-stripe
```

After successful installation you would need to build a fresh package that includes the Stripe Payments plugin UI. Please execute the commands below:

```bash
# with npm (option 1)
$ npm run build
$ npm run develop

# with npx (option 2)
$ npx strapi  build
$ npx strapi  develop
```

The **Stripe** plugin should appear in the **Plugins** section of Strapi sidebar after you run app again.

Now you are ready to accept online payment via Stripe on your Strapi website 🎉

<br/><br/>

## 🔧 Configuration

You can easily configure the Stripe Payments plugin to connect with your Stripe Account.

- Go to `Strapi Settings -> STRIPE -> Configuration`.
- On the configiration page, Enter All the fields.
- You can toggle between Stripe test mode and Stripe Live mode. Using Live Mode CheckBox.
- Click on save to save the Stripe Confiiguration.

<br/><br/>
<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe-configuration.gif" alt="strapi-stripe-Configuration" />
<br/><br/>

<br/>

## Create Product

Once successfully Configured stripe in strapi settting, now you can create products in stripe.

- click on Stripe in the **Plugins** section.click on Add Product.
- Enter Title, Price, Image URL and Description. 
- Click on Save button to create a product in Strapi as well as Stripe.

<br/><br/>
<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe-product_create.gif" alt="strapi-stripe-product-create" />
<br/><br/>

<br/>

## Embed code

Once you add a product, click on the Embed Code. You would see a popup with the easy-to-follow steps to embed the payment button on your Stripe frontend application.

- Embed the Script tag to Your Product page, Payment Success page and Payment failure page.
- Embed the Payment button Code on your Product page.

<br/>

## Stripe Payment

After you Embed the Payment button code to your Stripe frontend application, you are ready to accept online payments.

<br/><br/>
<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe_payment.gif" alt="strapi-stripe-payment" />
<br/><br/>

<br/>

## Stripe Payment Report

The Stripe Payments plugin also provides the payment transaction history. To view the transaction report: 

- click on Report Icon in the action column.
  <br/><br/>
  <img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe-payment_report.gif" alt="strapi-stripe-payment-report" />
  <br/><br/>

<br/>

## 📝 License

[MIT License](LICENSE.md)

Copyright (c) [HigherEdLab.com](https://higheredlab.com/).
