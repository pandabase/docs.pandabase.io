---
title: "Get download URL"
description: "Returns a 5-minute pre-signed S3 URL for the generated report file. Fetch a fresh URL when the previous one expires. Requires the `REPORTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get download URL

Returns a 5-minute pre-signed S3 URL for the generated report file. Fetch a fresh URL when the previous one expires. Requires the `REPORTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/reports/{reportId}/download/{format}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="reportId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="format" type="enum" required>

No description.

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/reports/:reportId/download/:format
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
    "url": "https://cdn.pandabase.io/stores/shp_xxx/reports/rpt_xxx.csv?X-Amz-Algorithm=..."
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

## Response `409`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `false`)

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="409">

```json
{
  "ok": false,
  "error": "string"
}
```

</ResponseExample>

</Api>
