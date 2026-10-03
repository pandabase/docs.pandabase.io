---
title: "StorefrontCategory"
description: "The StorefrontCategory object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# StorefrontCategory

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

No description.

</ResponseField>

<ResponseField name="displayOrder" type="integer" required>

No description.

</ResponseField>

<ResponseField name="featured" type="boolean" required>

No description.

</ResponseField>

<ResponseField name="metaTitle" type="string">

SEO meta title

</ResponseField>

<ResponseField name="metaDescription" type="string">

SEO meta description

</ResponseField>

<ResponseField name="showInNavigation" type="boolean" required>

Whether to show in storefront navigation

</ResponseField>

<ResponseField name="children" type="array of CategoryRef" required>

Subcategories

</ResponseField>

<ResponseField name="products" type="array of object" required>

Up to 50 active products in this category

<Expandable title="items">

<ResponseField name="id" type="string" required>

No description.

</ResponseField>

<ResponseField name="title" type="string" required>

No description.

</ResponseField>

<ResponseField name="handle" type="string" required>

No description.

</ResponseField>

<ResponseField name="price" type="integer" required>

Price in cents

</ResponseField>

<ResponseField name="images" type="array of string" required>

No description.

</ResponseField>

<ResponseField name="inStock" type="boolean" required>

No description.

</ResponseField>

</Expandable>

</ResponseField>

<ObjectExample title={`StorefrontCategory`}>

```json
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "icon": "string",
  "parentId": "string",
  "displayOrder": 0,
  "featured": true,
  "metaTitle": "string",
  "metaDescription": "string",
  "showInNavigation": true,
  "children": [
    {
      "id": "string",
      "name": "string",
      "slug": "string"
    }
  ],
  "products": [
    {
      "id": "string",
      "title": "string",
      "handle": "string",
      "price": 0,
      "images": [
        "string"
      ],
      "inStock": true
    }
  ]
}
```

</ObjectExample>

</Api>
