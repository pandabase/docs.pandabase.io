---
title: "List usage events"
description: "Returns a list of usage events for a subscription, most recent first. Can be filtered by `meter_id` and by an `event_at` range. Requires the `USAGE_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List usage events

Returns a list of usage events for a subscription, most recent first. Can be filtered by `meter_id` and by an `event_at` range. Requires the `USAGE_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/usage/'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

## Query parameters

<ParamField name="subscription_id" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="meter_id" type="string">

(length 12–48)

</ParamField>

<ParamField name="from" type="date-time">

(format `date-time`)

</ParamField>

<ParamField name="to" type="date-time">

(format `date-time`)

</ParamField>

<ParamField name="page" type="integer" default="1">

(range 1–∞, defaults to `1`)

</ParamField>

<ParamField name="limit" type="integer" default="25">

(range 1–100, defaults to `25`)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/usage/
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
        "id": "uev_7g3s5rpyx2w8v4m1j0l9ubae",
        "externalId": "req-abc-123",
        "subscriptionId": "sub_8h4t6sqzy3x9w5n2k1m0vqbf",
        "meterId": "umt_5e1q3npwt0u6s2k8h9j7rzbc",
        "customerId": "cus_3c0p1lmuq9t4r5j6g8h2vyab",
        "quantity": 1500,
        "eventAt": "2026-05-20T14:23:00.000Z",
        "receivedAt": "2026-05-20T14:23:01.123Z",
        "metadata": {
          "endpoint": "/v1/chat",
          "model": "claude-opus-4-7"
        }
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
