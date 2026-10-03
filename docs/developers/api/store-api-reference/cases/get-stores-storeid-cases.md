---
title: "List cases"
description: "Returns a list of support cases on the store, most recent first. Requires the `CASES_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List cases

Returns a list of support cases on the store, most recent first. Requires the `CASES_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/cases/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="priority" type="enum">

No description.

</ParamField>

<ParamField name="customerId" type="string">

(length 12–48)

</ParamField>

<ParamField name="orderId" type="string">

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/cases/
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
        "id": "case_8q1mzj0kxw5h7n4tr3bcfp2v",
        "subject": "License key not working",
        "status": "OPEN",
        "priority": "NORMAL",
        "orderId": "ord_p2v8q1mzj0kxw5h7n4tr3bcf",
        "customerId": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
        "lastMessageAt": "2026-05-14T13:00:00.000Z",
        "lastMessageBy": "CUSTOMER",
        "unreadCount": 1,
        "escalated": false,
        "closedAt": null,
        "closedBy": null,
        "createdAt": "2026-05-14T12:55:00.000Z",
        "updatedAt": "2026-05-14T13:00:00.000Z"
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

</Api>
