---
title: "Dynamic Payments"
description: "Collect additional information from customers during checkout using custom fields and metadata."
---

<Callout type="warn">

We will assume you have a general understanding of programming. This guide is
intended for developers, and we expect you to have a good understanding of
REST APIs in general. If you're not a developer, please skip this section.

</Callout>

## Custom Fields

Custom fields let you collect structured data from customers during the checkout process. You can define up to **3 fields** per checkout session, supporting text inputs, numeric inputs, and dropdowns.

A practical use case is if you run a Discord server and need to grant roles after purchase. You can add a custom field for `discord_username` during checkout. When the customer pays, the `PAYMENT_COMPLETED` webhook event is triggered. You can then use the submitted `discord_username` value to automate the role assignment.

Other examples include collecting server preferences, referral codes, or any data your fulfillment logic needs.

## Metadata

Metadata lets you attach arbitrary key-value string pairs to a checkout session. Unlike custom fields (which are filled by the customer), metadata is set by your application when creating the session and is immutable after creation.

Metadata flows through the entire pipeline: checkout session → order → webhook payloads → fulfillment webhooks.

**Constraints:**
- Maximum 20 keys per session
- Key: max 40 characters
- Value: max 500 characters
- Keys and values must be strings

Use metadata for internal tracking like campaign IDs, referral sources, or any context your backend needs when processing webhooks.

<Steps>

<Step title="Grab the secrets">

In your store, create a new webhook. Copy and securely store the webhook secret.

You'll also need your Store ID.

```env title=".env"
PANDABASE_WEBHOOK_SECRET="wh_sk_xxx"
PANDABASE_STORE_ID="shp_xxxx"
```

</Step>

<Step title="Prepare backend">

Set up an Express server with TypeScript:

```bash
npm init
npm add express dotenv
npm add -D typescript @types/express @types/node ts-node
npx tsc --init
```

Create a `src` folder and add an `index.ts` file:

```typescript title="src/index.ts"
import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

</Step>

<Step title="Create a checkout session with custom fields and metadata">

When creating a checkout session via the V2 API, pass `display.fields` for custom fields and `metadata` for developer key-value pairs.

There are three field types:

| Type | Description | Config options |
|------|-------------|----------------|
| `text` | Free-form text input | `default_value`, `minimum_length`, `maximum_length` |
| `numeric` | Digits-only input | `default_value`, `minimum_length`, `maximum_length` |
| `dropdown` | Select from a list | `default_value`, `options` (array of `label`/`value` pairs) |

```typescript
const STORE_ID = process.env.PANDABASE_STORE_ID!;

