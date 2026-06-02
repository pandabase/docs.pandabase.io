---
title: Changelog
description: "Keep track of every change to the Pandabase API."
---

<Update label="May 29, 2026">

**Payment method on payments & exports**

## Features

- **Payment method on orders and payments**: Order and payment responses now include a `paymentMethod` object describing how the customer paid: `{ type, cardBrand, cardLastFour }`. For card payments, `type` is `"card"` and the brand and last four digits are populated (for example `"visa"` and `"4242"`). For other methods, `type` is the method used, such as `"link"`, `"cashapp"`, `"sepa_debit"`, or `"us_bank_account"`, with the card fields left `null`. Available on order detail, payment detail, and the payments list. The fields are `null` on payments that have not completed yet.
- **Payment method in Payment Activity reports**: The Payment Activity export now includes `payment_method`, `card_brand`, and `card_last_four` columns in both CSV and JSON formats.

</Update>

<Update label="May 25, 2026">

**Order metadata in exports**

## Features

- **Order metadata in Payment Activity reports**: The Payment Activity report now includes an `order.metadata` column in both CSV and JSON formats. Appended as the last column so existing column order is preserved.

</Update>

<Update label="May 24, 2026">

**Clearer ledger notes**

## Improvements

- **Friendlier balance ledger notes**: Entry descriptions across payments, refunds, chargebacks, payouts, and subscription renewals have been rewritten for clarity. Existing entries are unchanged; the new wording applies to entries written from this date forward.

</Update>

<Update label="May 23, 2026">

**Store search endpoint**

## Features

- **Search**: New `GET /v2/stores/:storeId/search?q=<input>` resolves any Pandabase resource ID, a customer email, or an order number to a uniform result `{ kind, id, label, sublabel, link, createdAt }`. Accepts up to 10 comma-separated inputs per request and is rate-limited to 30 requests per minute.

</Update>

<Update label="May 22, 2026">

**Reports API, Idempotency Keys & Email References**

## Features

- **Reports API**: Generate financial exports asynchronously, delivered as a signed download URL and notification email.
  - `POST /v2/stores/:storeId/reports` queues a report.
  - `GET /v2/stores/:storeId/reports` lists reports, filterable by `status` and `type`.
  - `GET /v2/stores/:storeId/reports/:reportId` returns status and metadata.
  - `GET /v2/stores/:storeId/reports/:reportId/download/:format` returns a 5-minute pre-signed download URL.
  - Types: `PAYMENT_ACTIVITY`, `PAYOUT_RECONCILIATION`, `BALANCE_LEDGER`, `REFUNDS_DISPUTES`. Formats: `CSV`, `JSON`.
  - Period window is capped at 90 days per request. At most 10 reports per store may be `PENDING` or `PROCESSING` concurrently; further requests return `429`.
  - Statuses: `PENDING → PROCESSING → SUCCEEDED | FAILED`. Generated files are retained for 30 days.
  - Available on the Store API at `/v2/core/stores/:storeId/reports` behind two new token scopes: `REPORTS_READ` and `REPORTS_WRITE`. Existing tokens are unaffected.
  - New notification preference `notifications.reportReady` (default `true`) controls the ready and failure emails.

- **Idempotency keys**: Three endpoints now honor an `Idempotency-Key` request header:
  - `POST /v2/stores/:storeId/orders/:orderId/refund`
  - `POST /v2/stores/:storeId/payouts`
  - `POST /v2/stores/:storeId/checkouts/:sessionId/pay`

  Keys must be 1 to 255 characters of `[A-Za-z0-9_-]`. A replayed request with the same key and matching body returns the original response with header `Idempotent-Replay: true`. A reused key with a different body returns `422`. A request that arrives while the original is still in flight returns `409`. Stored results live for 24 hours. `5xx` responses are not stored, so the next attempt re-executes.

