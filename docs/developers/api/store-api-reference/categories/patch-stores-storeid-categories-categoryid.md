---
title: "Update category"
description: "Updates an existing product category. Requires the `CATEGORIES_WRITE` scope."
layout: api
method: PATCH
icon: pencil
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Update category

Updates an existing product category. Requires the `CATEGORIES_WRITE` scope.

<Api>

<Endpoint method="PATCH" path={'/stores/{storeId}/categories/{categoryId}'} baseUrl="https://api.pandabase.io/v2/core" />

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

## Body parameters

<ParamField name="name" type="string">

(pattern `^[a-zA-Z0-9][a-zA-Z0-9 &'\-\.]&#123;0,126&#125;[a-zA-Z0-9]$`, length 1–128)

</ParamField>

<ParamField name="slug" type="string">

(pattern `^[a-z0-9][a-z0-9\-]&#123;0,126&#125;[a-z0-9]$`, length 2–128)

</ParamField>

<ParamField name="description" type="string or null">

No description.

</ParamField>

<ParamField name="parentId" type="string or null">

No description.

</ParamField>

<ParamField name="displayOrder" type="integer">

(range 0–9999)

</ParamField>

<ParamField name="icon" type="string or null">

No description.

</ParamField>

<ParamField name="metaTitle" type="string or null">

No description.

</ParamField>

<ParamField name="metaDescription" type="string or null">

No description.

</ParamField>

<ParamField name="showInNavigation" type="boolean">

No description.

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

<ParamField name="productIds" type="array of string">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X PATCH https://api.pandabase.io/v2/core/stores/:storeId/categories/:categoryId \
  -H "Content-Type: application/json" \
  -d '{"name":"string","slug":"string","description":"string","parentId":"string","displayOrder":0,"icon":"string","metaTitle":"string","metaDescription":"string","showInNavigation":true,"featured":true,"isFavourite":true,"isArchived":true,"productIds":["string"]}'
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
