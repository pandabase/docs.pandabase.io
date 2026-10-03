---
title: "List bank accounts"
description: "Returns the bank accounts configured for the store's payouts. Requires the `PAYOUTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List bank accounts

Returns the bank accounts configured for the store's payouts. Requires the `PAYOUTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/payouts/bank-accounts'} baseUrl="https://api.pandabase.io/v2/core" />

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
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/payouts/bank-accounts
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
  "data": [
    {
      "id": "bnk_q1mzj0kxw5h7n4tr3bcfp2v8",
      "isPrimary": true,
      "status": "APPROVED",
      "last4": "4242",
      "bankName": "Chase",
      "country": "US",
      "routingNumber": "021000021",
      "bankAccountType": "checking",
      "supportedCurrencies": [
        "usd"
      ],
      "availablePayoutSpeeds": [
        "standard",
        "instant"
      ],
      "createdAt": "2026-04-15T12:00:00.000Z",
      "updatedAt": "2026-04-18T15:30:00.000Z"
    }
  ]
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
