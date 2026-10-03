---
title: "Customer"
description: "The Customer object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Customer

<Api>

## Attributes

<ResponseField name="name" type="string" required>

(length 0–128)

</ResponseField>

<ResponseField name="email" type="email" required>

(format `email`, length 0–320)

</ResponseField>

<ResponseField name="billing" type="BillingAddress" required typeLink="/developers/api/billing-api-reference/schemas/billingaddress">

No description.

</ResponseField>

<ObjectExample title={`Customer`}>

```json
{
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
}
```

</ObjectExample>

</Api>