- **Email reference numbers**: Every outbound email now ends with a `Ref: <id>` line in the footer. Quote this id when contacting support to locate any message.

## Fixes

- The webhook test endpoint (`POST /v2/stores/:storeId/webhooks/:webhookId/test`) now accepts every `SUBSCRIPTION_*` event type in addition to `PAYMENT_*`.

</Update>

<Update label="May 21, 2026">

**Usage-based billing**

## Features

- **Manage meters from the Store API**: List, create, fetch, update, and delete usage meters on a product without leaving your codebase. Gated by new `METERS_READ` / `METERS_WRITE` token scopes.
- **Subscription usage endpoint**: `GET /v2/core/stores/:storeId/subscriptions/:subscriptionId/usage` returns a live projection of the current billing period together with summaries of past periods. Useful for building your own usage and billing reports. Gated by `USAGE_READ`.
- **Clearer OpenAPI reference**: Every endpoint description in the Store API has been rewritten for consistency and to match the rest of the docs.

See the [usage-based billing guide](/developers/learn/usage-based-billing) for the meter model, event ingestion, and renewal math.

</Update>

<Update label="May 17, 2026">

**Prevented disputes**

## Features

- **`PAYMENT_DISPUTE_PREVENTED`**: New webhook event fired when Verifi (Visa RDR) or Ethoca prevents a chargeback before it becomes a formal dispute.
- **\$30 prevention fee**: Disputed amount plus the prevention fee is deducted from your balance. Prevented disputes do not count toward your dispute rate. The `Dispute` resource exposes the new `PREVENTED` status, and the dispute-list endpoint accepts it as a filter.

You can opt in by adding `PAYMENT_DISPUTE_PREVENTED` to your endpoint's `eventTypes`. See [events](/developers/webhooks/events) and the [disputes guide](/store/manage-payments/disputes).

</Update>

<Update label="May 15, 2026">

**Standard Webhooks support**

## Features

