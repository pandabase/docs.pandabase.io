---
title: "Send case message"
description: "Posts a reply to a support case. The customer is notified by email. Requires the `CASES_WRITE` scope."
layout: api
method: POST
icon: plus
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Send case message

Posts a reply to a support case. The customer is notified by email. Requires the `CASES_WRITE` scope.

<Api>

<Endpoint method="POST" path={'/stores/{storeId}/cases/{caseId}/messages'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="caseId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

## Body parameters

<ParamField name="body" type="string" required>

(length 1–4000)

</ParamField>

<ParamField name="attachments" type="array of object">

No description.

<Expandable title="items">

<ParamField name="attachmentId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="filename" type="string" required>

(length 1–255)

</ParamField>

<ParamField name="mimeType" type="string" required>

(length 1–128)

</ParamField>

<ParamField name="sizeBytes" type="integer" required>

(range 1–10485760)

</ParamField>

</Expandable>

</ParamField>

<RequestExample title="cURL">

```bash
curl -X POST https://api.pandabase.io/v2/core/stores/:storeId/cases/:caseId/messages \
  -H "Content-Type: application/json" \
  -d '{"body":"string","attachments":[{"attachmentId":"string","filename":"string","mimeType":"string","sizeBytes":0}]}'
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
    "id": "cmsg_q1mzj0kxw5h7n4tr3bcfp2v8",
    "senderType": "MERCHANT",
    "senderId": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
    "body": "Thanks for reaching out. Looking into this now.",
    "createdAt": "2026-05-14T13:00:00.000Z",
    "attachments": []
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

</Api>
