# Strapi-stripe

[Stripe](https://stripe.com/) Online payment processing for internet businesses. It's a suite of payment APIs that powers commerce for online businesses of all sizes.

[Strapi](https://strapi.io/) is the leading open-source headless CMS. It’s 100% JavaScript, fully customizable and developer-first.

## Stripe Payment

The Stripe Payments plugin allows you to accept credit card payments via Stripe payment gateway on your Strapi site with surprising ease and efficiency.

Setting up the plugin is super easy and can be completed within 10 minutes. 

1. After installing the plugin, enter your Stripe API credentials.
1. Create some products, for which the plugin will automtically generate the payment button code. 
1. Embed the payment button code on your product listing page. 
1. On clicking the payment button, your customer will be redirected to the payment page, securely hosted by Stripe, to make an online payment. 
1. On making payment, your customer is redirected back to your checkout result page for success (or failure) message that you can customize.
1. Every transaction is recorded, giving you visibility and insights.

That's all you need to do to start accepting payment on your Stripe website!

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

- Go to `Strapi Settings -> Stripe -> Configuration`.
- On the configiration page, Enter All the fields.
- Using `Live Mode` checkBox, you can easily toggle between Stripe Test and Live mode.
- Click on Save to save the Stripe confiiguration.

<br/><br/>
<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe-configuration.gif" alt="strapi-stripe-Configuration" />
<br/><br/>

<br/>

## Create a Product

After configuring Stripe, you can create products. The products that you would create via the plugin will also automatically get created in Stripe.

- Click on Stripe in the **Plugins** section.
- Click on Add Product.
- Enter Title, Price, Image URL and Description. 
- Click on Save button to create a product.

<br/><br/>
<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe-product_create.gif" alt="strapi-stripe-product-create" />
<br/><br/>

<br/>

## Embed Payment Button Code

After adding a product, click on the Embed Code icon. 

You would see a popup with the easy-to-follow steps to embed the Payment Button on your product listing page.

- Embed the script tag to Your product listing, payment success and payment failure pages.
- Embed the Payment Button Code on your product listing page.
- You can customize the text of the Payment Button (example - Buy Now, Pay Now) and style using the appropriate css. 

<br/>

## Accept Online Payment

After you embedding the Payment Button on your product list page, you are ready to accept online payments.

<br/><br/>
<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe_payment.gif" alt="strapi-stripe-payment" />
<br/><br/>

<br/>

## Payment Reports

The Stripe Payments plugin also provides the payment transaction report. To view the transaction report, click on Report Icon in the action column.

<br/><br/>
<img style="width: 100%; height: auto;" src="https://higheredlab.com/wp-content/uploads/strapi-stripe-payment_report.gif" alt="strapi-stripe-payment-report" />
<br/><br/>

<br/>

## 📝 License

[MIT License](LICENSE.md)

Copyright (c) [HigherEdLab.com](https://higheredlab.com/).
