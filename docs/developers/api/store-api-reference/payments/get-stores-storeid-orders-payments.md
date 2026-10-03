---
title: "List payments"
description: "Returns a list of payments collected on the store, most recent first. Requires the `ORDERS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List payments

Returns a list of payments collected on the store, most recent first. Requires the `ORDERS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/orders/payments/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="search" type="string">

(length 0–128)

</ParamField>

<ParamField name="sort" type="enum">

No description.

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/orders/payments/
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
        "id": "pmt_5h7n4tr3bcfp2v8q1mzj0kxw",
        "referenceId": "pi_3OXxxxxx0123456789ABCDEF",
        "amount": 2900,
        "totalAmount": 2920,
        "status": "COMPLETED",
        "pspProvider": "MULTI_PSP",
        "paymentMethod": {
          "type": "card",
          "cardBrand": "visa",
          "cardLastFour": "4242"
        },
        "couponCode": null,
        "country": "US",
        "customer": {
          "id": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
          "email": "buyer@example.com"
        },
        "order": {
          "id": "ord_p2v8q1mzj0kxw5h7n4tr3bcf",
          "orderNumber": "cs_abcdef0123456789",
          "status": "COMPLETED"
        },
        "createdAt": "2026-05-14T12:34:56.000Z"
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
