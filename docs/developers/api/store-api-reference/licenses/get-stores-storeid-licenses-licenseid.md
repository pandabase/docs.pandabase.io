---
title: "Get license"
description: "Retrieves a license by ID. The response includes the decrypted key. Requires the `LICENSES_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get license

Retrieves a license by ID. The response includes the decrypted key. Requires the `LICENSES_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/licenses/{licenseId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="licenseId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/licenses/:licenseId
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
    "id": "lic_q1mzj0kxw5h7n4tr3bcfp2v8",
    "key": "ACME-XK7Q-9R3T-LP2W",
    "status": "CLAIMED",
    "productId": "prd_8h4t6sqzy3x9w5n2k1m0vqbf",
    "variantId": null,
    "orderId": "ord_p2v8q1mzj0kxw5h7n4tr3bcf",
    "customerId": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
    "claimedAt": "2026-05-14T12:35:11.000Z",
    "createdAt": "2026-05-14T12:35:11.000Z"
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
