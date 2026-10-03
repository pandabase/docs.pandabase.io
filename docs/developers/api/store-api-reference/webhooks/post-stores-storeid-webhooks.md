---
title: "Create webhook"
description: "Creates a new webhook endpoint. The secret is returned only on creation and cannot be retrieved later. Requires the `WEBHOOKS_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Create webhook

Creates a new webhook endpoint. The secret is returned only on creation and cannot be retrieved later. Requires the `WEBHOOKS_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/webhooks/'} baseUrl="https://api.pandabase.io/v2/core" />

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

<ParamField name="url" type="uri" required>

(format `uri`, pattern `^https://`, length 0–512)

</ParamField>

<ParamField name="eventTypes" type="array of enum" required>

No description.

</ParamField>

<ParamField name="note" type="string">

(length 0–256)

</ParamField>

<ParamField name="signatureVersion" type="enum">

No description.

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/webhooks/ \
  -H "Content-Type: application/json" \
  -d '{"url":"string","eventTypes":["PAYMENT_PENDING"],"note":"string","signatureVersion":"V1"}'
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
    "id": "whk_5h7n4tr3bcfp2v8q1mzj0kxw",
    "url": "https://example.com/webhooks/pandabase",
    "note": "Production endpoint",
    "isEnabled": true,
    "eventTypes": [
      "PAYMENT_COMPLETED",
      "PAYMENT_REFUNDED",
      "PAYMENT_DISPUTED"
    ],
    "signatureVersion": "V2",
    "createdAt": "2026-04-10T09:00:00.000Z",
    "updatedAt": "2026-05-01T13:42:00.000Z",
    "secret": "whk_secret_abcdefghijklmnop1234567890"
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

</Api>
