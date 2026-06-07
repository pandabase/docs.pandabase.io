---
title: "Disputes"
description: "How chargebacks work and how to respond to them."
---

A dispute (chargeback) happens when a customer contacts their bank to reverse a payment instead of asking you for a refund. As Merchant of Record, Pandabase receives the dispute from the card network and forwards it to you to respond.

You have **7 days** from when a dispute is opened to submit evidence. We'll email you as soon as one is filed.

<Frame>

<img src="/images/guides/disputes-page.png" alt="Disputes list view with Needs Response, Under Review, Won, and Lost tabs" />

</Frame>

## Lifecycle

<Steps>
  <Step title="Opened">

    Order moves to `Chargeback`. Disputed amount plus a **\$20.00 dispute fee** is deducted from your available balance.

  </Step>
  <Step title="Evidence">

    Submit evidence from the dashboard within 7 days. We forward it to the card network.

  </Step>
  <Step title="Under review">

    The issuing bank reviews. Typically **30 to 75 days**.

  </Step>
  <Step title="Resolved">

    **Won** — funds and fee restored, order returns to `Completed`. **Lost** — deduction stands.

  </Step>
</Steps>

## Reasons

| Reason                 | What it means                                             |
| ---------------------- | --------------------------------------------------------- |
| Fraudulent             | The cardholder claims they didn't authorize the charge.   |
| Product not received   | Customer says they never got what they paid for.          |
| Product unacceptable   | Received but doesn't match the description.               |
| Subscription cancelled | Customer says they cancelled but were billed anyway.      |
| Duplicate              | Customer believes they were charged twice.                |
| Credit not processed   | You promised a refund and the customer never received it. |
| General                | No specific reason given by the issuing bank.             |

## Fees

| Outcome        | Effect                                                                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Dispute opened | Disputed amount + \$20.00 fee deducted from your available balance.                                                                       |
| Won            | Disputed amount and dispute fee restored to your balance.                                                                                 |
| Lost           | Deduction stands. Original processing and platform fees are not refunded.                                                                 |
| Prevented      | Disputed amount + **\$30.00** prevention fee deducted. Terminal, doesn't affect your rate. See [Prevented disputes](#prevented-disputes). |

## Dispute rate

We expect stores to stay **below 0.75%** disputes over a rolling **3-month** window.

Sustained rates above 0.75% lead to outreach from us, additional review on new payments, and — if it doesn't come down — restrictions or loss of card acceptance. You can see your current rate on the [Analytics](/store/analytics) page.

## Respond

Open the disputed order from the **Disputes** page. The detail view shows the dispute reason, disputed amount, dispute fee, total impact on your balance, the original order items, customer info, and the full payment timeline.

<Frame>

<img src="/images/guides/dispute-detail.png" alt="Dispute detail page showing reason, amounts, items, and timeline" />

</Frame>

Click **Submit Evidence** to open the response form.

<Frame>

<img src="/images/guides/submit-evidence.png" alt="Submit Evidence dialog with Activity Log text field" />

</Frame>

Pandabase **automatically includes** the customer's name, email, IP address, and billing address in the evidence package. You provide the **Activity Log** — a written description of how the customer used what they paid for. Up to 20,000 characters. Be specific:

- Login timestamps, session durations, IP addresses they accessed your platform from
- Downloads, license activations, API calls, content viewed
- Delivery confirmations, support tickets, emails or chats with the customer
- For "product unacceptable", what was delivered and how it matched the description
- For "subscription cancelled", proof of continued usage after the alleged cancellation date

You can submit evidence once. Gather everything before submitting.

## Accepting a dispute

There's no "Accept" button. If you don't want to fight a dispute, just don't submit evidence — once the 7-day window closes, the chargeback finalizes against you. The disputed funds and fee stay deducted.

## Prevention

Pandabase prevents most disputes before they reach you. All of the following run automatically — there's nothing to configure.

### Always-on 3D Secure

Every card payment is authenticated with **3D Secure 2** at checkout. If the cardholder can't authenticate, the transaction is rejected.

Successful 3DS shifts liability for fraud disputes from you to the issuing bank in nearly every region we operate.

### Order Insight & Consumer Clarity

When a cardholder questions a charge with their bank, the bank pulls rich order details (product, merchant name, billing address, fulfillment info) directly from Pandabase. Most "I don't recognize this charge" disputes resolve here.

### Early Fraud Warnings

Through our integrations with **Verifi** (Visa) and **Ethoca** (Mastercard), the network sometimes tells us a payment is **likely to be disputed** before the chargeback is filed.

- **Orders ≤ \$50** — refunded automatically. No dispute fee, no impact on your dispute rate, fulfillment revoked.
- **Orders > \$50** — you decide whether to refund pre-emptively or contest. We email you with the EFW reason.

Each EFW carries a **\$29 network fee** (charged by Verifi or Ethoca), deducted from your available balance when we receive the alert. The fee itself is higher than the \$20 dispute fee, but the EFW keeps the chargeback off your dispute rate — which is what matters once you're approaching the 0.75% threshold.

### Prevented disputes

If a chargeback is filed without an earlier EFW, Verifi's **Rapid Dispute Resolution (RDR)** and **Ethoca Alerts** can still catch it and resolve it with the issuing bank before it becomes a formal dispute. The cardholder is refunded by the network.

Unlike an EFW, you don't get a chance to contest — the network intercepts after the dispute is filed. The disputed amount plus a **\$30 prevention fee** is deducted from your balance, the order moves to `Chargeback`, and the dispute appears with status **Prevented**.

There is no evidence to submit, no won/lost outcome, and **no impact on your dispute rate** — that's the value: a prevented dispute costs you the sale but keeps the chargeback off your VDMP/ECM ratio.

### Compelling Evidence 3.0

For fraud-coded disputes, Pandabase automatically submits a **CE 3.0** package when the data supports it. CE 3.0 lets merchants defeat fraud disputes by proving a prior good relationship — we look for **two or more prior undisputed transactions** from the same cardholder with matching IP, device fingerprint, billing address, or customer account.

<Callout type="info">

CE 3.0 has a high win rate but doesn't apply to every dispute. Disputes where the network confirms the card was used without authorization will be lost regardless of any evidence submitted.

</Callout>

## What you can do

- Use a clear store name and product descriptions. Most "fraudulent" disputes are customers not recognizing the charge.
- Make refunds easy. Most disputes start because the customer couldn't get a response from you.
- Send fulfillment confirmations promptly — receipt and access details in the same email.
- Turn on Pandabase **Shield** (beta) to auto-decline high-risk payments at checkout.
