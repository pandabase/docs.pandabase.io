---
title: "CustomFieldDefinition"
description: "The CustomFieldDefinition object."
layout: api
icon: box
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# CustomFieldDefinition

<Api>

## Attributes

<ResponseField name="key" type="string" required>

Unique field identifier (pattern `^[a-zA-Z0-9_]+$`, length 0–200)

</ResponseField>

<ResponseField name="label" type="object" required>

No description.

<Expandable title="properties">

<ResponseField name="type" type="string" required>

No description.

</ResponseField>

<ResponseField name="custom" type="string" required>

Display label (length 0–50)

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="type" type="enum" required>

Field input type (one of `text`, `numeric`, `dropdown`)

</ResponseField>

<ResponseField name="optional" type="boolean" default="false">

(defaults to `false`)

</ResponseField>

<ResponseField name="text" type="object">

No description.

<Expandable title="properties">

<ResponseField name="default_value" type="string">

(length 0–255)

</ResponseField>

<ResponseField name="minimum_length" type="integer">

(range 0–∞)

</ResponseField>

<ResponseField name="maximum_length" type="integer">

(range −∞–255)

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="numeric" type="object">

No description.

<Expandable title="properties">

<ResponseField name="default_value" type="string">

(length 0–255)

</ResponseField>

<ResponseField name="minimum_length" type="integer">

(range 0–∞)

</ResponseField>

<ResponseField name="maximum_length" type="integer">

(range −∞–255)

</ResponseField>

</Expandable>

</ResponseField>

<ResponseField name="dropdown" type="object">

No description.

<Expandable title="properties">

<ResponseField name="default_value" type="string">

(length 0–100)

</ResponseField>

<ResponseField name="options" type="array of object">

No description.

<Expandable title="items">

<ResponseField name="label" type="string" required>

(length 0–100)

</ResponseField>

<ResponseField name="value" type="string" required>

(pattern `^[a-zA-Z0-9_]+$`, length 0–100)

</ResponseField>

</Expandable>

</ResponseField>

</Expandable>

</ResponseField>

<ObjectExample title={`CustomFieldDefinition`}>

```json
{
  "key": "string",
  "label": {
    "type": "string",
    "custom": "string"
  },
  "type": "text",
  "optional": false,
  "text": {
    "default_value": "string",
    "minimum_length": 0,
    "maximum_length": 0
  },
  "numeric": {
    "default_value": "string",
    "minimum_length": 0,
    "maximum_length": 0
  },
  "dropdown": {
    "default_value": "string",
    "options": [
      {
        "label": "string",
        "value": "string"
      }
    ]
  }
}
```

</ObjectExample>

</Api>
