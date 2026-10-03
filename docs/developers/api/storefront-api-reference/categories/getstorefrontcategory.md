---
title: "Get category"
description: "Returns category details including subcategories and up to 50 active products."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get category

Returns category details including subcategories and up to 50 active products.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/categories/{categoryId}'} baseUrl="https://api.pandabase.io/v2/storefront" />

## Path parameters

<ParamField name="storeId" type="string" required>

Store ID (shp_ prefix)

</ParamField>

<ParamField name="categoryId" type="string" required>

Category ID (ctg_ prefix)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/storefront/stores/:storeId/categories/:categoryId
```

</RequestExample>

## Response `200`

Category details

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="data" type="StorefrontCategory" required typeLink="/developers/api/storefront-api-reference/schemas/storefrontcategory">

No description.

</ResponseField>

<ResponseExample title="200">

```json
{
  "ok": true,
  "data": {
    "id": "string",
    "name": "string",
    "slug": "string",
    "description": "string",
    "icon": "string",
    "parentId": "string",
    "displayOrder": 0,
    "featured": true,
    "metaTitle": "string",
    "metaDescription": "string",
    "showInNavigation": true,
    "children": [
      {
        "id": "string",
        "name": "string",
        "slug": "string"
      }
    ],
    "products": [
      {
        "id": "string",
        "title": "string",
        "handle": "string",
        "price": 0,
        "images": [
          "string"
        ],
        "inStock": true
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
