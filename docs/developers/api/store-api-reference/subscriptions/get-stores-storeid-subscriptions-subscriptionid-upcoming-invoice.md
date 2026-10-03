---
title: "Get upcoming invoice"
description: "Previews the next charge for a subscription — base + projected usage + MoR tax — matching what the renewal will bill. Requires the `SUBSCRIPTIONS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get upcoming invoice

Previews the next charge for a subscription — base + projected usage + MoR tax — matching what the renewal will bill. Requires the `SUBSCRIPTIONS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/subscriptions/{subscriptionId}/upcoming-invoice'} baseUrl="https://api.pandabase.io/v2/core" />

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

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/subscriptions/:subscriptionId/upcoming-invoice
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
    "subscriptionId": "sub_abc123",
    "status": "ACTIVE",
    "currency": "USD",
    "periodStart": "2026-05-14T12:34:56.000Z",
    "periodEnd": "2026-06-14T12:34:56.000Z",
    "nextChargeAt": "2026-06-14T12:34:56.000Z",
    "isUsageBased": false,
    "baseAmount": 1999,
    "usageAmount": 0,
    "subtotal": 1999,
    "taxAmount": 0,
    "total": 1999,
    "lineItems": [
      {
        "description": "Subscription base",
        "amount": 1999
      }
    ]
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
