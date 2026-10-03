---
title: "Create checkout session"
description: "Creates a checkout session with a 6-hour TTL. Returns a `checkout_url` that you can redirect customers to, or use the session ID to build a custom checkout experience. Supports both catalog products (by `product_id`) and dynamic line items (by `name` + `amount`)."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Create checkout session

Creates a checkout session with a 6-hour TTL. Returns a `checkout_url` that you can redirect customers to, or use the session ID to build a custom checkout experience. Supports both catalog products (by `product_id`) and dynamic line items (by `name` + `amount`).

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/checkouts'} baseUrl="https://api.pandabase.io/v2" />

## Path parameters

<ParamField name="storeId" type="string" required>

Store ID (shp_ prefix)

</ParamField>

## Body parameters

<ParamField name="items" type="array of CatalogItem or DynamicItem" required>

Line items — use `product_id` for catalog products or `name` + `amount` for dynamic items

</ParamField>

<ParamField name="title" type="string">

Custom title for the checkout page. Defaults to the store name. (length 1–128)

</ParamField>

<ParamField name="description" type="string">

Custom description shown on the checkout page. Not included unless explicitly set. (length 1–500)

</ParamField>

<ParamField name="amount" type="integer">

Expected total in cents. If provided, must match the computed item total (validation safeguard). (range 100–1000000)

</ParamField>

<ParamField name="customer" type="Customer" typeLink="/developers/api/billing-api-reference/schemas/customer">

No description.

</ParamField>

<ParamField name="coupon_code" type="string">

Coupon code to apply (length 0–64)

</ParamField>

<ParamField name="tax_id" type="string">

Tax ID (VAT number) (length 0–32)

</ParamField>

<ParamField name="display" type="object">

Checkout UI configuration

<Expandable title="properties">

<ParamField name="fields" type="array of CustomFieldDefinition">

Custom fields shown to the customer during checkout (max 3)

</ParamField>

</Expandable>

</ParamField>

<ParamField name="metadata" type="object">

Key-value pairs attached to the session. Flows through to the order and webhook payloads. Max 20 keys, key max 40 chars, value max 500 chars.

<Expandable title="properties">


</Expandable>

</ParamField>

<ParamField name="return_url" type="uri">

URL to redirect after successful payment. Must use HTTPS. (format `uri`)

</ParamField>

<ParamField name="cancel_url" type="uri">

URL to redirect if the customer cancels. Must use HTTPS. (format `uri`)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/stores/:storeId/checkouts \
  -H "Content-Type: application/json" \
  -d '{"items":[{"product_id":"string","variant_id":"string","quantity":0}],"title":"string","description":"string","amount":0,"customer":{"name":"string","email":"string","billing":{"line1":"string","line2":"string","city":"string","state":"string","postal_code":"string","country":"string"}},"coupon_code":"string","tax_id":"string","display":{"fields":[{"key":"string","label":{"type":"string","custom":"string"},"type":"text","optional":false,"text":{"default_value":"string","minimum_length":0,"maximum_length":0},"numeric":{"default_value":"string","minimum_length":0,"maximum_length":0},"dropdown":{"default_value":"string","options":[]}}]},"metadata":{},"return_url":"string","cancel_url":"string"}'
```

</RequestExample>

## Response `201`

Checkout session created

<ResponseField name="ok" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="data" type="CheckoutSession" required typeLink="/developers/api/billing-api-reference/schemas/checkoutsession">

No description.

</ResponseField>

<ResponseExample title="201">

```json
{
  "ok": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "checkout_url": "string",
    "pay_redirect_url": "string",
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
    "amount": 0,
    "discount_amount": 0,
    "tax_amount": 0,
    "total_amount": 0,
    "coupon": {
      "code": "string",
      "discount_amount": 0
    },
    "items": [
      {
        "name": "string",
        "amount": 0,
        "quantity": 0,
        "image": "string"
      }
    ],
    "display": {},
    "metadata": {},
    "return_url": "string",
    "cancel_url": "string",
    "expires_at": 0
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
