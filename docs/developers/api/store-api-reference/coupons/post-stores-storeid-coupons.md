---
title: "Create coupon"
description: "Creates a coupon that can be redeemed at checkout. Requires the `COUPONS_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Create coupon

Creates a coupon that can be redeemed at checkout. Requires the `COUPONS_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/coupons/'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="code" type="string" required>

(pattern `^[A-Za-z0-9_\-]+$`, length 2–64)

</ParamField>

<ParamField name="displayName" type="string">

(length 1–128)

</ParamField>

<ParamField name="description" type="string">

(length 0–500)

</ParamField>

<ParamField name="type" type="enum" required>

No description.

</ParamField>

<ParamField name="value" type="integer" required>

(range 1–∞)

</ParamField>

<ParamField name="minimumPurchase" type="integer">

(range 0–∞)

</ParamField>

<ParamField name="maxUses" type="integer">

(range 1–∞)

</ParamField>

<ParamField name="maxUsesPerCustomer" type="integer">

(range 1–∞)

</ParamField>

<ParamField name="firstPurchaseOnly" type="boolean" default="false">

(defaults to `false`)

</ParamField>

<ParamField name="startsAt" type="date-time">

(format `date-time`)

</ParamField>

<ParamField name="expiresAt" type="date-time">

(format `date-time`)

</ParamField>

<ParamField name="enabled" type="boolean" default="true">

(defaults to `true`)

</ParamField>

<ParamField name="productIds" type="array of string">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/coupons/ \
  -H "Content-Type: application/json" \
  -d '{"code":"string","displayName":"string","description":"string","type":"FIXED","value":0,"minimumPurchase":0,"maxUses":0,"maxUsesPerCustomer":0,"firstPurchaseOnly":false,"startsAt":"2024-01-01T00:00:00Z","expiresAt":"2024-01-01T00:00:00Z","enabled":true,"productIds":["string"]}'
```

</RequestExample>

## Response `201`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `true`)

</ResponseField>

<ResponseField name="data" type="object" required>

No description.

</ResponseField>

<ResponseExample title="201">

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
