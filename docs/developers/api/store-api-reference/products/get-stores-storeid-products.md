---
title: "List products"
description: "Returns a list of products on the store. Soft-deleted products are excluded. Requires the `PRODUCTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List products

Returns a list of products on the store. Soft-deleted products are excluded. Requires the `PRODUCTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/products/'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

## Query parameters

<ParamField name="page" type="integer" default="1">

(range 1–∞, defaults to `1`)

</ParamField>

<ParamField name="limit" type="integer" default="25">

(range 1–100, defaults to `25`)

</ParamField>

<ParamField name="search" type="string">

(length 0–128)

</ParamField>

<ParamField name="productType" type="enum">

No description.

</ParamField>

<ParamField name="status" type="enum">

No description.

</ParamField>

<ParamField name="pricingModel" type="enum">

No description.

</ParamField>

<ParamField name="inStock" type="boolean">

No description.

</ParamField>

<ParamField name="categoryId" type="string">

(length 12–48)

</ParamField>

<ParamField name="sortBy" type="enum">

No description.

</ParamField>

<ParamField name="sortOrder" type="enum">

No description.

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/products/
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
    "items": [
      {
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
    ],
    "pagination": {
      "page": 1,
      "limit": 25,
      "total": 1,
      "totalPages": 1
    }
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
