---
title: "Events"
description: "Reference for every event Pandabase can send to your webhook endpoints."
layout: "api"
---

This page lists every event Pandabase sends and what each one means. For delivery semantics, signature verification, and retry behavior, see the [Webhooks overview](/developers/webhooks/overview).

## All event types

| Event | Description |
| --- | --- |
| `PAYMENT_PENDING` | A customer initiated payment at checkout and the order is awaiting confirmation. |
| `PAYMENT_COMPLETED` | A payment was successfully collected — the primary event for fulfilling orders. |
| `PAYMENT_FAILED` | A payment failed, was canceled, or expired without completing. |
| `PAYMENT_REFUNDED` | A charge was refunded and the order moved to refunded status. |
| `PAYMENT_DISPUTED` | A customer opened a chargeback dispute on a payment. |
| `PAYMENT_DISPUTE_WON` | A dispute was resolved in the merchant's favor and funds were restored. |
| `PAYMENT_DISPUTE_LOST` | A dispute was resolved against the merchant and funds remain lost. |
| `PAYMENT_DISPUTE_PREVENTED` | A chargeback was prevented before becoming a formal dispute. |
| `SUBSCRIPTION_CREATED` | A new subscription was activated via checkout or a free trial. |
| `SUBSCRIPTION_RENEWED` | A recurring subscription payment was successfully collected. |
| `SUBSCRIPTION_PAST_DUE` | A renewal payment failed or requires additional authentication. |
| `SUBSCRIPTION_CANCELLED` | A subscription was cancelled by the merchant, customer, or failed retries. |
| `SUBSCRIPTION_PAUSED` | A merchant paused a subscription, halting further charges. |
| `SUBSCRIPTION_RESUMED` | A merchant resumed a previously paused subscription. |

## Payload shape

Every delivery is a JSON `POST` with the event type, a unique event ID, a timestamp, and a `data` object.

```typescript title="webhook.d.ts"
type WebhookEvent =
  | "PAYMENT_PENDING"
  | "PAYMENT_COMPLETED"
  | "PAYMENT_FAILED"
  | "PAYMENT_REFUNDED"
  | "PAYMENT_DISPUTED"
  | "PAYMENT_DISPUTE_WON"
  | "PAYMENT_DISPUTE_LOST"
  | "PAYMENT_DISPUTE_PREVENTED"
  | "SUBSCRIPTION_CREATED"
  | "SUBSCRIPTION_RENEWED"
  | "SUBSCRIPTION_PAST_DUE"
  | "SUBSCRIPTION_CANCELLED"
  | "SUBSCRIPTION_PAUSED"
  | "SUBSCRIPTION_RESUMED";
```

All monetary values are in **cents** (integers, no floats).

## Payment events

---

<Webhook event="PAYMENT_PENDING" method="POST" description="A customer initiated payment at checkout and the order is awaiting confirmation.">

Fired when a customer initiates payment at checkout. The order has been created and a payment intent is awaiting confirmation.

<Callout type="info">

At this stage, geo data (`city`, `region`, `country`) may be `null` — it is enriched asynchronously after checkout. Subsequent events will include full geo data.

</Callout>

## Payload

<ResponseField name="event" type="string" required>The event type — always `PAYMENT_PENDING`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order associated with this event. See the [payload shape](#payload-shape).</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request. Often `null` at this stage — enriched asynchronously.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "PAYMENT_PENDING",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-03-07T12:00:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "PENDING",
      "amount": 5000,
      "currency": "USD",
      "customFields": { "discord": "johndoe#1234" },
      "metadata": { "campaign": "spring_sale" },
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 5000
        }
      ]
    },
    "customer": {},
    "geo": null
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="PAYMENT_COMPLETED" method="POST" description="A payment was successfully collected — the primary event for fulfilling orders.">

Fired when a payment is successfully collected. **This is the primary event to listen for when fulfilling orders.**

The order status will be `PROCESSING` (if fulfillment is in progress) or `COMPLETED` (if already fulfilled). The `items` array contains all purchased products, `customFields` includes any data the customer submitted at checkout, and `metadata` contains any developer-defined key-value pairs set when creating the checkout session.

## Payload

