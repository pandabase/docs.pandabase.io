---
title: "BillingAddress"
description: "The BillingAddress object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# BillingAddress

<Api>

## Attributes

<ResponseField name="line1" type="string" required>

(length 0–200)

</ResponseField>

<ResponseField name="line2" type="string">

(length 0–200)

</ResponseField>

<ResponseField name="city" type="string" required>

(length 0–100)

</ResponseField>

<ResponseField name="state" type="string" required>

(length 0–100)

</ResponseField>

<ResponseField name="postal_code" type="string" required>

(length 0–20)

</ResponseField>

<ResponseField name="country" type="string" required>

ISO 3166-1 alpha-2 country code (length 2–2)

</ResponseField>

<ObjectExample title={`BillingAddress`}>

```json
{
  "line1": "string",
  "line2": "string",
  "city": "string",
  "state": "string",
  "postal_code": "string",
  "country": "string"
}
```

</ObjectExample>

</Api>
