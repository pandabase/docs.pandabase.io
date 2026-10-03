---
title: "Storefront"
description: "The Storefront object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Storefront

<Api>

## Attributes

<ResponseField name="id" type="string" required>

Store ID

</ResponseField>

<ResponseField name="name" type="string" required>

Store name

</ResponseField>

<ResponseField name="handle" type="string" required>

URL-safe store handle

</ResponseField>

<ResponseField name="slug" type="string">

No description.

</ResponseField>

<ResponseField name="description" type="string" required>

Store description

</ResponseField>

<ResponseField name="summary" type="string">

Short selling summary

</ResponseField>

<ResponseField name="logo" type="string">

Store logo URL

</ResponseField>

<ResponseField name="favicon" type="string">

Store favicon URL

</ResponseField>

<ResponseField name="accentColor" type="string">

Hex accent color

</ResponseField>

<ResponseField name="primaryColor" type="string">

Hex primary color

</ResponseField>

<ResponseField name="supportEmail" type="string">

Customer support email

</ResponseField>

<ResponseField name="category" type="array of string" required>

Store categories

</ResponseField>

<ResponseField name="twitterUrl" type="string">

No description.

</ResponseField>

<ResponseField name="instagramUrl" type="string">

No description.

</ResponseField>

<ResponseField name="linkedinUrl" type="string">

No description.

</ResponseField>

<ResponseField name="youtubeUrl" type="string">

No description.

</ResponseField>

<ResponseField name="tiktokUrl" type="string">

No description.

</ResponseField>

<ObjectExample title={`Storefront`}>

```json
{
  "id": "string",
  "name": "string",
  "handle": "string",
  "slug": "string",
  "description": "string",
  "summary": "string",
  "logo": "string",
  "favicon": "string",
  "accentColor": "string",
  "primaryColor": "string",
  "supportEmail": "string",
  "category": [
    "string"
  ],
  "twitterUrl": "string",
  "instagramUrl": "string",
  "linkedinUrl": "string",
  "youtubeUrl": "string",
  "tiktokUrl": "string"
}
```

</ObjectExample>

</Api>
