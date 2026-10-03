---
title: "Create meter"
description: "Creates a usage meter on a product. The product must be a subscription with `pricing_model` set to `USAGE_BASED`. A product can have up to 10 meters. Requires the `METERS_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Create meter

Creates a usage meter on a product. The product must be a subscription with `pricing_model` set to `USAGE_BASED`. A product can have up to 10 meters. Requires the `METERS_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/products/{productId}/meters/'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="productId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="eventName" type="string" required>

Name reported on POST /v2/core/.../usage; unique per product. (pattern `^[a-zA-Z0-9_.-]+$`, length 1–64)

</ParamField>

<ParamField name="unitPrice" type="integer" required>

Cents per unitQuantity units. Zero allowed for free meters. (range 0–100000000)

</ParamField>

<ParamField name="unitQuantity" type="integer" default="1">

Denominator for unitPrice. E.g. 1_000_000 for '$3 / 1M tokens'. (range 1–1000000000, defaults to `1`)

</ParamField>

<ParamField name="aggregation" type="enum" required>

No description.

</ParamField>

<ParamField name="settlement" type="enum">

No description.

</ParamField>

<ParamField name="includedUnits" type="integer">

Units included in base fee before metering kicks in. Only for BASE_PLUS_OVERAGE. (range 0–∞)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/products/:productId/meters/ \
  -H "Content-Type: application/json" \
  -d '{"eventName":"string","unitPrice":0,"unitQuantity":1,"aggregation":"SUM","settlement":"ARREARS","includedUnits":0}'
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
