---
title: "List products"
description: "Returns a paginated list of active products. Supports filtering, searching, and sorting. Only active products are returned — draft and deleted products are never included."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List products

Returns a paginated list of active products. Supports filtering, searching, and sorting. Only active products are returned — draft and deleted products are never included.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/products'} baseUrl="https://api.pandabase.io/v2/storefront" />

## Path parameters

<ParamField name="storeId" type="string" required>

Store ID (shp_ prefix)

</ParamField>

## Query parameters

<ParamField name="page" type="integer" default="1">

(range 1–∞, defaults to `1`)

</ParamField>

<ParamField name="limit" type="integer" default="25">

(range 1–100, defaults to `25`)

</ParamField>

<ParamField name="search" type="string">

Full-text search on product title

</ParamField>

<ParamField name="categoryId" type="string">

Filter by category ID

</ParamField>

<ParamField name="productType" type="ProductType">

Filter by product type

</ParamField>

<ParamField name="pricingModel" type="PricingModel">

Filter by pricing model

</ParamField>

<ParamField name="sortBy" type="enum" default="createdAt">

(one of `title`, `price`, `createdAt`, defaults to `createdAt`)

</ParamField>

<ParamField name="sortOrder" type="enum" default="desc">

(one of `asc`, `desc`, defaults to `desc`)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/storefront/stores/:storeId/products
```

</RequestExample>

## Response `200`

Paginated list of products

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="data" type="object" required>

No description.

<Expandable title="properties">

<ResponseField name="items" type="array of StorefrontProductListItem" required>

No description.

</ResponseField>

<ResponseField name="pagination" type="Pagination" required typeLink="/developers/api/storefront-api-reference/schemas/pagination">

No description.

</ResponseField>

</Expandable>

</ResponseField>

<ResponseExample title="200">

```json
{
  "ok": true,
  "data": {
    "items": [
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
            "id": null,
            "name": null,
            "slug": null
          }
        ]
      }
    ],
    "pagination": {
      "page": 0,
      "limit": 0,
      "total": 0,
      "totalPages": 0
    }
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
