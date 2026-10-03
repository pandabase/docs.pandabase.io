---
title: "Update coupon"
description: "Updates an existing coupon. The redemption code itself is immutable. Requires the `COUPONS_WRITE` scope."
layout: api
method: PATCH
icon: pencil
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Update coupon

Updates an existing coupon. The redemption code itself is immutable. Requires the `COUPONS_WRITE` scope.

<Api>

<Endpoint method="PATCH" path={'/stores/{storeId}/coupons/{couponId}'} baseUrl="https://api.pandabase.io/v2/core" />

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

## Body parameters

<ParamField name="code" type="string">

(pattern `^[A-Za-z0-9_\-]+$`, length 2–64)

</ParamField>

<ParamField name="displayName" type="string or null">

No description.

</ParamField>

<ParamField name="description" type="string or null">

No description.

</ParamField>

<ParamField name="type" type="enum">

No description.

</ParamField>

<ParamField name="value" type="integer">

(range 1–∞)

</ParamField>

<ParamField name="minimumPurchase" type="integer or null">

No description.

</ParamField>

<ParamField name="maxUses" type="integer or null">

No description.

</ParamField>

<ParamField name="maxUsesPerCustomer" type="integer or null">

No description.

</ParamField>

<ParamField name="firstPurchaseOnly" type="boolean">

No description.

</ParamField>

<ParamField name="startsAt" type="date-time or null">

No description.

</ParamField>

<ParamField name="expiresAt" type="date-time or null">

No description.

</ParamField>

<ParamField name="enabled" type="boolean">

No description.

</ParamField>

<ParamField name="productIds" type="array of string or null">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X PATCH https://api.pandabase.io/v2/core/stores/:storeId/coupons/:couponId \
  -H "Content-Type: application/json" \
  -d '{"code":"string","displayName":"string","description":"string","type":"FIXED","value":0,"minimumPurchase":0,"maxUses":0,"maxUsesPerCustomer":0,"firstPurchaseOnly":true,"startsAt":"2024-01-01T00:00:00Z","expiresAt":"2024-01-01T00:00:00Z","enabled":true,"productIds":["string"]}'
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
