---
title: "Update case"
description: "Updates a support case, typically to change its status. Requires the `CASES_WRITE` scope."
layout: api
method: PATCH
icon: pencil
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Update case

Updates a support case, typically to change its status. Requires the `CASES_WRITE` scope.

<Api>

<Endpoint method="PATCH" path={'/stores/{storeId}/cases/{caseId}'} baseUrl="https://api.pandabase.io/v2/core" />

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

## Body parameters

<ParamField name="priority" type="enum">

No description.

</ParamField>

<ParamField name="status" type="enum">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X PATCH https://api.pandabase.io/v2/core/stores/:storeId/cases/:caseId \
  -H "Content-Type: application/json" \
  -d '{"priority":"LOW","status":"AWAITING_CUSTOMER"}'
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
    "status": "CLOSED",
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