<ResponseField name="event" type="string" required>The event type — always `PAYMENT_COMPLETED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The completed order, with status `PROCESSING` or `COMPLETED`.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer who placed the order.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "PAYMENT_COMPLETED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-03-07T12:00:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "COMPLETED",
      "amount": 5000,
      "currency": "USD",
      "customFields": { "discord": "johndoe#1234" },
      "metadata": { "campaign": "spring_sale", "ref": "partner_abc" },
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 5000
        }
      ]
    },
    "customer": {},
    "geo": {
      "ip": "1.2.3.4",
      "country": "US",
      "city": "Miami",
      "region": "FL"
    }
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="PAYMENT_FAILED" method="POST" description="A payment failed, was canceled, or expired without completing.">

Fired when a payment fails, is canceled by the customer, or expires without being completed. The order is moved to `CANCELLED` status. If a coupon was applied, its usage count is automatically restored.

## Payload

<ResponseField name="event" type="string" required>The event type — always `PAYMENT_FAILED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order, now in `CANCELLED` status.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "PAYMENT_FAILED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-03-07T12:05:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "CANCELLED",
      "amount": 5000,
      "currency": "USD",
      "customFields": null,
      "metadata": null,
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 5000
        }
      ]
    },
    "customer": {},
    "geo": null
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="PAYMENT_REFUNDED" method="POST" description="A charge was refunded and the order moved to refunded status.">

Fired when a charge is refunded, whether initiated through the Pandabase dashboard or detected from an external refund. The order status is set to `REFUNDED`.

## Payload

<ResponseField name="event" type="string" required>The event type — always `PAYMENT_REFUNDED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order, now in `REFUNDED` status.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "PAYMENT_REFUNDED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-03-09T09:30:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "REFUNDED",
      "amount": 5000,
      "currency": "USD",
      "customFields": null,
      "metadata": null,
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 5000
        }
      ]
    },
    "customer": {},
    "geo": null
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="PAYMENT_DISPUTED" method="POST" description="A customer opened a chargeback dispute on a payment.">

Fired when a customer opens a chargeback dispute on a payment. The order moves to `CHARGEBACK` status and the disputed amount plus a $20.00 dispute fee is deducted from the store's available balance.

## Payload

<ResponseField name="event" type="string" required>The event type — always `PAYMENT_DISPUTED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order, now in `CHARGEBACK` status.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "PAYMENT_DISPUTED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-03-12T14:00:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "CHARGEBACK",
      "amount": 5000,
      "currency": "USD",
      "customFields": null,
      "metadata": null,
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 5000
        }
      ]
    },
    "customer": {},
    "geo": null
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="PAYMENT_DISPUTE_WON" method="POST" description="A dispute was resolved in the merchant's favor and funds were restored.">

Fired when a dispute is resolved in the merchant's favor. The disputed amount and fee are restored to the store's available balance and the order returns to `COMPLETED` status.

## Payload

<ResponseField name="event" type="string" required>The event type — always `PAYMENT_DISPUTE_WON`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order, returned to `COMPLETED` status.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "PAYMENT_DISPUTE_WON",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-03-20T10:00:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "COMPLETED",
      "amount": 5000,
      "currency": "USD",
      "customFields": null,
      "metadata": null,
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 5000
        }
      ]
    },
    "customer": {},
    "geo": null
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="PAYMENT_DISPUTE_LOST" method="POST" description="A dispute was resolved against the merchant and funds remain lost.">

Fired when a dispute is resolved against the merchant. The deducted funds remain lost and the order stays in `CHARGEBACK` status.

## Payload

<ResponseField name="event" type="string" required>The event type — always `PAYMENT_DISPUTE_LOST`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order, which remains in `CHARGEBACK` status.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "PAYMENT_DISPUTE_LOST",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-03-20T10:00:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "CHARGEBACK",
      "amount": 5000,
      "currency": "USD",
      "customFields": null,
      "metadata": null,
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 5000
        }
      ]
    },
    "customer": {},
    "geo": null
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="PAYMENT_DISPUTE_PREVENTED" method="POST" description="A chargeback was prevented before becoming a formal dispute.">

Fired when Verifi (Visa RDR) or Ethoca prevents a chargeback before it becomes a formal dispute. This is terminal — no `PAYMENT_DISPUTE_WON` or `PAYMENT_DISPUTE_LOST` will follow.

The order moves to `CHARGEBACK` status. The disputed amount plus a **$30.00 prevention fee** is deducted from the store's available balance. Prevented disputes do not count toward your dispute rate.

## Payload

<ResponseField name="event" type="string" required>The event type — always `PAYMENT_DISPUTE_PREVENTED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order, now in `CHARGEBACK` status.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "PAYMENT_DISPUTE_PREVENTED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-03-15T08:00:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "CHARGEBACK",
      "amount": 5000,
      "currency": "USD",
      "customFields": null,
      "metadata": null,
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 5000
        }
      ]
    },
    "customer": {},
    "geo": null
  }
}
```

</ResponseExample>

</Webhook>

---

## Subscription events

---


Subscription events include the same `order`, `customer`, and `geo` fields as payment events, plus a `subscription` object with the current subscription state. They are fired **alongside** (not instead of) payment events — for example, a successful renewal triggers both `PAYMENT_COMPLETED` and `SUBSCRIPTION_RENEWED`.

