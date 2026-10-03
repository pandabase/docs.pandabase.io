---
title: "CreateCheckoutBody"
description: "The CreateCheckoutBody object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# CreateCheckoutBody

<Api>

## Attributes

<ResponseField name="items" type="array of CatalogItem or DynamicItem" required>

Line items — use `product_id` for catalog products or `name` + `amount` for dynamic items

</ResponseField>

<ResponseField name="title" type="string">

Custom title for the checkout page. Defaults to the store name. (length 1–128)

</ResponseField>

<ResponseField name="description" type="string">

Custom description shown on the checkout page. Not included unless explicitly set. (length 1–500)

</ResponseField>

<ResponseField name="amount" type="integer">

Expected total in cents. If provided, must match the computed item total (validation safeguard). (range 100–1000000)

</ResponseField>

<ResponseField name="customer" type="Customer" typeLink="/developers/api/billing-api-reference/schemas/customer">

No description.

</ResponseField>

<ResponseField name="coupon_code" type="string">

Coupon code to apply (length 0–64)

</ResponseField>

<ResponseField name="tax_id" type="string">

Tax ID (VAT number) (length 0–32)

</ResponseField>

<ResponseField name="display" type="object">

Checkout UI configuration

<Expandable title="properties">

<ResponseField name="fields" type="array of CustomFieldDefinition">

Custom fields shown to the customer during checkout (max 3)

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="metadata" type="object">

Key-value pairs attached to the session. Flows through to the order and webhook payloads. Max 20 keys, key max 40 chars, value max 500 chars.

<Expandable title="properties">


</Expandable>

</ResponseField>

<ResponseField name="return_url" type="uri">

URL to redirect after successful payment. Must use HTTPS. (format `uri`)

</ResponseField>

<ResponseField name="cancel_url" type="uri">

URL to redirect if the customer cancels. Must use HTTPS. (format `uri`)

</ResponseField>

<ObjectExample title={`CreateCheckoutBody`}>

```json
{
  "items": [
    {
      "product_id": "string",
      "variant_id": "string",
      "quantity": 0
    }
  ],
  "title": "string",
  "description": "string",
  "amount": 0,
  "customer": {
    "name": "string",
    "email": "string",
    "billing": {
      "line1": "string",
      "line2": "string",
      "city": "string",
      "state": "string",
      "postal_code": "string",
      "country": "string"
    }
  },
  "coupon_code": "string",
  "tax_id": "string",
  "display": {
    "fields": [
      {
        "key": "string",
        "label": {
          "type": "string",
          "custom": "string"
        },
        "type": "text",
        "optional": false,
        "text": {
          "default_value": "string",
          "minimum_length": 0,
          "maximum_length": 0
        },
        "numeric": {
          "default_value": "string",
          "minimum_length": 0,
          "maximum_length": 0
        },
        "dropdown": {
          "default_value": "string",
          "options": []
        }
      }
    ]
  },
  "metadata": {},
  "return_url": "string",
  "cancel_url": "string"
}
```

</ObjectExample>

</Api>
