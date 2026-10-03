---
title: "Get subscription usage"
description: "Returns a live projection of the current billing period together with summaries of past periods for the subscription. Non-usage subscriptions return `isUsageBased: false`. Requires the `USAGE_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get subscription usage

Returns a live projection of the current billing period together with summaries of past periods for the subscription. Non-usage subscriptions return `isUsageBased: false`. Requires the `USAGE_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/subscriptions/{subscriptionId}/usage'} baseUrl="https://api.pandabase.io/v2/core" />

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
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/subscriptions/:subscriptionId/usage
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
    "subscriptionId": "sub_8h4t6sqzy3x9w5n2k1m0vqbf",
    "isUsageBased": true,
    "currency": "USD",
    "currentPeriod": {
      "periodStart": "2026-05-01T00:00:00.000Z",
      "periodEnd": "2026-06-01T00:00:00.000Z",
      "baseAmount": 0,
      "usageAmount": 1970,
      "projectedTotal": 1970,
      "meters": [
        {
          "meterId": "umt_5e1q3npwt0u6s2k8h9j7rzbc",
          "eventName": "input_tokens",
          "quantity": 6566667,
          "amountCharged": 1970
        }
      ]
    },
    "pastPeriods": [
      {
        "periodStart": "2026-04-01T00:00:00.000Z",
        "periodEnd": "2026-05-01T00:00:00.000Z",
        "totalCharged": 4500,
        "orderId": "ord_p2v8q1mzj0kxw5h7n4tr3bcf",
        "meters": [
          {
            "meterId": "umt_5e1q3npwt0u6s2k8h9j7rzbc",
            "eventName": "input_tokens",
            "quantity": 15000000,
            "unitPrice": 300,
            "unitQuantity": 1000000,
            "amountCharged": 4500
          }
        ]
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
