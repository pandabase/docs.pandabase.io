---
title: "Create refund"
description: "Issues a refund against an order. The order must be completed, have no open dispute, and fall within the 30-day refund window. Requires the `REFUNDS_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Create refund

Issues a refund against an order. The order must be completed, have no open dispute, and fall within the 30-day refund window. Requires the `REFUNDS_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/refunds/orders/{orderId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="orderId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="reason" type="enum">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/refunds/orders/:orderId \
  -H "Content-Type: application/json" \
  -d '{"reason":"DUPLICATE"}'
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
    "id": "rfd_3kx9p2vqwm5j8h0r1n4tzcbf",
    "amount": 2900,
    "status": "COMPLETED",
    "reason": "REQUESTED_BY_CUSTOMER",
    "createdAt": "2026-05-14T12:34:56.000Z",
    "updatedAt": "2026-05-14T12:35:10.000Z",
    "order": {
      "id": "ord_p2v8q1mzj0kxw5h7n4tr3bcf",
      "orderNumber": "cs_abcdef0123456789",
      "status": "REFUNDED",
      "amount": 2900,
      "currency": "USD",
      "customer": {
        "id": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
        "email": "buyer@example.com",
        "firstName": "Alex",
        "lastName": "Doe"
      }
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
