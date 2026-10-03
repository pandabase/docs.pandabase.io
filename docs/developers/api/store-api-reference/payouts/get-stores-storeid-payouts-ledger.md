---
title: "List balance ledger"
description: "Returns the store's balance ledger, an immutable record of every balance mutation. Requires the `PAYOUTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List balance ledger

Returns the store's balance ledger, an immutable record of every balance mutation. Requires the `PAYOUTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/payouts/ledger'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="limit" type="integer" default="25">

(range 1–100, defaults to `25`)

</ParamField>

<ParamField name="type" type="enum">

No description.

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/payouts/ledger
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
        "id": "ble_8q1mzj0kxw5h7n4tr3bcfp2v",
        "type": "PAYMENT_RECEIVED",
        "amount": 2553,
        "runningBalance": 1141500,
        "referenceId": "pmt_5h7n4tr3bcfp2v8q1mzj0kxw",
        "description": "Payment received for order cs_abcdef0123456789",
        "createdAt": "2026-05-14T12:35:10.000Z"
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

</Api>
