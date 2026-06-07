---
title: "Convert to an entity"
description: "Move an individual-owned store under a registered company."
---

<Callout type="warn">

This guide is **deprecated**. An updated version is on the way — the steps below may no longer reflect the current process.

</Callout>

Stores start out **individually owned** — tied to the person who signed up and passed KYC. If you've registered a company and want the store operated under that entity instead, you can request a conversion.

Turnaround is up to **14 business days** from a complete submission.

## Start a conversion

Email [compliance@pandabase.io](mailto:compliance@pandabase.io) with the subject **"Convert store to entity — [store ID]"** and a one-line request. **Don't attach documents.**

We reply with a link to a private submission portal scoped to your account. The link is single-use and expires after 7 days.

<Callout type="warn">

Don't email ID, bank details, or ownership documents. The portal is the only supported intake channel.

</Callout>

<Callout type="info">

Submitted documents are stored encrypted in our internal compliance vault. Access is limited, logged, and audited. Documents are deleted after the regulatory retention window expires, where law allows.

</Callout>

## What you'll upload

### Entity

- Certificate of incorporation or formation (Companies House extract, K-bis, SIRET, IRS EIN letter, etc.)
- Operating agreement, bylaws, or shareholder register
- Proof of registered address (dated within 90 days)
- Tax ID (EIN, VAT, GSTIN, or local equivalent)

### Ownership

- For each beneficial owner with **≥25% stake**: full legal name, date of birth, residential address, nationality, and government-issued ID
- Name and role of the primary controller if different from the largest owner

### Bank account

Business bank account in the entity's legal name. Personal accounts can't be carried over.

| Country     | Fields                                                       |
| ----------- | ------------------------------------------------------------ |
| US          | Account number, 9-digit ABA routing number, account type     |
| UK          | Account number, sort code                                    |
| EU / EEA    | IBAN                                                         |
| Canada      | Account number, transit number, institution number           |
| Other       | IBAN or local equivalent — SWIFT for international rails     |

## Process

<Steps>
  <Step title="Request">

    Email compliance with your store ID.

  </Step>
  <Step title="Portal link">

    We send a single-use submission link.

  </Step>
  <Step title="Upload">

    Submit documents through the portal. Save progress if needed.

  </Step>
  <Step title="Review">

    KYB on the entity and every beneficial owner. Follow-ups come through the portal.

  </Step>
  <Step title="Convert">

    Store ownership re-assigned to the entity. Your personal account becomes the **controller**.

  </Step>
  <Step title="Confirmation">

    Email confirming the new ownership record.

  </Step>
</Steps>

## What changes

|                          | Before                | After                              |
| ------------------------ | --------------------- | ---------------------------------- |
| Store owner              | Individual            | Entity                             |
| Merchant of record       | Your name             | Entity name                        |
| Invoices and receipts    | Your name             | Entity name                        |
| Verification             | Individual KYC        | KYB + UBO KYC                      |
| Payouts                  | Personal bank account | Business bank account              |
| Login                    | Your personal account | Same account, now as **controller**|

## What stays the same

- Store ID, products, orders, customers, balances
- API tokens, webhook endpoints, paylinks
- Active subscriptions and renewals
- Past payout history (new payouts route to the business account from the conversion date)

## First payout after conversion

The new business bank account goes through the standard **In Review** period and the **7 to 14 day waiting period** on the first payout, regardless of prior payout history. This is a compliance requirement.

## Cancelling

You can halt a conversion any time before final approval. After approval, converting back to individual ownership isn't supported.
