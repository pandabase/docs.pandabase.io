---
title: "DynamicItem"
description: "A custom line item with a name and amount (not from your catalog)"
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# DynamicItem

A custom line item with a name and amount (not from your catalog)

<Api>

## Attributes

<ResponseField name="name" type="string" required>

Display name for the line item (length 1–255)

</ResponseField>

<ResponseField name="amount" type="integer" required>

Amount in cents (range 100–1000000)

</ResponseField>

<ResponseField name="quantity" type="integer" required>

(range 1–999)

</ResponseField>

<ObjectExample title={`DynamicItem`}>

```json
{
  "name": "string",
  "amount": 0,
  "quantity": 0
}
```

</ObjectExample>

</Api>
