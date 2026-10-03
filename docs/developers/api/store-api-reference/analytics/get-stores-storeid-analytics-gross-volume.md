---
title: "Get gross volume"
description: "Returns gross transaction volume bucketed over the requested time range. Requires the `ANALYTICS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get gross volume

Returns gross transaction volume bucketed over the requested time range. Requires the `ANALYTICS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/analytics/gross-volume'} baseUrl="https://api.pandabase.io/v2/core" />

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
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/analytics/gross-volume
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
    "series": [
      {
        "date": "2026-05-10",
        "amount": 35400
      },
      {
        "date": "2026-05-11",
        "amount": 42100
      },
      {
        "date": "2026-05-12",
        "amount": 28900
      },
      {
        "date": "2026-05-13",
        "amount": 39850
      },
      {
        "date": "2026-05-14",
        "amount": 47200
      }
    ]
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
