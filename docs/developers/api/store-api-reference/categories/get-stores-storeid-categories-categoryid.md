---
title: "Get category"
description: "Retrieves a product category by ID. Requires the `CATEGORIES_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get category

Retrieves a product category by ID. Requires the `CATEGORIES_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/categories/{categoryId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="categoryId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/categories/:categoryId
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
