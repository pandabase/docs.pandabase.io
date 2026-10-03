---
title: "Get case"
description: "Retrieves a support case by ID. Requires the `CASES_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get case

Retrieves a support case by ID. Requires the `CASES_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/cases/{caseId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="caseId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/cases/:caseId
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
