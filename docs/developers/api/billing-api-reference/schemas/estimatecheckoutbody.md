---
title: "EstimateCheckoutBody"
description: "The EstimateCheckoutBody object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# EstimateCheckoutBody

<Api>

## Attributes

<ResponseField name="items" type="array of CatalogItem or DynamicItem" required>

No description.

</ResponseField>

<ResponseField name="country" type="string" required>

ISO 3166-1 alpha-2 country code for tax calculation (length 2–2)

</ResponseField>

<ResponseField name="state" type="string">

State/province for tax calculation (length 0–64)

</ResponseField>

<ResponseField name="coupon_code" type="string">

Coupon code to preview discount (length 0–64)

</ResponseField>

<ResponseField name="tax_id" type="string">

Tax ID (VAT number) for tax exemption (length 0–32)

</ResponseField>

<ObjectExample title={`EstimateCheckoutBody`}>

```json
{
  "items": [
    {
      "product_id": "string",
      "variant_id": "string",
      "quantity": 0
    }
  ],
  "country": "string",
  "state": "string",
  "coupon_code": "string",
  "tax_id": "string"
}
```

</ObjectExample>

</Api>
