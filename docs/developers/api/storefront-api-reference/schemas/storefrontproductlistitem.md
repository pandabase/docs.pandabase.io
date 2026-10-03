---
title: "StorefrontProductListItem"
description: "The StorefrontProductListItem object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# StorefrontProductListItem

<Api>

## Attributes

<ResponseField name="id" type="string" required>

Product ID

</ResponseField>

<ResponseField name="title" type="string" required>

Product title

</ResponseField>

<ResponseField name="subtitle" type="string">

No description.

</ResponseField>

<ResponseField name="handle" type="string" required>

URL-safe product handle

</ResponseField>

<ResponseField name="price" type="integer" required>

Price in cents

</ResponseField>

<ResponseField name="compareAtPrice" type="integer">

Original price in cents (for displaying discounts)

</ResponseField>

<ResponseField name="images" type="array of string" required>

Product image URLs

</ResponseField>

<ResponseField name="inStock" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="currency" type="string" required>

ISO 4217 currency code

</ResponseField>

<ResponseField name="productType" type="ProductType" required typeLink="/developers/api/storefront-api-reference/schemas/producttype">

(one of `SERIAL`, `SERVICE`, `ONE_TIME`, `PHYSICAL`, `SUBSCRIPTION`, `DIGITAL_DOWNLOAD`, `LICENSE_KEY`)

</ResponseField>

<ResponseField name="pricingModel" type="PricingModel" required typeLink="/developers/api/storefront-api-reference/schemas/pricingmodel">

(one of `STANDARD`, `PAY_WHAT_YOU_WANT`, `FREE`)

</ResponseField>

<ResponseField name="status" type="enum" required>

(one of `ACTIVE`)

</ResponseField>

<ResponseField name="minimumPrice" type="integer">

Minimum price for pay-what-you-want products (cents)

</ResponseField>

<ResponseField name="categories" type="array of CategoryRef" required>

No description.

</ResponseField>

<ObjectExample title={`StorefrontProductListItem`}>

```json
{
  "id": "string",
  "title": "string",
  "subtitle": "string",
  "handle": "string",
  "price": 0,
  "compareAtPrice": 0,
  "images": [
    "string"
  ],
  "inStock": true,
  "currency": "string",
  "productType": "SERIAL",
  "pricingModel": "STANDARD",
  "status": "ACTIVE",
  "minimumPrice": 0,
  "categories": [
    {
      "id": "string",
      "name": "string",
      "slug": "string"
    }
  ]
}
```

</ObjectExample>

</Api>
