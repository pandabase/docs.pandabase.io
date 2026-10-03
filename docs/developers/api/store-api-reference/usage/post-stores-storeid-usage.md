---
title: "Report usage events"
description: "Reports usage events against a subscription's meters. Up to 100 events may be reported per call. Duplicate events keyed by `meter_id` and `external_id` are silently skipped. Requires the `USAGE_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Report usage events

Reports usage events against a subscription's meters. Up to 100 events may be reported per call. Duplicate events keyed by `meter_id` and `external_id` are silently skipped. Requires the `USAGE_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/usage/'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="subscription_id" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="events" type="array of object" required>

No description.

<Expandable title="items">

<ParamField name="event_name" type="string" required>

(length 1–64)

</ParamField>

<ParamField name="quantity" type="integer" required>

(range 0–9007199254740991)

</ParamField>

<ParamField name="event_at" type="date-time">

(format `date-time`)

</ParamField>

<ParamField name="external_id" type="string">

(length 1–128)

</ParamField>

<ParamField name="metadata" type="object">

No description.

<Expandable title="properties">


</Expandable>

</ParamField>

</Expandable>

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/usage/ \
  -H "Content-Type: application/json" \
  -d '{"subscription_id":"string","events":[{"event_name":"string","quantity":0,"event_at":"2024-01-01T00:00:00Z","external_id":"string","metadata":{}}]}'
```

</RequestExample>

## Response `201`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `true`)

</ResponseField>

<ResponseField name="data" type="object" required>

No description.

</ResponseField>

<ResponseExample title="201">

```json
{
  "ok": true,
  "data": {
    "subscriptionId": "sub_8h4t6sqzy3x9w5n2k1m0vqbf",
    "accepted": 98,
    "duplicates": 2,
    "rejected": []
  }
}
```

</ResponseExample>

## Response `400`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `false`)

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="400">

```json
{
  "ok": false,
  "error": "string"
}
```

</ResponseExample>

## Response `404`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `false`)

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="404">

```json
{
  "ok": false,
  "error": "string"
}
```

</ResponseExample>

## Response `422`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `false`)

</ResponseField>

<ResponseField name="error" type="string" required>

No description.

</ResponseField>

<ResponseExample title="422">

```json
{
  "ok": false,
  "error": "string"
}
```

</ResponseExample>

</Api>
