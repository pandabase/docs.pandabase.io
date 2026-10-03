---
title: "List subscriptions"
description: "Returns a list of subscriptions on the store, most recent first. Requires the `SUBSCRIPTIONS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List subscriptions

Returns a list of subscriptions on the store, most recent first. Requires the `SUBSCRIPTIONS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/subscriptions/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="status" type="enum">

No description.

</ParamField>

<ParamField name="product_id" type="string">

(length 12–48)

</ParamField>

<ParamField name="customer_id" type="string">

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/subscriptions/
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
        "id": "sub_h7n4tr3bcfp2v8q1mzj0kxw5",
        "status": "ACTIVE",
        "billingInterval": "MONTHLY",
        "amount": 2900,
        "currency": "USD",
        "currentPeriodStart": "2026-05-14T12:34:56.000Z",
        "currentPeriodEnd": "2026-06-14T12:34:56.000Z",
        "nextChargeAt": "2026-06-14T12:34:56.000Z",
        "trialEnd": null,
        "cancelledAt": null,
        "pausedAt": null,
        "endsAt": null,
        "retryCount": 0,
        "product": {
          "id": "prd_8h4t6sqzy3x9w5n2k1m0vqbf",
          "title": "Pro Plan",
          "price": 2900
        },
        "customer": {
          "id": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
          "email": "buyer@example.com"
        },
        "paymentMethod": {
          "id": "pmm_n4tr3bcfp2v8q1mzj0kxw5h7",
          "brand": "visa",
          "lastFour": "4242",
          "expMonth": 12,
          "expYear": 2030
        },
        "createdAt": "2026-05-14T12:34:56.000Z"
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