- **Standard Webhooks**: Endpoints now run in **V2** ([Standard Webhooks](https://www.standardwebhooks.com) v1, SDK-verifiable). New endpoints default to V2; **V1 is deprecated** and will be removed after a 60-day notice — migrate now.
- **`signatureVersion` field**: Set the mode on `POST` / `PATCH` webhook endpoints; returned on every response.
- **Test events match live mode**: Test deliveries send the same headers a real delivery would.
- **V2 drops `X-Pandabase-*` headers**; V1 endpoints keep both.
- **Retries now span ~75 hours** (9 attempts, 5s → 24h, ±10% jitter). Was: 5 attempts within ~30s.

See the [webhook overview](/developers/webhooks/overview) and [migration guide](/developers/webhooks/migrate-signatures).

</Update>

<Update label="May 14, 2026">

**Refunds, Disputes, Webhook Signatures & New Payment Methods**

## Features

- **Refunds & Disputes in the Store API**: Programmatic endpoints to list refunds, fetch a refund, issue a refund, list disputes, fetch a dispute, and submit dispute evidence. Gated by new `REFUNDS_READ` / `REFUNDS_WRITE` / `DISPUTES_READ` / `DISPUTES_WRITE` token scopes.
- **`Webhook-Signature` header on outgoing webhooks**: New, replay-resistant signature alongside the existing `X-Pandabase-Signature`. We recommend migrating verification logic; the legacy header stays for backwards compatibility for now. Verification details and migration guide in the docs.
- **Failed-webhook email alerts**: Store owners now get an email when an endpoint stops accepting deliveries, so a quietly-broken integration doesn't go unnoticed.
- **New payment methods**: Bizum (EUR) and Pay by Bank (GBP) are now available at checkout in their respective regions.
- **More resilient subscription renewals**: Same renewal can no longer fire twice within a billing cycle, and transient errors (e.g., upstream payment blip) reschedule a quick retry without counting against the retry budget.

</Update>

<Update label="May 12, 2026">

**Dynamic Line Items**

## Fixes

- Dynamic line items in a checkout no longer count against the per-store catalog cap.

</Update>

<Update label="May 10, 2026">

**Credit/Debit Payouts & Verification**

## Features

- **Credit / debit payouts**: New routes for non-bank payout rails.
- **Improved bank account verification flow**: New accounts go through a verification window before becoming eligible for payouts.

</Update>

<Update label="May 7, 2026">

**Case Auto-Reply & Auto-Close**

## Features

- **Case auto-reply and auto-close**: Configurable auto-reply on first customer message; idle cases close automatically after a period of no activity.

</Update>

<Update label="May 6, 2026">

**Tax Details Endpoint**

## Features

- **Tax details endpoint**: Returns the tax breakdown that will apply to a checkout given items and billing country.

</Update>

<Update label="May 5, 2026">

**Monthly Revenue Analytics**

## Features

- **Monthly revenue endpoint**: Month-over-month gross/net revenue analytics.

</Update>

<Update label="May 1, 2026">

**Paylinks & Email Reliability**

## Features

- **Paylinks**: Static, shareable checkout URLs. Supports usage caps, expiry, and a mix of catalog products plus dynamic line items. `POST /v2/storefront/paylinks/:paylinkId/checkout` to open a session — no auth needed.
- **More reliable transactional emails**: Receipts, refund notices, and KYC results now retry longer before giving up.

</Update>

<Update label="April 29, 2026">

**Payout Fee Country Fix**

## Fixes

- **Payout fees now use the bank account's country**: Fixes incorrect cross-border fee estimates for stores whose bank account is in a different country than the store itself.

</Update>

<Update label="April 28, 2026">

**Shield (Beta)**

## Features

- **Shield (beta)**: Rules engine for blocklists / allowlists across emails, IP ranges, BIN ranges, and country codes. Auto-decline matching payments at checkout.

</Update>

<Update label="April 25, 2026">

**Cases API & Live Payout Fees**

## Features

- **Cases API for merchants**: Programmatic access to support tickets — list, get, reply, mark read — over the Store API and via the MCP server.
- **Payout fees are now quoted live**: Replaces the previous static fee table. Quote breakdown (`standard_payout_fee`, `cross_border_payout_fee`, `foreign_exchange_fee`) is exposed on payout request responses.

</Update>

<Update label="April 19, 2026">

**Support Cases**

## Features

- **Support cases**: Customers can now open support tickets on their completed orders directly from the Pandabase portal. Merchants get real-time email notifications and can reply via the Store API or the customer portal.

- **Pandabase support intervention**: When a case needs platform oversight, our team can join the conversation. Staff replies are visible to both parties and clearly branded as Pandabase Support — no back-channels.

- **Attachments**: Up to 5 files per message, allowlist (`image/*`, `application/pdf`, `text/plain`, `application/zip`). All URLs are short-lived.

- **Customer emails now route through the portal**: Payment, order, subscription, and refund emails to customers no longer link to external support addresses — they direct users to sign in at `mypandabase.com` and open a ticket against the relevant order.

</Update>

<Update label="April 19, 2026">

**5 New Supported Countries**

## Features

- **5 new merchant countries**: Pandabase is now available to merchants in Israel, Romania, Hong Kong, Philippines, and Morocco — bringing total coverage to **43 countries**.

</Update>

<Update label="April 18, 2026">

**Payment Methods in Checkout Estimate**

## Features

- **`available_payment_methods` in checkout estimate**: The `POST /v2/stores/:storeId/checkouts/estimate` endpoint
  now returns a list of supported payment methods based on the customer's country, alongside the existing
  presentment currency resolution. Global methods (Card, Apple Pay, Google Pay) are always included, with
  country-specific methods added on top:
  - **US**: Cash App, Amazon Pay, WeChat Pay, Alipay
  - **UK**: Cash App, Amazon Pay (plus EU methods)
  - **EU/EEA** (Eurozone, Czechia, Denmark, Hungary, Poland, Sweden, Norway, Switzerland): iDEAL/Wero, Bancontact,
    Multibanco, MB WAY, EPS, Przelewy24, BLIK, Amazon Pay
  - **Brazil**: PIX
  - **India**: UPI
  - **South Korea**: Naver Pay, Kakao Pay, PAYCO, Samsung Pay

</Update>

<Update label="April 3, 2026">

**New Supported Countries**

## Features

- **9 new supported countries**: Pandabase is now available to merchants in Australia, New Zealand, India, United Arab Emirates, Qatar, Taiwan, Vietnam, Thailand, and Switzerland. Local bank transfers are supported for Australia (BECS), New Zealand, India (NEFT/IMPS), Thailand, and Switzerland (SEPA). Wire (SWIFT) payouts are available for Thailand, Vietnam, United Arab Emirates, Qatar, and Taiwan.

</Update>

<Update label="March 29, 2026">

**Inclusive Tax, Coupon Restrictions & Async Payment Support**

## Features

- **Inclusive tax support**: Stores can now set their tax behavior to `INCLUSIVE` via store settings. When enabled, product prices are treated as tax-inclusive and the tax portion is back-calculated for invoices and accounting. Configure via `PATCH /v2/stores/:storeId` with `taxBehavior: "INCLUSIVE"`.
- **Async payment method support**: Payments via ACH, SEPA, and other bank transfer methods now show a `PROCESSING` status while the payment clears. Customers receive an email confirming their payment is in progress.
- **Coupon customer restrictions enforced**: `firstPurchaseOnly` and `maxUsesPerCustomer` coupon settings are now validated at checkout. Previously these were stored but not enforced.
- **Max coupons per store**: Increased from 100 to 1,000.

## Fixes

- Checkout now rejects email addresses in the customer name field.

</Update>

<Update label="March 26, 2026">

**Product-Scoped Coupons**

## Features

- **Product-scoped coupons**: Coupons can now be restricted to specific products. When a coupon has products assigned, the discount only applies to those items in the cart. Coupons without product scoping continue to apply to the entire cart.
  - Set `productIds` when creating or updating a coupon to scope it to specific products.
  - Pass `null` or an empty array to remove the product scope.
  - Available across all coupon endpoints, including the Store API.

</Update>

<Update label="March 20, 2026">

**Subscriptions & Recurring Billing (Beta)**

## Features

- **Recurring billing**: Merchants can now sell subscription products with automatic recurring charges. Supports weekly, monthly, and yearly billing intervals.
- **Free trials**: Subscription products can offer a free trial period. Customers save their card during checkout and are charged automatically when the trial ends.
- **Subscription management**: New endpoints to list, view, cancel, pause, and resume subscriptions. Available via the Store API and the customer portal.
  - `GET /v2/stores/:storeId/subscriptions`
  - `GET /v2/stores/:storeId/subscriptions/:subscriptionId`
  - `POST /v2/stores/:storeId/subscriptions/:subscriptionId/cancel`
  - `POST /v2/stores/:storeId/subscriptions/:subscriptionId/pause`
  - `POST /v2/stores/:storeId/subscriptions/:subscriptionId/resume`
- **Customer portal subscriptions**: Customers can view and cancel their subscriptions across all stores from the customer portal at mypandabase.com.
- **Subscription invoices**: Customers receive a PDF invoice via email on every successful renewal charge.
- **3D Secure on renewals**: When a renewal payment requires additional authentication, customers receive an email with a secure link to verify the payment.
- **Subscription webhooks**: Six new webhook events — `SUBSCRIPTION_CREATED`, `SUBSCRIPTION_RENEWED`, `SUBSCRIPTION_PAST_DUE`, `SUBSCRIPTION_CANCELLED`, `SUBSCRIPTION_PAUSED`, `SUBSCRIPTION_RESUMED`.
- **Store API support**: Subscription endpoints available via token-authenticated Store API with `SUBSCRIPTIONS_READ` and `SUBSCRIPTIONS_WRITE` permissions.

</Update>

<Update label="March 16, 2026">

**Checkout Customization & Store Onboarding**

## Features

- **Checkout title & description**: Customize the heading and description shown on the checkout page. Title defaults to your store name. Description is only shown when explicitly set.
- **Store questionnaire**: New onboarding questionnaire for stores. Required before accepting payments — collects business type, description, country, and expected volume. Companies and nonprofits also provide legal entity name, tax ID, and registered address.
- **Localized payment toggle**: Merchants can now enable or disable local currency payments per store via `PATCH /v2/stores/:storeId`.
- **Improved payout error messages**: Payout requests now show a detailed breakdown when balance is insufficient, including the total needed and fee breakdown.
- **Receipt support email**: Order receipt emails now show the merchant's support email instead of a generic address.
- **Max stores increased**: Accounts can now create up to 10 stores (previously 3).

</Update>

<Update label="March 12, 2026">

**Local Currency Payments & Balance Ledger**

## Features

- **Local currency payments**: Customers are now charged in their local currency when checking out from a supported country. This enables payment methods like PIX, iDEAL, SEPA Debit, Bancontact, Naver Pay, Kakao Pay, and more. Settlements remain in USD.
- **Balance ledger**: New `GET /v2/stores/:storeId/payouts/ledger` endpoint for a full audit trail of balance changes — payments, refunds, disputes, and payouts.
- **Presentment data on orders**: Order and payment responses now include `presentmentCurrency`, `presentmentAmount`, and `exchangeRate` when a local currency was used.

</Update>

<Update label="March 11, 2026">

**Payouts Expansion & New Countries**

## Features

- **New payout countries**: Added Canada, Singapore, Turkiye, Hungary, Sweden, Denmark, and Norway.
- **SWIFT transfers**: Merchants in countries without local rail support can now receive payouts via SWIFT.
- **Country-specific bank accounts**: Sort codes (GB), transit/institution numbers (CA), bank/branch codes (SG), SWIFT/BIC codes (TR), and IBAN (EU/EEA).
- **Bank account verification**: UK bank accounts are now verified against the bank's records before being accepted.
- **Payout emails**: Merchants now receive an email when a payout is requested with estimated processing timeline.

## Fixes

- Platform fee adjusted from 6% to 5.9% per transaction.

</Update>

<Update label="March 10, 2026">

**Checkouts, Storefront, Fraud Protection & Teams**

## Features

- **Early fraud protection**: Payments flagged with early fraud warnings are now automatically refunded for low-value orders or flagged for manual review. Merchants are notified via email.
- **Dispute status tracking**: Disputes now transition to `UNDER_REVIEW` when evidence is submitted to the card network.
- **Team notifications**: All team actions (add, remove, role update) now send email notifications to both the affected member and the store owner.
- **Role update notifications**: Changing a team member's role now sends a notification showing the previous and new role with permission details.
- **Improved order timeline**: Added fulfillment started and payment failed events to the order timeline.
- **Partial customer prefill**: Create checkout sessions with just `name` and `email` — billing address can be added later via `PATCH`. Tax is calculated once billing is provided.
- **Lower item minimums**: Dynamic checkout items can now be as low as $0.01 per unit. The total checkout amount must still be at least $1.00.
- **Storefront store resolution**: New `GET /v2/storefront/resolve/:handle` endpoint to look up a store by its handle — useful for subdomain-based routing.
- **Storefront product by handle**: New `GET /v2/storefront/stores/:storeId/products/by-handle/:handle` endpoint to fetch a product by its URL-friendly handle.

## Fixes

- Fixed refund response returning incorrect amount.
- Fixed dispute won incorrectly restoring the non-refundable dispute fee to merchant balance.
- Fixed coupon usage not rolling back when refunds are initiated externally.
- Fixed refund confirmation emails not being sent on certain refund paths.
- Total minimum is now enforced unconditionally on all checkout endpoints (estimate, create, update). Previously, the check was skipped when no billing address was provided.
- Fixed storefront routes returning `500` errors instead of proper JSON error responses.
- Fixed storefront resolve endpoint failing when `storeId` was not present in the URL.

</Update>

<Update label="March 9, 2026">

**Metadata & Docs**

## Features

- **Checkout metadata**: Attach arbitrary key-value string pairs (`metadata`) when creating checkout sessions. Metadata flows through orders, webhook payloads, and fulfillment webhooks. Max 20 keys, key max 40 chars, value max 500 chars.
- **Product soft delete**: Products are now soft-deleted via `deleted_at` field. Soft-deleted products are excluded from storefront listings, checkout item resolution, and all product queries. Order history is preserved.

## Fixes

- Fixed deleted products still appearing in checkout item resolution.
- Added GB (United Kingdom) as a supported merchant country.

</Update>

<Update label="March 7, 2026">

**V2 API Launch**

## V2 API

The V2 API is a complete rewrite of the Pandabase API with breaking changes. You cannot migrate from V1 endpoints to V2 directly.

**Key changes from V1:**

- New response format: `{ ok: true, data }` / `{ ok: false, error }`
- New pagination format: `{ items, pagination: { page, limit, total, totalPages } }`
- Stricter request validation with better error messages
- Magic link authentication (no passwords)
- All monetary values in cents (integers, no floats)

### New Modules

- **Checkouts**: Stateful checkout sessions with custom fields (text, numeric, dropdown), coupon/tax support, and pay-what-you-want pricing
- **Storefront**: Public read-only API for store info, products (with variants/options), and categories — no authentication required
- **Store API**: Token-authenticated programmatic API with granular permissions (Bearer or HMAC authentication)
- **Licenses**: Encrypted license key management with verification endpoint and activation tracking
- **API Logs**: Request audit logging with 30-day retention for Store API requests
- **Customers**: Read-only customer management (customers created automatically during checkout)

### New Webhook Events

Webhook event names are now uppercase enum values:

| V1 Event           | V2 Event               |
| ------------------ | ---------------------- |
| `payment.pending`  | `PAYMENT_PENDING`      |
| `payment.success`  | `PAYMENT_COMPLETED`    |
| `payment.failed`   | `PAYMENT_FAILED`       |
| `payment.refunded` | `PAYMENT_REFUNDED`     |
| `payment.disputed` | `PAYMENT_DISPUTED`     |
| —                  | `PAYMENT_DISPUTE_WON`  |
| —                  | `PAYMENT_DISPUTE_LOST` |

### New Webhook Payload

V2 webhook payloads include `order`, `customer`, and `geo` data in a structured format. See the [webhook events reference](/developers/webhooks/events) for full details.

### Products

- Variants with options, slug, description, SKU, stock tracking, and positioning
- Product options (e.g. Size, Color) with values array
- Fulfillment modes: `MANAGED_LICENSE`, `LICENSE_POOL`, `LICENSE_WEBHOOK`, `INSTANT_DOWNLOAD`, `REDIRECT`, `MANUAL`
- Pricing models: `STANDARD`, `PAY_WHAT_YOU_WANT`, `FREE`
- Product status: `DRAFT` / `ACTIVE`
- Availability windows (`available_from`, `available_until`)
- Max per customer limits
- Unique handles per store (auto-generated from title)

### Orders

- Timeline events for full payment/refund/dispute/fulfillment audit trail
- Dispute evidence submission with auto-filled MoR data
- Fulfillment retry for failed webhook deliveries
- Order receipts with license key delivery via email

### Payouts

- Bank account management via global payouts
- Payout requests with minimum $5 threshold
- Safe concurrent payout processing

### Teams

- Role-based access control: `VIEWER`, `MODERATOR`, `DEVELOPER`, `ADMINSTRATOR`
- Team member CRUD (admin only)

### Authentication

- Magic link auth (passwordless) with 10-minute TTL
- Session management with IP binding, device/browser/OS tracking
- TOTP-based 2FA
- Phone verification via Twilio
- KYC verification via SumSub

### Supported Countries

Merchants can now onboard from: US, GB, AT, BE, CY, CZ, DE, EE, ES, FI, FR, GR, HR, IE, IT, LT, LU, LV, MT, NL, PL, PT, SI, SK.

## Deprecations

- V1 API endpoints are deprecated and will be removed on **April 1st, 2026**
- V1 webhook event format (`payment.success`, `payment.paid`, etc.) replaced by V2 uppercase events
- V1 `Transaction` model replaced by `InboundPayment` in V2
- V1 `Recipient` and `Payout` models replaced by `OutboundPayoutMethod` and `OutboundPayout`

</Update>

<Update label="November 30, 2024">

**Features and Fixes**

## Features

- Added support for applying coupons during checkout.
- Introduced support for additional currencies (EUR, GBP).
- Added guest and authenticated customer management.
- Improved session management and user lifecycle handling.

## Fixes

- Resolved issues with file validation during uploads.
- Improved category and slug validations.
- Fixed bugs in session retrieval and pagination.

</Update>

<Update label="October 22, 2024">

**API Schema Updates**

## New Properties

- `tax_calculation_enabled`, `localized_pricing_enabled`, `regional_pricing_enabled` on shop flags
- `checkout_collect_phone_enabled`, `checkout_verify_email_enabled` on shop flags
- `images[]` and `categories[]` on product objects
- `icon_url` on shop objects

## Pagination

List responses now include a `meta` object with `page_size` (default 10) and `page` (default 1).

## Filtering and Sorting

Added optional `filter`, `sort`, and `search` query parameters to list endpoints.

</Update>

<Update label="September 20, 2024">

**Major Features Release**

## New Features

- **MoR Model**: Pandabase as Merchant of Record.
- **Advanced Analytics**: Store analytics endpoints.
- **Dynamic Payments**: Custom fields during checkout.
- **Idempotency**: Support for `POST`, `PUT`, and `PATCH` requests.
- **File API**: Intent-based file uploads at `/files`.

</Update>

<Update label="August 30, 2024">

**Public Endpoints**

- Added `/public` endpoints with filtering support.
- Added `/onboarding` and `/login` endpoints.
- Added `flags` to shops.

</Update>

<Update label="June 6, 2024">

**Categories Support**

- Added `/categories` route with full CRUD support.
- Added `categories` field to product model.

</Update>

<Update label="May 13, 2024">

**Payouts & KYC**

- Added `payout` and `recipients` routes.
- Added KYC verification support.
- Added customer auth tokens.

</Update>

<Update label="April 3, 2024">

**Event Changes**

- Renamed `transaction` event types to `order`.
- Added `payment.pending`, `payment.paid`, `payment.success`, `payment.failed` event types.

</Update>

<Update label="March 12, 2024">

**Property Additions**

- Added analytics properties to shop objects (`total_sales`, `total_earned`, `pending_balance`, `dispute_rate`).
- Added feature flags (`pmp_enabled`, `chargeback_protection_enabled`, `storefront_enabled`, etc.).
- Added `fee` and `early_fraud_warning` to transaction objects.
- Added `discounted` and `discount_code` to order objects.
- Added `reason` and `status` to refund and dispute objects.

</Update>

<Update label="February 15, 2024">

**Initial Release**

- Initial V1 API release with stores, products, orders, coupons, webhooks, and payments.
- Sort and filter support for List Orders route.

</Update>
