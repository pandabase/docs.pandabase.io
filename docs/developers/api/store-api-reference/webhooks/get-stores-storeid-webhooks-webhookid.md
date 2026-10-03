---
title: "Get webhook"
description: "Retrieves a webhook endpoint by ID. Requires the `WEBHOOKS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get webhook

Retrieves a webhook endpoint by ID. Requires the `WEBHOOKS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/webhooks/{webhookId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="webhookId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/webhooks/:webhookId
```

</RequestExample>

## Response `200`

Default Response

<ResponseField name="ok" type="enum" required>

(one of `true`)

</ResponseField>

<ResponseField name="data" type="object" required>

No description.

</ResponseField>

<ResponseExample title="200">

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
    "updatedAt": "2026-05-01T13:42:00.000Z"
  }
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

</Api>
