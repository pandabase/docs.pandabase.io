---
title: "Create category"
description: "Creates a new product category. Requires the `CATEGORIES_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Create category

Creates a new product category. Requires the `CATEGORIES_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/categories/'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="name" type="string" required>

(pattern `^[a-zA-Z0-9][a-zA-Z0-9 &'\-\.]&#123;0,126&#125;[a-zA-Z0-9]$`, length 1–128)

</ParamField>

<ParamField name="slug" type="string">

(pattern `^[a-z0-9][a-z0-9\-]&#123;0,126&#125;[a-z0-9]$`, length 2–128)

</ParamField>

<ParamField name="description" type="string">

(length 0–500)

</ParamField>

<ParamField name="parentId" type="string">

(length 12–48)

</ParamField>

<ParamField name="displayOrder" type="integer" default="0">

(range 0–9999, defaults to `0`)

</ParamField>

<ParamField name="icon" type="string">

(pattern `^[a-z0-9\-]+$`, length 1–64)

</ParamField>

<ParamField name="metaTitle" type="string">

(length 0–128)

</ParamField>

<ParamField name="metaDescription" type="string">

(length 0–320)

</ParamField>

<ParamField name="showInNavigation" type="boolean" default="true">

(defaults to `true`)

</ParamField>

<ParamField name="featured" type="boolean" default="false">

(defaults to `false`)

</ParamField>

<ParamField name="isFavourite" type="boolean" default="false">

(defaults to `false`)

</ParamField>

<ParamField name="isArchived" type="boolean" default="false">

(defaults to `false`)

</ParamField>

<ParamField name="productIds" type="array of string">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/categories/ \
  -H "Content-Type: application/json" \
  -d '{"name":"string","slug":"string","description":"string","parentId":"string","displayOrder":0,"icon":"string","metaTitle":"string","metaDescription":"string","showInNavigation":true,"featured":false,"isFavourite":false,"isArchived":false,"productIds":["string"]}'
```

</RequestExample>

## Response `201`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `true`)

</ResponseField>

<ResponseField name="data" type="object" required>

No description.

</ResponseField>

<ResponseExample title="201">

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
