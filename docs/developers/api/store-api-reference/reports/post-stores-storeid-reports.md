---
title: "Create report"
description: "Queues an asynchronous report. The response returns immediately with `status: PENDING`; poll `GET /reports/:reportId` or wait for the merchant email. Periods cannot exceed 90 days. Requires the `REPORTS_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Create report

Queues an asynchronous report. The response returns immediately with `status: PENDING`; poll `GET /reports/:reportId` or wait for the merchant email. Periods cannot exceed 90 days. Requires the `REPORTS_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/reports/'} baseUrl="https://api.pandabase.io/v2/core" />

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

## Body parameters

<ParamField name="type" type="enum" required>

No description.

</ParamField>

<ParamField name="periodStart" type="date-time" required>

(format `date-time`)

</ParamField>

<ParamField name="periodEnd" type="date-time" required>

(format `date-time`)

</ParamField>

<ParamField name="formats" type="array of enum">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/reports/ \
  -H "Content-Type: application/json" \
  -d '{"type":"PAYMENT_ACTIVITY","periodStart":"2024-01-01T00:00:00Z","periodEnd":"2024-01-01T00:00:00Z","formats":["CSV"]}'
```

</RequestExample>

## Response `201`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `true`)

</ResponseField>

<ResponseField name="data" type="object" required>

No description.

</ResponseField>

<ResponseExample title="201">

```json
{
  "ok": true,
  "data": {
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

## Response `429`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `false`)

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="429">

```json
{
  "ok": false,
  "error": "string"
}
```

</ResponseExample>

</Api>
