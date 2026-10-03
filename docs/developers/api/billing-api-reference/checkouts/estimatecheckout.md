---
title: "Estimate checkout"
description: "Stateless price estimation with tax and coupon preview. Does not create a session — use this to show a price breakdown before creating a checkout."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Estimate checkout

Stateless price estimation with tax and coupon preview. Does not create a session — use this to show a price breakdown before creating a checkout.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/checkouts/estimate'} baseUrl="https://api.pandabase.io/v2" />

## Path parameters

<ParamField name="storeId" type="string" required>

Store ID (shp_ prefix)

</ParamField>

## Body parameters

<ParamField name="items" type="array of CatalogItem or DynamicItem" required>

No description.

</ParamField>

<ParamField name="country" type="string" required>

ISO 3166-1 alpha-2 country code for tax calculation (length 2–2)

</ParamField>

<ParamField name="state" type="string">

State/province for tax calculation (length 0–64)

</ParamField>

<ParamField name="coupon_code" type="string">

Coupon code to preview discount (length 0–64)

</ParamField>

<ParamField name="tax_id" type="string">

Tax ID (VAT number) for tax exemption (length 0–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/stores/:storeId/checkouts/estimate \
  -H "Content-Type: application/json" \
  -d '{"items":[{"product_id":"string","variant_id":"string","quantity":0}],"country":"string","state":"string","coupon_code":"string","tax_id":"string"}'
```

</RequestExample>

## Response `200`

Checkout estimate

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="data" type="EstimateResponse" required typeLink="/developers/api/billing-api-reference/schemas/estimateresponse">

No description.

</ResponseField>

<ResponseExample title="200">

```json
{
  "ok": true,
  "data": {
    "merchant": {
      "id": "string",
      "name": "string",
      "handle": "string",
      "slug": "string",
      "logo": "string",
      "favicon": "string",
      "accentColor": "string",
      "primaryColor": "string",
      "statementDescriptor": "string",
      "supportEmail": "string"
    },
    "subtotal": 0,
    "discount": {
      "code": "string",
      "amount": 0,
      "type": "PERCENTAGE",
      "value": 0
    },
    "tax": {
      "rate": 0,
      "amount": 0
    },
    "total": 0,
    "items": [
      {
        "name": "string",
        "amount": 0,
        "quantity": 0,
        "image": "string"
      }
    ],
    "available_payment_methods": [
      "CARD",
      "APPLE_PAY",
      "GOOGLE_PAY",
      "IDEAL",
      "BANCONTACT",
      "MULTIBANCO",
      "MB_WAY",
      "EPS",
      "PRZELEWY24",
      "BLIK",
      "AMAZON_PAY"
    ]
  }
}
```

</ResponseExample>

## Response `400`

Error response

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="400">

```json
{
  "ok": true,
  "error": "string"
}
```

</ResponseExample>

## Response `404`

Error response

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="404">

```json
{
  "ok": true,
  "error": "string"
}
```

</ResponseExample>

</Api>
