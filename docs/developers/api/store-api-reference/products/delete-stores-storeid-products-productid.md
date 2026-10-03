---
title: "Delete product"
description: "Soft-deletes a product so it can no longer be purchased. Existing order line items remain intact for historical reference. Requires the `PRODUCTS_WRITE` scope."
layout: api
method: DELETE
icon: trash-2
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Delete product

Soft-deletes a product so it can no longer be purchased. Existing order line items remain intact for historical reference. Requires the `PRODUCTS_WRITE` scope.

<Api>

<Endpoint method="DELETE" path={'/stores/{storeId}/products/{productId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="productId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X DELETE https://api.pandabase.io/v2/core/stores/:storeId/products/:productId
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
    "deleted": true
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
