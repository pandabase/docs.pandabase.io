---
title: "Get product"
description: "Retrieves a product by ID. Requires the `PRODUCTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get product

Retrieves a product by ID. Requires the `PRODUCTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/products/{productId}'} baseUrl="https://api.pandabase.io/v2/core" />

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

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/products/:productId
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

## Response `404`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `false`)

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="404">

```json
{
  "ok": false,
  "error": "string"
}
```

</ResponseExample>

</Api>
