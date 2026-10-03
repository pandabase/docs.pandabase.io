---
title: "Get store"
description: "Returns the public configuration of the store. Requires the `STORE_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get store

Returns the public configuration of the store. Requires the `STORE_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/
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
    "id": "shp_kxw5h7n4tr3bcfp2v8q1mzj0",
    "title": "Acme Digital",
    "handle": "acme-digital",
    "description": "Software & digital downloads.",
    "country": "US",
    "currency": "USD",
    "sales": 432,
    "balance": 1141500,
    "statementDescriptor": "ACME DIGITAL",
    "createdAt": "2026-02-01T08:00:00.000Z"
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
