---
title: "Get report"
description: "Retrieves a report by ID. Status transitions: `PENDING → PROCESSING → SUCCEEDED | FAILED`. Requires the `REPORTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get report

Retrieves a report by ID. Status transitions: `PENDING → PROCESSING → SUCCEEDED | FAILED`. Requires the `REPORTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/reports/{reportId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="reportId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/reports/:reportId
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
