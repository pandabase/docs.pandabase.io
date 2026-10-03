---
title: "Update product"
description: "Updates an existing product. Variants and options on the request are upserted by ID. Requires the `PRODUCTS_WRITE` scope."
layout: api
method: PATCH
icon: pencil
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Update product

Updates an existing product. Variants and options on the request are upserted by ID. Requires the `PRODUCTS_WRITE` scope.

<Api>

<Endpoint method="PATCH" path={'/stores/{storeId}/products/{productId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="productId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="title" type="string">

(length 1–256)

</ParamField>

<ParamField name="subtitle" type="string or null">

No description.

</ParamField>

<ParamField name="description" type="string or null">

No description.

</ParamField>

<ParamField name="productType" type="enum">

No description.

</ParamField>

<ParamField name="price" type="integer">

(range 0–∞)

</ParamField>

<ParamField name="compareAtPrice" type="integer or null">

No description.

</ParamField>

<ParamField name="images" type="array of string">

No description.

</ParamField>

<ParamField name="message" type="string or null">

No description.

</ParamField>

<ParamField name="inStock" type="boolean">

No description.

</ParamField>

<ParamField name="fulfillmentMode" type="enum or null">

No description.

</ParamField>

<ParamField name="pricingModel" type="enum">

No description.

</ParamField>

<ParamField name="status" type="enum">

No description.

</ParamField>

<ParamField name="minimumPrice" type="integer or null">

No description.

</ParamField>

<ParamField name="maxPerCustomer" type="integer or null">

No description.

</ParamField>

<ParamField name="availableFrom" type="date-time or null">

No description.

</ParamField>

<ParamField name="availableUntil" type="date-time or null">

No description.

</ParamField>

<ParamField name="downloadUrl" type="string or null">

No description.

</ParamField>

<ParamField name="redirectUrl" type="string or null">

No description.

</ParamField>

<ParamField name="keyFormat" type="enum or null">

No description.

</ParamField>

<ParamField name="customPrefix" type="string or null">

No description.

</ParamField>

<ParamField name="maxActivations" type="integer or null">

No description.

</ParamField>

<ParamField name="licenseDuration" type="enum or null">

No description.

</ParamField>

<ParamField name="revokeOnRefund" type="boolean">

No description.

</ParamField>

<ParamField name="lowStockThreshold" type="integer or null">

No description.

</ParamField>

<ParamField name="webhookUrl" type="string or null">

No description.

</ParamField>

<ParamField name="webhookSecret" type="string or null">

No description.

</ParamField>

<ParamField name="billingInterval" type="enum or null">

No description.

</ParamField>

<ParamField name="billingAnchor" type="enum or null">

No description.

</ParamField>

<ParamField name="trialDays" type="integer or null">

No description.

</ParamField>

<ParamField name="licenseKeys" type="array of string">

No description.

</ParamField>

<ParamField name="variants" type="array of object">

No description.

<Expandable title="items">

<ParamField name="id" type="string">

(length 12–48)

</ParamField>

<ParamField name="title" type="string">

(length 1–256)

</ParamField>

<ParamField name="slug" type="string or null">

No description.

</ParamField>

<ParamField name="description" type="string or null">

No description.

</ParamField>

<ParamField name="sku" type="string or null">

No description.

</ParamField>

<ParamField name="options" type="object">

No description.

</ParamField>

<ParamField name="price" type="integer">

(range 0–∞)

</ParamField>

<ParamField name="compareAtPrice" type="integer or null">

No description.

</ParamField>

<ParamField name="images" type="array of string">

No description.

</ParamField>

<ParamField name="inStock" type="boolean">

No description.

</ParamField>

<ParamField name="quantity" type="integer or null">

No description.

</ParamField>

<ParamField name="trackStock" type="boolean">

No description.

</ParamField>

<ParamField name="position" type="integer">

(range 0–∞)

</ParamField>

</Expandable>

</ParamField>

<ParamField name="options" type="array of object">

No description.

<Expandable title="items">

<ParamField name="name" type="string" required>

(length 1–128)

</ParamField>

<ParamField name="values" type="array of string" required>

No description.

</ParamField>

<ParamField name="position" type="integer" default="0">

(range 0–∞, defaults to `0`)

</ParamField>

</Expandable>

</ParamField>

<ParamField name="categoryIds" type="array of string">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X PATCH https://api.pandabase.io/v2/core/stores/:storeId/products/:productId \
  -H "Content-Type: application/json" \
  -d '{"title":"string","subtitle":"string","description":"string","productType":"SUBSCRIPTION","price":0,"compareAtPrice":0,"images":["string"],"message":"string","inStock":true,"fulfillmentMode":"MANAGED_LICENSE","pricingModel":"STANDARD","status":"DRAFT","minimumPrice":0,"maxPerCustomer":0,"availableFrom":"2024-01-01T00:00:00Z","availableUntil":"2024-01-01T00:00:00Z","downloadUrl":"string","redirectUrl":"string","keyFormat":"ALPHANUMERIC","customPrefix":"string","maxActivations":0,"licenseDuration":"THIRTY_DAYS","revokeOnRefund":true,"lowStockThreshold":0,"webhookUrl":"string","webhookSecret":"string","billingInterval":"WEEKLY","billingAnchor":"IMMEDIATELY","trialDays":0,"licenseKeys":["string"],"variants":[{"id":"string","title":"string","slug":"string","description":"string","sku":"string","options":null,"price":0,"compareAtPrice":0,"images":["string"],"inStock":true,"quantity":0,"trackStock":true,"position":0}],"options":[{"name":"string","values":["string"],"position":0}],"categoryIds":["string"]}'
```

</RequestExample>

## Response `200`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `true`)

</ResponseField>

<ResponseField name="data" type="object" required>

No description.

</ResponseField>

<ResponseExample title="200">

```json
{
  "ok": true,
  "data": {
    "id": "prd_8h4t6sqzy3x9w5n2k1m0vqbf",
    "title": "Pro Plan",
    "subtitle": "Everything you need to ship",
    "description": "Full access to the platform. Unlimited stores, no transaction caps.",
    "handle": "pro-plan",
    "price": 2900,
    "compareAtPrice": 4900,
    "images": [
      "https://cdn.pandabase.io/products/img_xxx.jpg"
    ],
    "inStock": true,
    "currency": "USD",
    "productType": "DIGITAL",
    "fulfillmentMode": "LICENSE_POOL",
    "pricingModel": "STANDARD",
    "status": "ACTIVE",
    "minimumPrice": null,
    "maxPerCustomer": null,
    "availableFrom": null,
    "availableUntil": null,
    "revokeOnRefund": true,
    "options": [],
    "variants": [],
    "categories": []
  }
}
```

</ResponseExample>

## Response `400`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `false`)

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="400">

```json
{
  "ok": false,
  "error": "string"
}
```

</ResponseExample>

</Api>
