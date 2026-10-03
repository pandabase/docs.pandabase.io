---
title: "Get orders by country"
description: "Returns order counts grouped by customer country. Requires the `ANALYTICS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get orders by country

Returns order counts grouped by customer country. Requires the `ANALYTICS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/analytics/orders-by-country'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

## Query parameters

<ParamField name="period" type="enum">

No description.

</ParamField>

<ParamField name="startDate" type="date-time">

(format `date-time`)

</ParamField>

<ParamField name="endDate" type="date-time">

(format `date-time`)

</ParamField>

<ParamField name="granularity" type="enum">

No description.

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/analytics/orders-by-country
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
      "country": "US",
      "orders": 215,
      "amount": 624000
    },
    {
      "country": "GB",
      "orders": 87,
      "amount": 251400
    },
    {
      "country": "DE",
      "orders": 52,
      "amount": 148900
    }
  ]
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
