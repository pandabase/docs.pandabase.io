---
title: "Events"
description: "Reference for every event Pandabase can send to your webhook endpoints."
---

This page lists every event Pandabase sends and what each one means. For delivery semantics, signature verification, and retry behavior, see the [Webhooks overview](/developers/webhooks/overview).

## Payload structure

Every delivery is a JSON `POST` with the event type, a unique event ID, a timestamp, and a `data` object.

<CodeGroup>

```json title="Example payload"
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
    "customer": {
      "id": "cus_cm5x7k2a000001j0g8h3f9d2e",
      "email": "buyer@example.com"
    },
    "geo": {
      "ip": "1.2.3.4",
      "country": "US",
      "city": "Miami",
      "region": "FL"
    }
  }
}
```

```typescript title="Types"
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

interface WebhookPayload {
  event: WebhookEvent;
  id: string;        // evt_ prefixed
  timestamp: string; // ISO 8601
  data: {
    order: {
      id: string;
      orderNumber: string;
      status: string;
      amount: number;   // cents
      currency: string;
      customFields: Record<string, unknown> | null;
      metadata: Record<string, string> | null;
      items: Array<{
        productId: string;
        variantId: string | null;
        name: string;
        quantity: number;
        amount: number; // unit price in cents
      }>;
    };
    customer: { id: string; email: string } | null;
    geo: {
      ip: string;
      country: string | null;
      city: string | null;
      region: string | null;
    } | null;
  };
}
```

</CodeGroup>

All monetary values are in **cents** (integers, no floats).

## Payment events

### `PAYMENT_PENDING`

Fired when a customer initiates payment at checkout. The order has been created and a payment intent is awaiting confirmation.

<Callout type="info">

At this stage, geo data (`city`, `region`, `country`) may be `null` — it is enriched asynchronously after checkout. Subsequent events will include full geo data.

</Callout>

---

### `PAYMENT_COMPLETED`

Fired when a payment is successfully collected. **This is the primary event to listen for when fulfilling orders.**

The order status will be `PROCESSING` (if fulfillment is in progress) or `COMPLETED` (if already fulfilled). The `items` array contains all purchased products, `customFields` includes any data the customer submitted at checkout, and `metadata` contains any developer-defined key-value pairs set when creating the checkout session.

---

### `PAYMENT_FAILED`

Fired when a payment fails, is canceled by the customer, or expires without being completed. The order is moved to `CANCELLED` status. If a coupon was applied, its usage count is automatically restored.

---

### `PAYMENT_REFUNDED`

Fired when a charge is refunded, whether initiated through the Pandabase dashboard or detected from an external refund. The order status is set to `REFUNDED`.

---

### `PAYMENT_DISPUTED`

Fired when a customer opens a chargeback dispute on a payment. The order moves to `CHARGEBACK` status and the disputed amount plus a $20.00 dispute fee is deducted from the store's available balance.

---

### `PAYMENT_DISPUTE_WON`

Fired when a dispute is resolved in the merchant's favor. The disputed amount and fee are restored to the store's available balance and the order returns to `COMPLETED` status.

---

### `PAYMENT_DISPUTE_LOST`

Fired when a dispute is resolved against the merchant. The deducted funds remain lost and the order stays in `CHARGEBACK` status.

---

### `PAYMENT_DISPUTE_PREVENTED`

Fired when Verifi (Visa RDR) or Ethoca prevents a chargeback before it becomes a formal dispute. This is terminal — no `PAYMENT_DISPUTE_WON` or `PAYMENT_DISPUTE_LOST` will follow.

The order moves to `CHARGEBACK` status. The disputed amount plus a **$30.00 prevention fee** is deducted from the store's available balance. Prevented disputes do not count toward your dispute rate.

## Subscription events

Subscription events include the same `order`, `customer`, and `geo` fields as payment events, plus a `subscription` object with the current subscription state. They are fired **alongside** (not instead of) payment events — for example, a successful renewal triggers both `PAYMENT_COMPLETED` and `SUBSCRIPTION_RENEWED`.

<CodeGroup>

```json title="Example payload (SUBSCRIPTION_RENEWED)"
{
  "event": "SUBSCRIPTION_RENEWED",
  "id": "evt_cm5x7k2a000001j0g8h3f9d2e",
  "timestamp": "2026-04-18T00:00:00.000Z",
  "data": {
    "order": {
      "id": "ord_cm5x7k2a000001j0g8h3f9d2e",
      "orderNumber": "cs_cm5x7k2a000001j0g8h3f9d2e",
      "status": "COMPLETED",
      "amount": 1999,
      "currency": "USD",
      "customFields": null,
      "metadata": null,
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 1999
        }
      ]
    },
    "customer": {
      "id": "cus_cm5x7k2a000001j0g8h3f9d2e",
      "email": "buyer@example.com"
    },
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

</CodeGroup>

<Callout type="info">

The `subscription` field is only present on `SUBSCRIPTION_*` events. Payment events (`PAYMENT_COMPLETED`, etc.) do not include it.

</Callout>

### `SUBSCRIPTION_CREATED`

Fired when a new subscription is activated:
- A customer completes checkout for a subscription product (first payment collected), or
- A customer starts a free trial (card saved, no charge).

The `order` in the payload is the initial order that created the subscription. For trial subscriptions, the initial order has an amount of `$0.00` — the first charge happens when the trial ends.

---

### `SUBSCRIPTION_RENEWED`

Fired when a recurring payment is successfully collected. Sent on every billing cycle — weekly, monthly, or yearly depending on the subscription's billing interval. Use this event to extend access, deliver license keys, or update entitlements.

---

### `SUBSCRIPTION_PAST_DUE`

Fired when a renewal payment fails or requires additional authentication (3D Secure). The subscription moves to `PAST_DUE` status. Causes include:
- The customer's card was declined
- The card requires 3DS verification (customer is emailed an authentication link)
- The payment method has expired

Failed payments are automatically retried up to 3 times over 3 days (24h, 48h, 72h). If all retries fail, the subscription is cancelled and a `SUBSCRIPTION_CANCELLED` event is fired.

<Callout type="warn">

Do not revoke access on `SUBSCRIPTION_PAST_DUE` — the customer may still authenticate or the retry may succeed. Wait for `SUBSCRIPTION_CANCELLED` before revoking.

</Callout>

---

### `SUBSCRIPTION_CANCELLED`

Fired when a subscription is cancelled. Causes include:
- The merchant cancels the subscription (immediately or at period end)
- The customer cancels from the customer portal (always at period end)
- All automatic payment retries are exhausted

If cancelled at period end, the customer retains access until the current billing period ends. Check the order's metadata or the subscription API for the `endsAt` date.

---

### `SUBSCRIPTION_PAUSED`

Fired when a merchant pauses a subscription. No further charges are made until the subscription is resumed. The customer retains access during the pause.

---

### `SUBSCRIPTION_RESUMED`

Fired when a merchant resumes a previously paused subscription. Billing resumes at the end of the current period (or immediately if the period has already ended).
