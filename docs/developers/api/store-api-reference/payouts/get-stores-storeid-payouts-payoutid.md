---
title: "Get payout"
description: "Retrieves a payout by ID. The response includes the trace ID and expected delivery date once the payout has been dispatched. Requires the `PAYOUTS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get payout

Retrieves a payout by ID. The response includes the trace ID and expected delivery date once the payout has been dispatched. Requires the `PAYOUTS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/payouts/{payoutId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="payoutId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/payouts/:payoutId
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
    "id": "pto_n4tr3bcfp2v8q1mzj0kxw5h7",
    "amount": 500000,
    "fee": 250,
    "status": "PROCESSING",
    "referenceId": "obp_3OXxxxxx0123456789ABCD",
    "payoutMethod": {
      "id": "bnk_q1mzj0kxw5h7n4tr3bcfp2v8",
      "isPrimary": true,
      "status": "APPROVED"
    },
    "createdAt": "2026-05-13T16:20:00.000Z",
    "updatedAt": "2026-05-13T16:21:08.000Z"
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
