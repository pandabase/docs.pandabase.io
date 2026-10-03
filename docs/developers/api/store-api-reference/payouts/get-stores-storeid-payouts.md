---
title: "List payouts"
description: "Returns a list of payouts requested by the store, most recent first. Requires the `PAYOUTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List payouts

Returns a list of payouts requested by the store, most recent first. Requires the `PAYOUTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/payouts/'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

## Query parameters

<ParamField name="page" type="integer" default="1">

(range 1–∞, defaults to `1`)

</ParamField>

<ParamField name="limit" type="integer" default="20">

(range 1–100, defaults to `20`)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/payouts/
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
    "items": [
      {
        "id": "pto_n4tr3bcfp2v8q1mzj0kxw5h7",
        "amount": 500000,
        "fee": 250,
        "status": "PROCESSING",
        "referenceId": "obp_3OXxxxxx0123456789ABCD",
        "payoutMethod": {
          "id": "bnk_q1mzj0kxw5h7n4tr3bcfp2v8",
          "isPrimary": true,
          "status": "APPROVED"
        },
        "createdAt": "2026-05-13T16:20:00.000Z",
        "updatedAt": "2026-05-13T16:21:08.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 25,
      "total": 1,
      "totalPages": 1
    }
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
