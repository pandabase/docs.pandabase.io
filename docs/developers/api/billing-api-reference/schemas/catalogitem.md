---
title: "CatalogItem"
description: "Reference an existing product from your catalog"
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# CatalogItem

Reference an existing product from your catalog

<Api>

## Attributes

<ResponseField name="product_id" type="string" required>

Product ID (prd_ prefix)

</ResponseField>

<ResponseField name="variant_id" type="string">

Optional variant ID (var_ prefix)

</ResponseField>

<ResponseField name="quantity" type="integer" required>

(range 1–999)

</ResponseField>

<ObjectExample title={`CatalogItem`}>

```json
{
  "product_id": "string",
  "variant_id": "string",
  "quantity": 0
}
```

</ObjectExample>

</Api>
