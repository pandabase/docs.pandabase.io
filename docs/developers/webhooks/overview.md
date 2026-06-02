---
title: "Overview"
description: "Listen for store events and trigger actions in your application."
---

Pandabase sends each event to your webhook endpoint using an HTTP `POST` request.

Use webhooks to stay in sync with activity in your store, automate workflows,
or trigger actions inside your application whenever an event occurs.

See the [event reference](/developers/webhooks/events) for the full list of supported events.

## Payload

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
      "amount": 2999,
      "currency": "USD",
      "customFields": { "discord": "johndoe#1234" },
      "metadata": { "campaign": "spring_sale", "ref": "partner_abc" },
      "items": [
        {
          "productId": "prd_cm5x7k2a000001j0g8h3f9d2e",
          "variantId": null,
          "name": "Pro Plan",
          "quantity": 1,
          "amount": 2999
        }
      ]
    },
    "customer": {
      "id": "cus_cm5x7k2a000001j0g8h3f9d2e",
      "email": "buyer@example.com"
    },
    "geo": { "ip": "1.2.3.4", "country": "US", "city": "Miami", "region": "FL" }
  }
}
```

Amounts are integers in **cents**.

## Signature modes

| Mode   | Format                                                   | Status                              |
| ------ | -------------------------------------------------------- | ----------------------------------- |
| **V2** | [Standard Webhooks](https://www.standardwebhooks.com) v1 | Required. Default for new endpoints. |
| **V1** | Hex `Webhook-Signature` + legacy `X-Pandabase-*`         | Deprecated. [Migrate](/developers/webhooks/migrate-signatures). |

This page documents V2.

<Callout type="info">

The verifiers below — including any Standard Webhooks SDK — only validate **V2**
endpoints. V1 sends the same `Webhook-*` header names with hex/millisecond
values, so a V2 verifier rejects every V1 delivery. Check your endpoint's
`signatureVersion` first; if it's V1, follow the
[migration guide](/developers/webhooks/migrate-signatures).

</Callout>

## Headers

| Header              | Value                                                                         |
| ------------------- | ----------------------------------------------------------------------------- |
| `Webhook-Id`        | Message id. Matches `payload.id`. Deduplicate on this.                        |
| `Webhook-Timestamp` | Unix timestamp in **seconds**. Reject if older than 5 minutes.                |
| `Webhook-Signature` | `v1,<base64>` HMAC-SHA256 of `${Webhook-Id}.${Webhook-Timestamp}.${rawBody}`. |

## Retries

2xx is success. Anything else — non-2xx, 15s timeout, connection error — retries per the [Standard Webhooks schedule](https://www.standardwebhooks.com/#retries) over ~75 hours, ±10% jitter.

| Attempt | Delay | Elapsed  |
| ------- | ----- | -------- |
| 1       | —     | 00:00:00 |
| 2       | 5s    | 00:00:05 |
| 3       | 5m    | 00:05:05 |
| 4       | 30m   | 00:35:05 |
| 5       | 2h    | 02:35:05 |
| 6       | 5h    | 07:35:05 |
| 7       | 10h   | 17:35:05 |
| 8       | 14h   | 31:35:05 |
| 9       | 20h   | 51:35:05 |
| 10      | 24h   | 75:35:05 |

After all 10 fail, the store owner is emailed (max 1 per endpoint per 6 hours).

## Verification

<Callout type="warn">

Hash the **raw** request body. Whitespace and key order change the bytes.

</Callout>

### SDK

<CodeGroup>

```typescript title="Node.js"
import { Webhook } from "standardwebhooks";

const wh = new Webhook(process.env.WEBHOOK_SECRET!);

app.post(
  "/webhooks/pandabase",
  express.raw({ type: "application/json" }),
  (req, res) => {
    try {
      const event = wh.verify(req.body.toString(), req.headers as any);
      // event is the parsed JSON body, signature already verified

      switch (event.event) {
        case "PAYMENT_COMPLETED":
          console.log(`Payment completed for order ${event.data.order.id}`);
          break;
        case "PAYMENT_REFUNDED":
          console.log(`Refund issued for order ${event.data.order.id}`);
          break;
      }

      res.status(200).send("OK");
    } catch {
      res.status(401).send("Invalid signature");
    }
  },
);
```

```python title="Python"
from standardwebhooks import Webhook
from flask import Flask, request, jsonify

