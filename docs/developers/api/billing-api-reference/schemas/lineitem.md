---
title: "LineItem"
description: "The LineItem object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# LineItem

<Api>

## Attributes

<ResponseField name="name" type="string" required>

No description.

</ResponseField>

<ResponseField name="amount" type="integer" required>

Unit price in cents

</ResponseField>

<ResponseField name="quantity" type="integer" required>

No description.

</ResponseField>

<ResponseField name="image" type="string">

No description.

</ResponseField>

<ObjectExample title={`LineItem`}>

```json
{
  "name": "string",
  "amount": 0,
  "quantity": 0,
  "image": "string"
}
```

</ObjectExample>

</Api>
