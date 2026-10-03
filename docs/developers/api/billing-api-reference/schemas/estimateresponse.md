---
title: "EstimateResponse"
description: "The EstimateResponse object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# EstimateResponse

<Api>

## Attributes

<ResponseField name="merchant" type="Merchant" required typeLink="/developers/api/billing-api-reference/schemas/merchant">

No description.

</ResponseField>

<ResponseField name="subtotal" type="integer" required>

Subtotal in cents

</ResponseField>

<ResponseField name="discount" type="object">

No description.

<Expandable title="properties">

<ResponseField name="code" type="string">

No description.

</ResponseField>

<ResponseField name="amount" type="integer">

Discount amount in cents

</ResponseField>

<ResponseField name="type" type="enum">

(one of `PERCENTAGE`, `FIXED_AMOUNT`)

</ResponseField>

<ResponseField name="value" type="number">

Discount value (percentage or fixed amount in cents)

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="tax" type="object" required>

No description.

<Expandable title="properties">

<ResponseField name="rate" type="number" required>

Tax rate as a decimal (e.g. 0.08 for 8%)

</ResponseField>

<ResponseField name="amount" type="integer" required>

Tax amount in cents

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="total" type="integer" required>

Total in cents (subtotal - discount + tax)

</ResponseField>

<ResponseField name="items" type="array of LineItem" required>

No description.

</ResponseField>

<ResponseField name="available_payment_methods" type="array of enum">

Payment methods available to the customer based on their country. Always includes global methods (CARD, APPLE_PAY, GOOGLE_PAY); additional methods are added based on country/currency. Availability by country: US adds CASHAPP, AMAZON_PAY, WECHAT_PAY, ALIPAY. GB adds CASHAPP, AMAZON_PAY plus all EU methods. EU/EEA (AT, BE, CY, DE, EE, ES, FI, FR, GR, HR, IE, IT, LT, LU, LV, MT, NL, PT, SI, SK, CZ, DK, HU, PL, SE, NO, CH) adds IDEAL, BANCONTACT, MULTIBANCO, MB_WAY, EPS, PRZELEWY24, BLIK, AMAZON_PAY. BR adds PIX. IN adds UPI. KR adds NAVER_PAY, KAKAO_PAY, PAYCO, SAMSUNG_PAY.

</ResponseField>

<ObjectExample title={`EstimateResponse`}>

```json
{
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
```

</ObjectExample>

</Api>
