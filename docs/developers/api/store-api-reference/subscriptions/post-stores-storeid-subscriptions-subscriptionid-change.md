---
title: "Change subscription plan"
description: "Upgrades, downgrades, or re-prices a subscription (product, variant, interval, or quantity). Upgrades charge a prorated difference immediately; downgrades and end-of-period changes apply at the next renewal. Requires the `SUBSCRIPTIONS_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Change subscription plan

Upgrades, downgrades, or re-prices a subscription (product, variant, interval, or quantity). Upgrades charge a prorated difference immediately; downgrades and end-of-period changes apply at the next renewal. Requires the `SUBSCRIPTIONS_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/subscriptions/{subscriptionId}/change'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="subscriptionId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="product_id" type="string">

(length 12–48)

</ParamField>

<ParamField name="variant_id" type="string or null">

No description.

</ParamField>

<ParamField name="billing_interval" type="enum">

No description.

</ParamField>

<ParamField name="quantity" type="integer">

(range 1–100000)

</ParamField>

<ParamField name="proration_behavior" type="enum">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/subscriptions/:subscriptionId/change \
  -H "Content-Type: application/json" \
  -d '{"product_id":"string","variant_id":"string","billing_interval":"WEEKLY","quantity":0,"proration_behavior":"IMMEDIATELY"}'
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

</Api>
