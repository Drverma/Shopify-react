import Client from 'shopify-buy';

const client = Client.buildClient({
    storefrontAccessToken: '5214ca32a041092d1b0992370ee045ad',
    domain: 'shutupandgiftmedev.myshopify.com'
  });

export default client;