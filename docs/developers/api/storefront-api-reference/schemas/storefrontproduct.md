---
title: "StorefrontProduct"
description: "The StorefrontProduct object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# StorefrontProduct

<Api>

## Attributes

<ResponseField name="id" type="string" required>

No description.

</ResponseField>

<ResponseField name="title" type="string" required>

No description.

</ResponseField>

<ResponseField name="subtitle" type="string">

No description.

</ResponseField>

<ResponseField name="description" type="string">

Full product description

</ResponseField>

<ResponseField name="handle" type="string" required>

No description.

</ResponseField>

<ResponseField name="price" type="integer" required>

Price in cents

</ResponseField>

<ResponseField name="compareAtPrice" type="integer">

Original price in cents

</ResponseField>

<ResponseField name="images" type="array of string" required>

No description.

</ResponseField>

<ResponseField name="inStock" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="currency" type="string" required>

No description.

</ResponseField>

<ResponseField name="productType" type="ProductType" required typeLink="/developers/api/storefront-api-reference/schemas/producttype">

(one of `SERIAL`, `SERVICE`, `ONE_TIME`, `PHYSICAL`, `SUBSCRIPTION`, `DIGITAL_DOWNLOAD`, `LICENSE_KEY`)

</ResponseField>

<ResponseField name="message" type="string">

Post-purchase message shown to customer

</ResponseField>

<ResponseField name="pricingModel" type="PricingModel" required typeLink="/developers/api/storefront-api-reference/schemas/pricingmodel">

(one of `STANDARD`, `PAY_WHAT_YOU_WANT`, `FREE`)

</ResponseField>

<ResponseField name="status" type="enum" required>

(one of `ACTIVE`)

</ResponseField>

<ResponseField name="minimumPrice" type="integer">

Minimum price for pay-what-you-want (cents)

</ResponseField>

<ResponseField name="maxPerCustomer" type="integer">

Maximum quantity per customer

</ResponseField>

<ResponseField name="fulfillmentMode" type="enum">

How the product is delivered after purchase (one of `MANAGED_LICENSE`, `LICENSE_POOL`, `LICENSE_WEBHOOK`, `INSTANT_DOWNLOAD`, `REDIRECT`, `MANUAL`)

</ResponseField>

<ResponseField name="availableFrom" type="date-time">

Start of availability window (format `date-time`)

</ResponseField>

<ResponseField name="availableUntil" type="date-time">

End of availability window (format `date-time`)

</ResponseField>

<ResponseField name="billingInterval" type="enum">

Subscription billing interval (one of `WEEKLY`, `MONTHLY`, `YEARLY`)

</ResponseField>

<ResponseField name="billingAnchor" type="integer">

Day of month/week for billing

</ResponseField>

<ResponseField name="trialDays" type="integer">

Number of free trial days

</ResponseField>

<ResponseField name="options" type="array of object" required>

Product options (sorted by position)

<Expandable title="items">

<ResponseField name="id" type="string" required>

No description.

</ResponseField>

<ResponseField name="name" type="string" required>

Option name (e.g. "License Type")

</ResponseField>

<ResponseField name="values" type="array of string" required>

Available values (e.g. ["Personal", "Commercial"])

</ResponseField>

<ResponseField name="position" type="integer" required>

No description.

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="variants" type="array of object" required>

Product variants (sorted by position)

<Expandable title="items">

<ResponseField name="id" type="string" required>

No description.

</ResponseField>

<ResponseField name="title" type="string" required>

No description.

</ResponseField>

<ResponseField name="slug" type="string">

No description.

</ResponseField>

<ResponseField name="description" type="string">

No description.

</ResponseField>

<ResponseField name="sku" type="string">

No description.

</ResponseField>

<ResponseField name="options" type="object" required>

Map of option name to selected value

<Expandable title="properties">


</Expandable>

</ResponseField>

<ResponseField name="price" type="integer" required>

Variant price in cents

</ResponseField>

<ResponseField name="compareAtPrice" type="integer">

No description.

</ResponseField>

<ResponseField name="images" type="array of string" required>

No description.

</ResponseField>

<ResponseField name="inStock" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="quantity" type="integer">

Available stock (null if not tracking)

</ResponseField>

<ResponseField name="trackStock" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="position" type="integer" required>

No description.

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="categories" type="array of CategoryRef" required>

No description.

</ResponseField>

<ObjectExample title={`StorefrontProduct`}>

```json
{
  "id": "string",
  "title": "string",
  "subtitle": "string",
  "description": "string",
  "handle": "string",
  "price": 0,
  "compareAtPrice": 0,
  "images": [
    "string"
  ],
  "inStock": true,
  "currency": "string",
  "productType": "SERIAL",
  "message": "string",
  "pricingModel": "STANDARD",
  "status": "ACTIVE",
  "minimumPrice": 0,
  "maxPerCustomer": 0,
  "fulfillmentMode": "MANAGED_LICENSE",
  "availableFrom": "2024-01-01T00:00:00Z",
  "availableUntil": "2024-01-01T00:00:00Z",
  "billingInterval": "WEEKLY",
  "billingAnchor": 0,
  "trialDays": 0,
  "options": [
    {
      "id": "string",
      "name": "string",
      "values": [
        "string"
      ],
      "position": 0
    }
  ],
  "variants": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "description": "string",
      "sku": "string",
      "options": {},
      "price": 0,
      "compareAtPrice": 0,
      "images": [
        "string"
      ],
      "inStock": true,
      "quantity": 0,
      "trackStock": true,
      "position": 0
    }
  ],
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