async function createCheckoutSession(userId: string): Promise<string> {
  const response = await fetch(
    `https://api.pandabase.io/v2/stores/${STORE_ID}/checkouts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            name: "Premium Plan",
            amount: 2999,
            quantity: 1,
          },
        ],
        display: {
          fields: [
            {
              key: "discord_username",
              label: { type: "custom", custom: "Discord Username" },
              type: "text",
              optional: false,
              text: { minimum_length: 2, maximum_length: 50 },
            },
            {
              key: "server_region",
              label: { type: "custom", custom: "Server Region" },
              type: "dropdown",
              optional: false,
              dropdown: {
                default_value: "us_east",
                options: [
                  { label: "US East", value: "us_east" },
                  { label: "US West", value: "us_west" },
                  { label: "EU West", value: "eu_west" },
                ],
              },
            },
          ],
        },
        metadata: {
          user_id: userId,
          campaign: "spring_2026",
          source: "website",
        },
      }),
    },
  );

  const result = await response.json();
  // result.data contains the checkout session with session_id
  return result.data.session_id;
}
```

The response includes a `session_id`. Use it to build the checkout URL or redirect the customer.

</Step>

<Step title="Build webhook receiver">

Add a route to receive webhooks and verify the signature:

```typescript
function validateSignature(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const signature = crypto
    .createHmac("sha256", process.env.PANDABASE_WEBHOOK_SECRET!)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (
    crypto.timingSafeEqual(
      Buffer.from(req.headers["x-pandabase-signature"] as string),
      Buffer.from(signature),
    )
  ) {
    next();
  } else {
    res.status(401).send("Invalid signature");
  }
}
```

</Step>

<Step title="Handle PAYMENT_COMPLETED with custom fields and metadata">

When a payment succeeds, the `PAYMENT_COMPLETED` webhook fires. The `data.order` object contains `customFields` (customer-submitted values) and `metadata` (your developer-defined key-value pairs).

```typescript
app.post("/webhook", validateSignature, (req, res) => {
  const event = req.body;

  if (event.event === "PAYMENT_COMPLETED") {
    const order = event.data.order;

    // Access metadata (set by your app at session creation)
    if (order.metadata) {
      console.log("User ID:", order.metadata.user_id);
      console.log("Campaign:", order.metadata.campaign);
    }

    // Access custom fields (submitted by the customer)
    if (order.customFields) {
      const discordUsername = order.customFields.discord_username;
      if (discordUsername) {
        grantDiscordRole(discordUsername);
      }
    }
  }

  res.sendStatus(200);
});

function grantDiscordRole(username: string) {
  console.log(`Granting role to: ${username}`);
}
```

</Step>

<Step title="Send checkout link">

Create an endpoint to initiate the payment process:

```typescript
app.post("/create-payment", async (req, res) => {
  try {
    const { userId } = req.body;
    const sessionId = await createCheckoutSession(userId);
    res.json({ sessionId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create payment session" });
  }
});
```

</Step>

<Step title="You've finished!" />

</Steps>

## Custom Field Reference

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `key` | string | Yes | Unique identifier, alphanumeric and underscores, max 200 chars |
| `label.type` | string | Yes | Must be `"custom"` |
| `label.custom` | string | Yes | Display label shown to customer, max 50 chars |
| `type` | string | Yes | `"text"`, `"numeric"`, or `"dropdown"` |
| `optional` | boolean | No | Default: `false` |
| `text.default_value` | string | No | Default value for text fields |
| `text.minimum_length` | integer | No | Minimum character length (min: 0) |
| `text.maximum_length` | integer | No | Maximum character length (max: 255) |
| `numeric.default_value` | string | No | Default value for numeric fields |
| `numeric.minimum_length` | integer | No | Minimum digit length (min: 0) |
| `numeric.maximum_length` | integer | No | Maximum digit length (max: 255) |
| `dropdown.default_value` | string | No | Pre-selected option value |
| `dropdown.options` | array | Yes | 1-200 items, each with `{ label, value }` |

## Metadata vs Custom Fields

| | Custom Fields | Metadata |
|---|---|---|
| **Set by** | Customer (at checkout) | Developer (at session creation) |
| **Purpose** | Collect user input (Discord name, etc.) | Internal tracking (user IDs, campaigns) |
| **Max count** | 3 fields | 20 keys |
| **Mutable** | Submitted at payment confirmation | Immutable after session creation |
| **In webhooks** | `data.order.customFields` | `data.order.metadata` |
| **Types** | text, numeric, dropdown | string key-value pairs only |

## Validation Rules

The server strictly validates submitted custom field values:

- Required fields must have a non-empty value
- **Text**: enforces `minimum_length` and `maximum_length` constraints
- **Numeric**: value must contain only digits, enforces length constraints
- **Dropdown**: value must match one of the defined `options[].value` entries
- Duplicate keys are rejected
- Unknown keys not defined in the session are rejected
- Submitting `custom_fields` when the session has none defined returns an error
- Maximum of 3 custom fields per session

## Webhook Headers

Every webhook delivery includes these headers:

| Header | Description |
|--------|-------------|
| `X-Pandabase-Signature` | HMAC-SHA256 signature of the JSON body using your webhook secret |
| `X-Pandabase-Timestamp` | Unix timestamp of the delivery |
| `X-Pandabase-Idempotency` | Unique delivery ID for deduplication |

Failed deliveries are retried up to 5 times with exponential backoff.
