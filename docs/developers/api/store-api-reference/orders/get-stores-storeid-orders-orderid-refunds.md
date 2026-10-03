---
title: "List order refunds"
description: "Returns the refunds issued against the specified order. Requires the `ORDERS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List order refunds

Returns the refunds issued against the specified order. Requires the `ORDERS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/orders/{orderId}/refunds'} baseUrl="https://api.pandabase.io/v2/core" />

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

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/orders/:orderId/refunds
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
  "data": [
    {
      "id": "rfd_3kx9p2vqwm5j8h0r1n4tzcbf",
      "amount": 2900,
      "status": "COMPLETED",
      "reason": "REQUESTED_BY_CUSTOMER",
      "createdAt": "2026-05-14T12:34:56.000Z",
      "order": {
        "id": "ord_p2v8q1mzj0kxw5h7n4tr3bcf",
        "orderNumber": "cs_abcdef0123456789",
        "customer": {
          "id": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
          "email": "buyer@example.com"
        }
      }
    }
  ]
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
