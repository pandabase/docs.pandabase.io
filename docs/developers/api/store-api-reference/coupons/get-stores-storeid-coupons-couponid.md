---
title: "Get coupon"
description: "Retrieves a coupon by ID. Requires the `COUPONS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get coupon

Retrieves a coupon by ID. Requires the `COUPONS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/coupons/{couponId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="couponId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/coupons/:couponId
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
