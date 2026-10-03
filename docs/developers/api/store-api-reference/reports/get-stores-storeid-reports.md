---
title: "List reports"
description: "Returns the store's reports, most recent first. Filter by `status` or `type`. Requires the `REPORTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List reports

Returns the store's reports, most recent first. Filter by `status` or `type`. Requires the `REPORTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/reports/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="type" type="enum">

No description.

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/reports/
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
        "id": "rpt_8h4t6sqzy3x9w5n2k1m0vqbf",
        "type": "PAYMENT_ACTIVITY",
        "status": "SUCCEEDED",
        "formats": [
          "CSV",
          "JSON"
        ],
        "periodStart": "2026-04-01T00:00:00.000Z",
        "periodEnd": "2026-05-01T00:00:00.000Z",
        "rowCount": 1247,
        "sizeBytes": 412980,
        "durationMs": 8412,
        "errorMessage": null,
        "requestedByAccountId": null,
        "requestedByTokenId": "stk_4tzcbfp2v8q1mzwxj5h0r1n",
        "startedAt": "2026-05-22T10:00:00.100Z",
        "completedAt": "2026-05-22T10:00:08.512Z",
        "createdAt": "2026-05-22T10:00:00.000Z",
        "updatedAt": "2026-05-22T10:00:08.512Z"
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
