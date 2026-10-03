---
title: "StorefrontCategoryListItem"
description: "The StorefrontCategoryListItem object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# StorefrontCategoryListItem

<Api>

## Attributes

<ResponseField name="id" type="string" required>

No description.

</ResponseField>

<ResponseField name="name" type="string" required>

No description.

</ResponseField>

<ResponseField name="slug" type="string" required>

No description.

</ResponseField>

<ResponseField name="description" type="string">

No description.

</ResponseField>

<ResponseField name="icon" type="string">

No description.

</ResponseField>

<ResponseField name="parentId" type="string">

Parent category ID (null for top-level)

</ResponseField>

<ResponseField name="displayOrder" type="integer" required>

No description.

</ResponseField>

<ResponseField name="featured" type="boolean" required>

No description.

</ResponseField>

<ObjectExample title={`StorefrontCategoryListItem`}>

```json
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "icon": "string",
  "parentId": "string",
  "displayOrder": 0,
  "featured": true
}
```

</ObjectExample>

</Api>
