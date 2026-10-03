---
title: "CheckoutSession"
description: "The CheckoutSession object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# CheckoutSession

<Api>

## Attributes

<ResponseField name="id" type="string" required>

Checkout session ID (cs_ prefix)

</ResponseField>

<ResponseField name="title" type="string">

Checkout page title (defaults to store name)

</ResponseField>

<ResponseField name="description" type="string">

Checkout page description (null unless explicitly set)

</ResponseField>

<ResponseField name="checkout_url" type="uri" required>

Hosted checkout page URL — redirect your customer here (format `uri`)

</ResponseField>

<ResponseField name="pay_redirect_url" type="uri" required>

Secure payment page URL (format `uri`)

</ResponseField>

<ResponseField name="merchant" type="Merchant" required typeLink="/developers/api/billing-api-reference/schemas/merchant">

No description.

</ResponseField>

<ResponseField name="amount" type="integer" required>

Subtotal in cents

</ResponseField>

<ResponseField name="discount_amount" type="integer" required>

Discount in cents

</ResponseField>

<ResponseField name="tax_amount" type="integer" required>

Tax in cents

</ResponseField>

<ResponseField name="total_amount" type="integer" required>

Total in cents

</ResponseField>

<ResponseField name="coupon" type="object">

No description.

<Expandable title="properties">

<ResponseField name="code" type="string">

No description.

</ResponseField>

<ResponseField name="discount_amount" type="integer">

No description.

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="items" type="array of LineItem" required>

No description.

</ResponseField>

<ResponseField name="display" type="object">

Custom field definitions

<Expandable title="properties">


</Expandable>

</ResponseField>

<ResponseField name="metadata" type="object">

No description.

<Expandable title="properties">


</Expandable>

</ResponseField>

<ResponseField name="return_url" type="string">

No description.

</ResponseField>

<ResponseField name="cancel_url" type="string">

No description.

</ResponseField>

<ResponseField name="expires_at" type="integer" required>

Session expiration timestamp (Unix ms)

</ResponseField>

<ObjectExample title={`CheckoutSession`}>

```json
{
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
```

</ObjectExample>

</Api>
