---
title: "Merchant"
description: "The Merchant object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Merchant

<Api>

## Attributes

<ResponseField name="id" type="string" required>

No description.

</ResponseField>

<ResponseField name="name" type="string" required>

No description.

</ResponseField>

<ResponseField name="handle" type="string" required>

No description.

</ResponseField>

<ResponseField name="slug" type="string">

No description.

</ResponseField>

<ResponseField name="logo" type="string">

No description.

</ResponseField>

<ResponseField name="favicon" type="string">

No description.

</ResponseField>

<ResponseField name="accentColor" type="string">

No description.

</ResponseField>

<ResponseField name="primaryColor" type="string">

No description.

</ResponseField>

<ResponseField name="statementDescriptor" type="string">

No description.

</ResponseField>

<ResponseField name="supportEmail" type="string">

No description.

</ResponseField>

<ObjectExample title={`Merchant`}>

```json
{
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
}
```

</ObjectExample>

</Api>
