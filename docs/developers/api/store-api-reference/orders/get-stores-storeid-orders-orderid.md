---
title: "Get order"
description: "Retrieves an order by ID. Requires the `ORDERS_READ` scope."
layout: api
method: GET
icon: arrow-down-to-line
---

<script>
	import { Api, Endpoint, ParamField, ResponseField, RequestExample, ResponseExample, ObjectExample, Expandable } from '$lib';
</script>

# Get order

Retrieves an order by ID. Requires the `ORDERS_READ` scope.

<Api>

<Endpoint method="GET" path={'/stores/{storeId}/orders/{orderId}'} baseUrl="https://api.pandabase.io/v2/core" />

## Authentication

Requires a bearer token (sk_...) or an API key in the header `Authorization`.

## Path parameters

<ParamField name="storeId" type="string" required>

(length 12–48)

</ParamField>

<ParamField name="orderId" type="string" required>

(length 12–48)

</ParamField>

## Header parameters

<ParamField name="idempotency-key" type="string">

(length 8–32)

</ParamField>

<RequestExample title="cURL">

```bash
curl -X GET https://api.pandabase.io/v2/core/stores/:storeId/orders/:orderId
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
    "id": "ord_p2v8q1mzj0kxw5h7n4tr3bcf",
    "orderNumber": "cs_abcdef0123456789",
    "status": "COMPLETED",
    "amount": 2900,
    "currency": "USD",
    "discounted": false,
    "discountCode": null,
    "customer": {
      "id": "cus_j8h0r1n4tzcbfp2v8q1mzwx5",
      "email": "buyer@example.com"
    },
    "payment": {
      "id": "pmt_5h7n4tr3bcfp2v8q1mzj0kxw",
      "referenceId": "pi_3OXxxxxx0123456789ABCDEF",
      "amount": 2900,
      "discountAmount": 0,
      "platformFeeAmount": 191,
      "pspFeeAmount": 114,
      "taxAmount": 20,
      "totalAmount": 2920,
      "settledAmount": 2615,
      "presentmentCurrency": null,
      "presentmentAmount": null,
      "exchangeRate": null,
      "status": "COMPLETED",
      "pspProvider": "MULTI_PSP",
      "paymentMethod": {
        "type": "card",
        "cardBrand": "visa",
        "cardLastFour": "4242"
      },
      "couponCode": null,
      "taxId": null,
      "createdAt": "2026-05-14T12:34:56.000Z"
    },
    "createdAt": "2026-05-14T12:34:56.000Z",
    "presentmentCurrency": null,
    "presentmentAmount": null,
    "exchangeRate": null,
    "customFields": null,
    "metadata": null,
    "returnUrl": null,
    "items": [
      {
        "id": "itm_3bcfp2v8q1mzj0kxw5h7n4tr",
        "productId": "prd_8h4t6sqzy3x9w5n2k1m0vqbf",
        "variantId": null,
        "name": "Pro Plan",
        "quantity": 1,
        "price": 2900
      }
    ],
    "billingAddress": {
      "id": "badr_w5h7n4tr3bcfp2v8q1mzj0kx",
      "addressLine1": "1 Market St",
      "addressLine2": null,
      "city": "San Francisco",
      "state": "CA",
      "postalCode": "94105",
      "country": "US"
    },
    "licenses": [],
    "updatedAt": "2026-05-14T12:35:10.000Z"
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
