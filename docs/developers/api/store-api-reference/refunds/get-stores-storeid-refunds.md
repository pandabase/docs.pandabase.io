---
title: "List refunds"
description: "Returns a list of refunds issued on the store, most recent first. Requires the `REFUNDS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List refunds

Returns a list of refunds issued on the store, most recent first. Requires the `REFUNDS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/refunds/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="sort" type="enum">

No description.

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/refunds/
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
