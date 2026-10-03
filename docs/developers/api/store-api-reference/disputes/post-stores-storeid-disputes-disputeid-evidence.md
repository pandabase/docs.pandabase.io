---
title: "Submit dispute evidence"
description: "Submits evidence for a dispute to be reviewed by the card network. Customer-side fields are auto-filled from the original transaction. Requires the `DISPUTES_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Submit dispute evidence

Submits evidence for a dispute to be reviewed by the card network. Customer-side fields are auto-filled from the original transaction. Requires the `DISPUTES_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/disputes/{disputeId}/evidence'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="disputeId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="access_activity_log" type="string" required>

(length 1–20000)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/disputes/:disputeId/evidence \
  -H "Content-Type: application/json" \
  -d '{"access_activity_log":"string"}'
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
    "id": "dsp_8h0r1n4tzcbfp2v8q1mzwxj5",
    "reason": "FRAUDULENT",
    "status": "UNDER_REVIEW",
    "evidence": {
      "access_activity_log": "Customer logged in 14 times..."
    },
    "totalAmount": 2920,
    "amount": 2900,
    "fee": 2000,
    "createdAt": "2026-05-14T09:12:00.000Z",
    "order": {
      "id": "ord_p2v8q1mzj0kxw5h7n4tr3bcf",
      "orderNumber": "cs_abcdef0123456789",
      "status": "CHARGEBACK",
      "customer": {
        "id": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
        "email": "buyer@example.com",
        "firstName": "Alex",
        "lastName": "Doe",
        "guest": false
      },
      "amount": 2900,
      "currency": "USD"
    },
    "method": "card",
    "updatedAt": "2026-05-14T09:12:00.000Z"
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
