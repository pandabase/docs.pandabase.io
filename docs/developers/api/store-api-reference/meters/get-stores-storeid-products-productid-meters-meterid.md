---
title: "Get meter"
description: "Retrieves a usage meter by ID. Requires the `METERS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get meter

Retrieves a usage meter by ID. Requires the `METERS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/products/{productId}/meters/{meterId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="productId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="meterId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/products/:productId/meters/:meterId
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
    "id": "umt_5e1q3npwt0u6s2k8h9j7rzbc",
    "productId": "prd_8h4t6sqzy3x9w5n2k1m0vqbf",
    "eventName": "input_tokens",
    "unitPrice": 300,
    "unitQuantity": 1000000,
    "aggregation": "SUM",
    "settlement": "ARREARS",
    "includedUnits": null,
    "createdAt": "2026-05-20T14:00:00.000Z",
    "updatedAt": "2026-05-20T14:00:00.000Z"
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