```typescript title="Subscription type"
interface WebhookSubscription {
  id: string;                    // sub_ prefixed
  status: "TRIALING" | "ACTIVE" | "PAST_DUE" | "PAUSED" | "CANCELLED";
  billingInterval: "WEEKLY" | "MONTHLY" | "YEARLY";
  amount: number;                // cents
  currency: string;
  currentPeriodStart: string;    // ISO 8601
  currentPeriodEnd: string;
  nextChargeAt: string | null;   // null when cancelled/paused
  trialEnd: string | null;
  cancelledAt: string | null;
}
```

<Callout type="info">

The `subscription` field is only present on `SUBSCRIPTION_*` events. Payment events (`PAYMENT_COMPLETED`, etc.) do not include it.

</Callout>

<Webhook event="SUBSCRIPTION_CREATED" method="POST" description="A new subscription was activated via checkout or a free trial.">

Fired when a new subscription is activated:
- A customer completes checkout for a subscription product (first payment collected), or
- A customer starts a free trial (card saved, no charge).

The `order` in the payload is the initial order that created the subscription. For trial subscriptions, the initial order has an amount of `$0.00` — the first charge happens when the trial ends.

## Payload

<ResponseField name="event" type="string" required>The event type — always `SUBSCRIPTION_CREATED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The initial order that created the subscription.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>
<ResponseField name="data.subscription" type="object" required>The newly created subscription. For trials, `status` is `TRIALING` and `trialEnd` is set.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "SUBSCRIPTION_CREATED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-04-18T00:00:00.000Z",
  "data": {
    "order": {},
    "customer": {},
    "geo": null,
    "subscription": {
      "id": "sub_cm5x7k2a000001j0g8h3f9d2e",
      "status": "ACTIVE",
      "billingInterval": "MONTHLY",
      "amount": 1999,
      "currency": "USD",
      "currentPeriodStart": "2026-04-18T00:00:00.000Z",
      "currentPeriodEnd": "2026-05-18T00:00:00.000Z",
      "nextChargeAt": "2026-05-18T00:00:00.000Z",
      "trialEnd": null,
      "cancelledAt": null
    }
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="SUBSCRIPTION_RENEWED" method="POST" description="A recurring subscription payment was successfully collected.">

Fired when a recurring payment is successfully collected. Sent on every billing cycle — weekly, monthly, or yearly depending on the subscription's billing interval. Use this event to extend access, deliver license keys, or update entitlements.

## Payload

<ResponseField name="event" type="string" required>The event type — always `SUBSCRIPTION_RENEWED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order generated for this billing cycle.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>
<ResponseField name="data.subscription" type="object" required>The subscription with its updated billing period.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "SUBSCRIPTION_RENEWED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-04-18T00:00:00.000Z",
  "data": {
    "order": {},
    "customer": {},
    "geo": null,
    "subscription": {
      "id": "sub_cm5x7k2a000001j0g8h3f9d2e",
      "status": "ACTIVE",
      "billingInterval": "MONTHLY",
      "amount": 1999,
      "currency": "USD",
      "currentPeriodStart": "2026-04-18T00:00:00.000Z",
      "currentPeriodEnd": "2026-05-18T00:00:00.000Z",
      "nextChargeAt": "2026-05-18T00:00:00.000Z",
      "trialEnd": null,
      "cancelledAt": null
    }
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="SUBSCRIPTION_PAST_DUE" method="POST" description="A renewal payment failed or requires additional authentication.">

Fired when a renewal payment fails or requires additional authentication (3D Secure). The subscription moves to `PAST_DUE` status. Causes include:
- The customer's card was declined
- The card requires 3DS verification (customer is emailed an authentication link)
- The payment method has expired

Failed payments are automatically retried up to 3 times over 3 days (24h, 48h, 72h). If all retries fail, the subscription is cancelled and a `SUBSCRIPTION_CANCELLED` event is fired.

<Callout type="warn">

Do not revoke access on `SUBSCRIPTION_PAST_DUE` — the customer may still authenticate or the retry may succeed. Wait for `SUBSCRIPTION_CANCELLED` before revoking.

</Callout>

## Payload

<ResponseField name="event" type="string" required>The event type — always `SUBSCRIPTION_PAST_DUE`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order for the failed renewal attempt.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>
<ResponseField name="data.subscription" type="object" required>The subscription, now in `PAST_DUE` status.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "SUBSCRIPTION_PAST_DUE",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-05-18T00:00:00.000Z",
  "data": {
    "order": {},
    "customer": {},
    "geo": null,
    "subscription": {
      "id": "sub_cm5x7k2a000001j0g8h3f9d2e",
      "status": "PAST_DUE",
      "billingInterval": "MONTHLY",
      "amount": 1999,
      "currency": "USD",
      "currentPeriodStart": "2026-04-18T00:00:00.000Z",
      "currentPeriodEnd": "2026-05-18T00:00:00.000Z",
      "nextChargeAt": "2026-05-19T00:00:00.000Z",
      "trialEnd": null,
      "cancelledAt": null
    }
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="SUBSCRIPTION_CANCELLED" method="POST" description="A subscription was cancelled by the merchant, customer, or failed retries.">

Fired when a subscription is cancelled. Causes include:
- The merchant cancels the subscription (immediately or at period end)
- The customer cancels from the customer portal (always at period end)
- All automatic payment retries are exhausted

If cancelled at period end, the customer retains access until the current billing period ends. Check the order's metadata or the subscription API for the `endsAt` date.

## Payload

<ResponseField name="event" type="string" required>The event type — always `SUBSCRIPTION_CANCELLED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order associated with the subscription.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>
<ResponseField name="data.subscription" type="object" required>The subscription, now in `CANCELLED` status with `cancelledAt` set.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "SUBSCRIPTION_CANCELLED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-05-21T00:00:00.000Z",
  "data": {
    "order": {},
    "customer": {},
    "geo": null,
    "subscription": {
      "id": "sub_cm5x7k2a000001j0g8h3f9d2e",
      "status": "CANCELLED",
      "billingInterval": "MONTHLY",
      "amount": 1999,
      "currency": "USD",
      "currentPeriodStart": "2026-04-18T00:00:00.000Z",
      "currentPeriodEnd": "2026-05-18T00:00:00.000Z",
      "nextChargeAt": null,
      "trialEnd": null,
      "cancelledAt": "2026-05-21T00:00:00.000Z"
    }
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="SUBSCRIPTION_PAUSED" method="POST" description="A merchant paused a subscription, halting further charges.">

Fired when a merchant pauses a subscription. No further charges are made until the subscription is resumed. The customer retains access during the pause.

## Payload

<ResponseField name="event" type="string" required>The event type — always `SUBSCRIPTION_PAUSED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order associated with the subscription.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>
<ResponseField name="data.subscription" type="object" required>The subscription, now in `PAUSED` status with `nextChargeAt` set to `null`.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "SUBSCRIPTION_PAUSED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-05-01T00:00:00.000Z",
  "data": {
    "order": {},
    "customer": {},
    "geo": null,
    "subscription": {
      "id": "sub_cm5x7k2a000001j0g8h3f9d2e",
      "status": "PAUSED",
      "billingInterval": "MONTHLY",
      "amount": 1999,
      "currency": "USD",
      "currentPeriodStart": "2026-04-18T00:00:00.000Z",
      "currentPeriodEnd": "2026-05-18T00:00:00.000Z",
      "nextChargeAt": null,
      "trialEnd": null,
      "cancelledAt": null
    }
  }
}
```

</ResponseExample>

</Webhook>

---

<Webhook event="SUBSCRIPTION_RESUMED" method="POST" description="A merchant resumed a previously paused subscription.">

Fired when a merchant resumes a previously paused subscription. Billing resumes at the end of the current period (or immediately if the period has already ended).

## Payload

<ResponseField name="event" type="string" required>The event type — always `SUBSCRIPTION_RESUMED`.</ResponseField>
<ResponseField name="id" type="string" required>Unique identifier for the event, prefixed with `evt_`.</ResponseField>
<ResponseField name="timestamp" type="string" required>ISO 8601 timestamp of when the event occurred.</ResponseField>
<ResponseField name="data.order" type="object" required>The order associated with the subscription.</ResponseField>
<ResponseField name="data.customer" type="object | null">The customer, or `null` if not available.</ResponseField>
<ResponseField name="data.geo" type="object | null">Geo data for the request, or `null` if not available.</ResponseField>
<ResponseField name="data.subscription" type="object" required>The subscription, returned to `ACTIVE` status with `nextChargeAt` set again.</ResponseField>

<ResponseExample title="Example event">

```json
{
  "event": "SUBSCRIPTION_RESUMED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-05-10T00:00:00.000Z",
  "data": {
    "order": {},
    "customer": {},
    "geo": null,
    "subscription": {
      "id": "sub_cm5x7k2a000001j0g8h3f9d2e",
      "status": "ACTIVE",
      "billingInterval": "MONTHLY",
      "amount": 1999,
      "currency": "USD",
      "currentPeriodStart": "2026-04-18T00:00:00.000Z",
      "currentPeriodEnd": "2026-05-18T00:00:00.000Z",
      "nextChargeAt": "2026-05-18T00:00:00.000Z",
      "trialEnd": null,
      "cancelledAt": null
    }
  }
}
```

</ResponseExample>

</Webhook>
