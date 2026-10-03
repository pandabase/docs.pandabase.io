---
title: "Get product"
description: "Returns full product details including variants, options, and categories."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get product

Returns full product details including variants, options, and categories.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/products/{productId}'} baseUrl="https://api.pandabase.io/v2/storefront" />

## Path parameters

<ParamField name="storeId" type="string" required>

Store ID (shp_ prefix)

</ParamField>

<ParamField name="productId" type="string" required>

Product ID (prd_ prefix)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/storefront/stores/:storeId/products/:productId
```

</RequestExample>

## Response `200`

Product details

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="data" type="StorefrontProduct" required typeLink="/developers/api/storefront-api-reference/schemas/storefrontproduct">

No description.

</ResponseField>

<ResponseExample title="200">

```json
{
  "ok": true,
  "data": {
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
}
```

</ResponseExample>

## Response `404`

Error response

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="error" type="string" required>

Error message

</ResponseField>

<ResponseExample title="404">

```json
{
  "ok": true,
  "error": "string"
}
```

</ResponseExample>

</Api>
