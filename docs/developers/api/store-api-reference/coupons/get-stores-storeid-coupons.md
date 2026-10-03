---
title: "List coupons"
description: "Returns a list of coupons on the store. Requires the `COUPONS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# List coupons

Returns a list of coupons on the store. Requires the `COUPONS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/coupons/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="search" type="string">

(length 0–128)

</ParamField>

<ParamField name="type" type="enum">

No description.

</ParamField>

<ParamField name="enabled" type="boolean">

No description.

</ParamField>

<ParamField name="sortBy" type="enum">

No description.

</ParamField>

<ParamField name="sortOrder" type="enum">

No description.

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/coupons/
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
        "id": "cpn_p2v8q1mzj0kxw5h7n4tr3bcf",
        "code": "LAUNCH20",
        "displayName": "Launch week 20% off",
        "description": "Limited-time launch discount.",
        "type": "PERCENTAGE",
        "value": 20,
        "minimumPurchase": 1000,
        "maxUses": 500,
        "maxUsesPerCustomer": 1,
        "firstPurchaseOnly": false,
        "startsAt": "2026-05-01T00:00:00.000Z",
        "expiresAt": "2026-06-01T00:00:00.000Z",
        "enabled": true,
        "timesUsed": 42,
        "productIds": [],
        "createdAt": "2026-04-28T08:30:00.000Z",
        "updatedAt": "2026-05-12T11:15:00.000Z"
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
