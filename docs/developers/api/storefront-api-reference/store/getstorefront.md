---
title: "Get store"
description: "Returns public store information including branding, description, and social links."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get store

Returns public store information including branding, description, and social links.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}'} baseUrl="https://api.pandabase.io/v2/storefront" />

## Path parameters

<ParamField name="storeId" type="string" required>

Store ID (shp_ prefix)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/storefront/stores/:storeId
```

</RequestExample>

## Response `200`

Store details

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="data" type="Storefront" required typeLink="/developers/api/storefront-api-reference/schemas/storefront">

No description.

</ResponseField>

<ResponseExample title="200">

```json
{
  "ok": true,
  "data": {
    "id": "string",
    "name": "string",
    "handle": "string",
    "slug": "string",
    "description": "string",
    "summary": "string",
    "logo": "string",
    "favicon": "string",
    "accentColor": "string",
    "primaryColor": "string",
    "supportEmail": "string",
    "category": [
      "string"
    ],
    "twitterUrl": "string",
    "instagramUrl": "string",
    "linkedinUrl": "string",
    "youtubeUrl": "string",
    "tiktokUrl": "string"
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
