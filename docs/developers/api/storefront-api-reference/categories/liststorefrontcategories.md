---
title: "List categories"
description: "Returns a paginated list of categories. Supports filtering by featured status and parent category."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List categories

Returns a paginated list of categories. Supports filtering by featured status and parent category.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/categories'} baseUrl="https://api.pandabase.io/v2/storefront" />

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

<ParamField name="featured" type="boolean">

Filter by featured status

</ParamField>

<ParamField name="parentId" type="string">

Filter by parent category ID (for subcategories)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/storefront/stores/:storeId/categories
```

</RequestExample>

## Response `200`

Paginated list of categories

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="data" type="object" required>

No description.

<Expandable title="properties">

<ResponseField name="items" type="array of StorefrontCategoryListItem" required>

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
        "name": "string",
        "slug": "string",
        "description": "string",
        "icon": "string",
        "parentId": "string",
        "displayOrder": 0,
        "featured": true
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
