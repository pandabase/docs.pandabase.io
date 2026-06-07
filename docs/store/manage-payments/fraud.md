---
title: "Fraud"
description: "How Pandabase detects and blocks fraudulent payments before they reach your store."
---

Fraudulent payments are a leading cause of disputes and can quickly damage your store's standing with the card networks. Pandabase is equipped to handle even sophisticated fraud — card testing, stolen cards, and account takeover — so most of it never reaches you.

## Four-layer defense

<Steps>
  <Step title="Device reputation">

    When a customer reaches checkout, we analyze their device and assign a device ID and a risk score. A fingerprint tied to a previous dispute starts with a higher score, so repeat offenders are flagged before they pay.

  </Step>
  <Step title="Dynamic 3D Secure">

    When a card payment begins, we apply [3D Secure](/store/manage-payments/disputes#always-on-3d-secure) dynamically based on the card's risk score. Higher-risk cards face a full authentication challenge; trusted ones pass through frictionlessly.

  </Step>
  <Step title="Rules & human review">

    We combine signals from the underlying payment processor with our own fraud-detection toolkit — hundreds of custom rules backed by human review. When a rule is triggered, the payment is routed to manual review, where we accept or refund it.

  </Step>
  <Step title="Early fraud warnings">

    Through partner integrations with processors and the card networks, we receive early fraud warnings (EFWs) on payments likely to be disputed. Because most flagged payments end in a chargeback, we refund them automatically.

  </Step>
</Steps>

## Dispute prevention

Beyond detection, our integrations with **Verifi** (Visa) and **Ethoca** (Mastercard) intercept disputes before they become formal chargebacks. This is highly effective but carries a per-event fee. See [Disputes → Prevention](/store/manage-payments/disputes#prevention) for the full breakdown of fees and outcomes.

## What you can do

No system catches everything, so layer your own defenses on top of ours:

- Use a clear store name and product descriptions — most "fraudulent" disputes are customers not recognizing the charge.
- Send fulfillment confirmations, with receipt and access details in the same email.

With these in place, most of our merchants keep dispute rates well under **0.05%**.

## FAQ

<AccordionGroup>

<Accordion title="Why was my payment refunded automatically?">

We received an **early fraud warning** for that payment from the card network. An EFW means the issuing bank has flagged the charge as likely fraudulent — and once flagged, the vast majority go on to become chargebacks. Refunding immediately avoids the dispute, the dispute fee, and any impact on your dispute rate. Fulfillment is revoked at the same time. See [Early Fraud Warnings](/store/manage-payments/disputes#early-fraud-warnings).

</Accordion>

<Accordion title="Why was I charged $30 and the order refunded?">

That's a **prevented dispute**. A chargeback was filed without an earlier warning, and Verifi or Ethoca intercepted it and resolved it directly with the issuing bank before it became a formal dispute. The customer is refunded by the network, the disputed amount plus a **\$30 prevention fee** is deducted from your balance, and the order moves to `Chargeback` with status **Prevented**.

There's no evidence to submit and no won/lost outcome — but it also has **no impact on your dispute rate**, which is the trade-off: you lose the sale but keep the chargeback off your ratio. See [Prevented disputes](/store/manage-payments/disputes#prevented-disputes).

</Accordion>

</AccordionGroup>
