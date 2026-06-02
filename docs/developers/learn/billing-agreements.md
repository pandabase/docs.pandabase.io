---
title: "Billing Agreements (Mandates)"
description: "Capture a customer's authorization once and charge their saved payment method on demand — for usage-based billing, metered pricing, or any merchant-initiated charge."
---

<Callout type="warn">

Billing Agreements is under active development and currently in **beta**. The
API surface may change as we iterate — reach out to
[support@pandabase.io](mailto:support@pandabase.io) if you have feedback.

</Callout>

<Callout type="info">

Billing agreement endpoints require a scoped [API token](/developers/learn/api-tokens)
with the `BILLING_AGREEMENTS_READ` and/or `BILLING_AGREEMENTS_WRITE`
permissions.

</Callout>

<Callout type="info">

Internally these are referred to as **mandates**. The public-facing name is
**billing agreements** — both terms point to the same underlying object.

</Callout>

## Overview

A mandate captures a customer's authorization to charge a specific payment method on demand. The customer picks the payment method during the agreement flow; from then on you can charge it on a fixed cadence (`WEEKLY`, `MONTHLY`, etc.) or whenever you need to (`AD_HOC`) — without sending the customer back to checkout.

Each charge against a mandate uses a short-lived **Mandate Authorization Token (MAT)**. You request a MAT for a specific amount and reason, the customer is emailed about it, and you submit it to the payments endpoint to actually move the money.

```mermaid
sequenceDiagram
    participant Merchant
    participant Pandabase
    participant Customer

    Merchant->>Pandabase: Create customer
    Merchant->>Pandabase: POST /mandates (customerId, frequency)
    Pandabase-->>Merchant: { id, status: REQUIRES_ACTION, agreementUrl }
    Merchant->>Customer: Redirect to agreementUrl
    Customer->>Pandabase: Authorizes payment method
    Pandabase-->>Pandabase: Mandate → ACTIVE
    Merchant->>Pandabase: POST /mandates/authorizations (mandateId, amount)
    Pandabase->>Customer: Email — MAT obtained
    Pandabase-->>Merchant: { token }
    Merchant->>Pandabase: POST /payments ({ mandate: { id, token } })
    Pandabase-->>Merchant: { id, status: COMPLETED }
```

## 1. Create the customer

Mandates are tied to a customer. Before creating a mandate, create a customer object via the Customers API and grab its `customerId` (`cus_…`).

## 2. Create the mandate

```http
POST /v2/core/stores/:storeId/mandates
```

```json title="Request body"
{
  "customerId": "cus_...",
  "description": "describe why you want to charge them",
  "frequency": "MONTHLY"
}
```

### Frequencies

| Value       | Cadence                                                                  |
| ----------- | ------------------------------------------------------------------------ |
| `ONE_OFF`   | A single expected charge. The mandate auto-revokes after the first success. |
| `WEEKLY`    | One charge every 7 days.                                                 |
| `MONTHLY`   | One charge every 30 days.                                                |
| `QUARTERLY` | One charge per quarter.                                                  |
| `YEARLY`    | One charge per year.                                                     |
| `AD_HOC`    | No fixed cadence — charge whenever you need to.                          |

### Response

```json
{
  "id": "man_...",
  "status": "REQUIRES_ACTION",
  "agreementUrl": "..."
}
```

Send the customer to `agreementUrl` to authorize the mandate. Once they complete the flow, the mandate transitions to `ACTIVE` and is ready to charge. If the bank requires 3D Secure during setup, the same flow handles it — the mandate moves through `REQUIRES_AUTHORIZATION` and lands on `ACTIVE` when the customer finishes.

### Mandate statuses

| Status                   | Meaning                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `REQUIRES_ACTION`        | The customer hasn't completed the agreement yet — send them to `agreementUrl`.                       |
| `REQUIRES_AUTHORIZATION` | A 3D Secure step is required to finish setup. Pandabase handles this transparently — no work for you. |
| `ACTIVE`                 | Authorized and ready to charge.                                                                      |
| `REVOKED`                | The customer revoked the mandate. It cannot be used again.                                           |
| `EXPIRED`                | The mandate expired or the authorization timed out.                                                  |

<Callout type="info">

You don't need to handle 3D Secure during mandate setup — Pandabase walks the
customer through it as part of the agreement flow. 3DS may still be requested
by the bank at charge time; see [Handling 3D Secure on charges](#handling-3d-secure-on-charges) below.

</Callout>

## 3. Get a Mandate Authorization Token

Once the mandate is `ACTIVE`, request a MAT for the specific charge you're about to make. Each MAT is scoped to one charge — amount, currency, and reason.

```http
POST /v2/core/stores/:storeId/mandates/authorizations
```

```json title="Request body"
{
  "mandateId": "man_...",
  "amount": 4999,
  "currency": "USD",
  "description": "why you want to charge"
}
```

`amount` is in the smallest currency unit (e.g. cents for USD).

### Response

```json
{
  "token": "..."
}
```

<Callout type="warn">

Requesting a MAT emails the customer notifying them that you have obtained
authorization to charge their saved payment method. Only request a token when
you're ready to charge.

</Callout>

## 4. Charge the customer

Submit the mandate id and the MAT to the payments endpoint to actually charge the saved payment method.

```http
POST /v2/core/stores/:storeId/payments
```

```json title="Request body"
{
  "mandate": {
    "id": "man_...",
    "token": "..."
  }
}
```

### Response

```json
{
  "id": "pmt_...",
  "status": "COMPLETED"
}
```

`status: "COMPLETED"` means the charge succeeded and the funds have been collected.

### Handling 3D Secure on charges

Sometimes — typically on monthly or higher-value charges — the customer's bank will challenge the payment with 3D Secure. When that happens, the response includes an `authorizationUrl`:

```json
{
  "id": "pmt_...",
  "status": "REQUIRES_3DS",
  "authorizationUrl": "https://secure.pandabase.io/bank-redirects/3ds/..."
}
```

Redirect the customer to `authorizationUrl`. Once they complete the 3DS flow with their bank, the charge automatically succeeds — you don't need to retry the request.