app = Flask(__name__)
wh = Webhook(WEBHOOK_SECRET)

@app.route("/webhooks/pandabase", methods=["POST"])
def handle_webhook():
    try:
        event = wh.verify(request.data, dict(request.headers))
    except Exception:
        return jsonify(error="Invalid signature"), 401

    if event["event"] == "PAYMENT_COMPLETED":
        print(f"Payment completed for order {event['data']['order']['id']}")

    return jsonify(message="OK"), 200
```

```go title="Go"
import standardwebhooks "github.com/standard-webhooks/standard-webhooks/libraries/go"

wh, _ := standardwebhooks.NewWebhook(webhookSecret)

func webhookHandler(w http.ResponseWriter, r *http.Request) {
    body, _ := io.ReadAll(r.Body)
    if err := wh.Verify(body, r.Header); err != nil {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }
    // body is verified — parse and dispatch
    w.WriteHeader(http.StatusOK)
}
```

</CodeGroup>

### Manual

<CodeGroup>

```typescript title="Node.js"
import crypto from "node:crypto";

const TOLERANCE_MS = 5 * 60 * 1000;

function verifyWebhook(
  headers: Record<string, string>,
  rawBody: string,
  secret: string,
): boolean {
  const msgId = headers["webhook-id"];
  const timestamp = headers["webhook-timestamp"];
  const signatureHeader = headers["webhook-signature"];
  if (!msgId || !timestamp || !signatureHeader) return false;

  // Webhook-Signature is a space-separated list of `vN,<base64>` entries.
  // We only need to match one.
  const signatures = signatureHeader
    .split(" ")
    .filter((s) => s.startsWith("v1,"))
    .map((s) => s.slice(3));

  const signedPayload = `${msgId}.${timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("base64");

  const valid = signatures.some(
    (sig) =>
      sig.length === expected.length &&
      crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)),
  );
  if (!valid) return false;

  const skewMs = Math.abs(Date.now() - Number(timestamp) * 1000);
  return skewMs <= TOLERANCE_MS;
}
```

```python title="Python"
import hmac, hashlib, base64, time

TOLERANCE_MS = 5 * 60 * 1000

def verify(headers, raw_body: bytes, secret: str) -> bool:
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    sig_header = headers.get("webhook-signature")
    if not msg_id or not timestamp or not sig_header:
        return False

    signed_payload = f"{msg_id}.{timestamp}.{raw_body.decode()}".encode()
    expected = base64.b64encode(
        hmac.new(secret.encode(), signed_payload, hashlib.sha256).digest()
    ).decode()

    sigs = [s[3:] for s in sig_header.split(" ") if s.startswith("v1,")]
    if not any(hmac.compare_digest(s, expected) for s in sigs):
        return False

    skew_ms = abs(int(time.time() * 1000) - int(timestamp) * 1000)
    return skew_ms <= TOLERANCE_MS
```

```go title="Go"
package webhook

import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/base64"
    "net/http"
    "strconv"
    "strings"
    "time"
)

const toleranceMs = 5 * 60 * 1000

func Verify(h http.Header, rawBody []byte, secret string) bool {
    msgID := h.Get("Webhook-Id")
    ts := h.Get("Webhook-Timestamp")
    sigHeader := h.Get("Webhook-Signature")
    if msgID == "" || ts == "" || sigHeader == "" {
        return false
    }

    mac := hmac.New(sha256.New, []byte(secret))
    mac.Write([]byte(msgID + "." + ts + "." + string(rawBody)))
    expected := base64.StdEncoding.EncodeToString(mac.Sum(nil))

    matched := false
    for _, entry := range strings.Split(sigHeader, " ") {
        if !strings.HasPrefix(entry, "v1,") {
            continue
        }
        if hmac.Equal([]byte(entry[3:]), []byte(expected)) {
            matched = true
            break
        }
    }
    if !matched {
        return false
    }

    tsSec, err := strconv.ParseInt(ts, 10, 64)
    if err != nil {
        return false
    }
    skew := time.Now().UnixMilli() - tsSec*1000
    if skew < 0 {
        skew = -skew
    }
    return skew <= toleranceMs
}
```

</CodeGroup>

## Best practices

- Return 2xx fast. Do work asynchronously.
- Verify every request. Reject stale timestamps.
- Deduplicate on `Webhook-Id`.
- Subscribe only to events you need.
- Don't rely on delivery order — use the order `status` field.
