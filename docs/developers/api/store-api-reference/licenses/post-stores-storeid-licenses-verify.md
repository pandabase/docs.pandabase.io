---
title: "Verify license"
description: "Verifies a license key against a product and returns its activation status. Intended for first-party software activation flows. Requires the `LICENSES_READ` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Verify license

Verifies a license key against a product and returns its activation status. Intended for first-party software activation flows. Requires the `LICENSES_READ` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/licenses/verify'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="key" type="string" required>

(length 1–512)

</ParamField>

<ParamField name="productId" type="string">

(length 12–48)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/licenses/verify \
  -H "Content-Type: application/json" \
  -d '{"key":"string","productId":"string"}'
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
    "valid": true,
    "status": "CLAIMED",
    "productId": "prd_8h4t6sqzy3x9w5n2k1m0vqbf",
    "customerId": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
    "expiresAt": null
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
