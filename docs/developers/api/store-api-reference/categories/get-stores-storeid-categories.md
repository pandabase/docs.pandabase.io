---
title: "List categories"
description: "Returns a list of product categories on the store. Requires the `CATEGORIES_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List categories

Returns a list of product categories on the store. Requires the `CATEGORIES_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/categories/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="parentId" type="string">

(length 12–48)

</ParamField>

<ParamField name="featured" type="boolean">

No description.

</ParamField>

<ParamField name="isFavourite" type="boolean">

No description.

</ParamField>

<ParamField name="isArchived" type="boolean">

No description.

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
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/categories/
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
        "id": "ctg_4tzcbfp2v8q1mzwxj5h0r1n",
        "name": "Plans",
        "slug": "plans",
        "description": "Subscription plans for the platform.",
        "parentId": null,
        "displayOrder": 0,
        "icon": null,
        "metaTitle": null,
        "metaDescription": null,
        "showInNavigation": true,
        "featured": false,
        "isFavourite": false,
        "isArchived": false,
        "createdAt": "2026-05-01T10:00:00.000Z",
        "updatedAt": "2026-05-01T10:00:00.000Z"
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
