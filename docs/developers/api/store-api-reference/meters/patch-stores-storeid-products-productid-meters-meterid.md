---
title: "Update meter"
description: "Updates a usage meter. The `eventName`, `aggregation`, and `settlement` fields become immutable once any usage event has been reported against the meter. Rate fields remain editable. Requires the `METERS_WRITE` scope."
layout: api
method: PATCH
icon: pencil
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Update meter

Updates a usage meter. The `eventName`, `aggregation`, and `settlement` fields become immutable once any usage event has been reported against the meter. Rate fields remain editable. Requires the `METERS_WRITE` scope.

<Api>

<Endpoint method="PATCH" path={'/stores/{storeId}/products/{productId}/meters/{meterId}'} baseUrl="https://api.pandabase.io/v2/core" />

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

## Body parameters

<ParamField name="eventName" type="string">

(pattern `^[a-zA-Z0-9_.-]+$`, length 1–64)

</ParamField>

<ParamField name="unitPrice" type="integer">

(range 0–100000000)

</ParamField>

<ParamField name="unitQuantity" type="integer">

(range 1–1000000000)

</ParamField>

<ParamField name="aggregation" type="enum">

No description.

</ParamField>

<ParamField name="settlement" type="enum">

No description.

</ParamField>

<ParamField name="includedUnits" type="integer or null">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X PATCH https://api.pandabase.io/v2/core/stores/:storeId/products/:productId/meters/:meterId \
  -H "Content-Type: application/json" \
  -d '{"eventName":"string","unitPrice":0,"unitQuantity":0,"aggregation":"SUM","settlement":"ARREARS","includedUnits":0}'
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

## Response `409`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `false`)

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="409">

```json
{
  "ok": false,
  "error": "string"
}
```

</ResponseExample>

</Api>
