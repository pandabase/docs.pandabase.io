---
title: "Pagination"
description: "The Pagination object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Pagination

<Api>

## Attributes

<ResponseField name="page" type="integer" required>

Current page number

</ResponseField>

<ResponseField name="limit" type="integer" required>

Items per page

</ResponseField>

<ResponseField name="total" type="integer" required>

Total number of items

</ResponseField>

<ResponseField name="totalPages" type="integer" required>

Total number of pages

</ResponseField>

<ObjectExample title={`Pagination`}>

```json
{
  "page": 0,
  "limit": 0,
  "total": 0,
  "totalPages": 0
}
```

</ObjectExample>

</Api>
