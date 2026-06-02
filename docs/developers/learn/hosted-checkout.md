---
title: "Hosted Checkout"
description: "Embed or redirect to Pandabase's hosted checkout page."
---

<Callout type="warn">

We will assume you have a general understanding of programming. This guide is
intended for developers, and we expect you to have a good understanding of
REST APIs in general. If you're not a developer, please skip this section.

</Callout>

## Overview

Every checkout session returns a `checkout_url` that points to Pandabase's hosted checkout page. There are three ways to use it:

1. **Redirect** — send the customer to the checkout URL
2. **SDK embed** — use the Pandabase Checkout SDK to embed checkout as a modal or inline on your page
3. **Direct link** — share the checkout URL directly

The checkout page is hosted at `checkout.pandabase.io` with two routes:

| Route                                      | Purpose                                    |
| ------------------------------------------ | ------------------------------------------ |
| `/pay/stores/{storeId}/sids/{sessionId}`   | Full-page checkout (used for redirects)    |
| `/embed/stores/{storeId}/sids/{sessionId}` | Embed-optimized checkout (used by the SDK) |

## Redirect

The simplest integration. Create a session on your backend and redirect the customer to the `checkout_url`.

```typescript
const STORE_ID = process.env.PANDABASE_STORE_ID!;

app.post("/buy", async (req, res) => {
  const response = await fetch(
    `https://api.pandabase.io/v2/stores/${STORE_ID}/checkouts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ product_id: "prd_xxx", quantity: 1 }],
        return_url: "https://yoursite.com/thank-you",
      }),
    },
  );

  const { data } = await response.json();
  res.redirect(data.checkout_url);
});
```

After payment, the customer is redirected to your `return_url`. If no `return_url` is set, they see a confirmation screen on the checkout page.

<Callout type="warn">

The redirect only means the customer completed the flow — it does not
guarantee payment success. Always use
[webhooks](/developers/webhooks/overview) to confirm payments on your backend.

</Callout>

## Checkout SDK

The Pandabase Checkout SDK lets you embed checkout directly on your site as a **modal** or **inline** element. It handles the iframe, resizing, theming, and payment lifecycle events.

### Installation

Add the SDK script to your page:

```html
<script src="https://secure.pandabase.io/sdk.js"></script>
```

This exposes `Pandabase.checkout()` globally.

### Modal mode

Opens the checkout in a centered overlay. This is the default mode.

```html
<button id="buy-btn">Buy now</button>

<script src="https://secure.pandabase.io/sdk.js"></script>
<script>
  document.getElementById("buy-btn").addEventListener("click", async () => {
    // create session on your backend
    const res = await fetch("/api/create-checkout", { method: "POST" });
    const { storeId, sessionId } = await res.json();

    const checkout = Pandabase.checkout({
      storeId: storeId,
      sessionId: sessionId,
      mode: "modal",
      onPaymentSuccess: (e) => {
        console.log("Payment succeeded:", e.orderId);
        checkout.close();
        window.location.href = "/thank-you";
      },
      onPaymentFailed: (e) => {
        console.error("Payment failed:", e.error);
      },
      onClose: () => {
        console.log("Customer closed the modal");
      },
    });

    checkout.open();
  });
</script>
```

### Inline mode

Renders the checkout inside a container element on your page.

```html
<div id="checkout-container"></div>

<script src="https://secure.pandabase.io/sdk.js"></script>
<script>
  async function mountCheckout() {
    const res = await fetch("/api/create-checkout", { method: "POST" });
    const { storeId, sessionId } = await res.json();

    const checkout = Pandabase.checkout({
      storeId: storeId,
      sessionId: sessionId,
      mode: "inline",
      container: "#checkout-container",
      onPaymentSuccess: (e) => {
        console.log("Payment succeeded:", e.orderId);
      },
      onPaymentFailed: (e) => {
        console.error("Payment failed:", e.error);
      },
    });
  }

  mountCheckout();
</script>
```

### SDK options

| Option                | Type                  | Default   | Description                                                  |
| --------------------- | --------------------- | --------- | ------------------------------------------------------------ |
| `storeId`             | string                | —         | **Required.** Your store ID                                  |
| `sessionId`           | string                | —         | **Required.** The checkout session ID                        |
| `mode`                | string                | `"modal"` | `"modal"` or `"inline"`                                      |
| `container`           | string \| HTMLElement | —         | CSS selector or element. Required for inline mode            |
| `theme`               | string                | `"auto"`  | `"light"`, `"dark"`, or `"auto"` (follows system preference) |
| `onLoaded`            | function              | —         | Called when the checkout iframe has loaded                   |
| `onPaymentSuccess`    | function              | —         | Called on successful payment. Receives `{ orderId }`         |
| `onPaymentProcessing` | function              | —         | Called when payment is processing                            |
| `onPaymentFailed`     | function              | —         | Called on payment failure. Receives `{ error }`              |
| `onError`             | function              | —         | Called on checkout errors. Receives `{ error }`              |
| `onClose`             | function              | —         | Called when the modal is closed (modal mode only)            |

### SDK methods

| Method               | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `checkout.open()`    | Open the modal (modal mode only)                        |
| `checkout.close()`   | Close the modal (modal mode only)                       |
| `checkout.destroy()` | Remove the checkout iframe and clean up event listeners |

### Full example

A complete Express + HTML integration:

```typescript
// server.ts
import express from "express";

const app = express();
const STORE_ID = process.env.PANDABASE_STORE_ID!;

app.post("/api/create-checkout", async (req, res) => {
  const response = await fetch(
    `https://api.pandabase.io/v2/stores/${STORE_ID}/checkouts`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ name: "Premium Plan", amount: 2999, quantity: 1 }],
      }),
    },
  );

  const { data } = await response.json();
  res.json({ storeId: STORE_ID, sessionId: data.session_id });
});

app.listen(3000);
```

```html
<!-- index.html -->
<button id="buy">Buy Premium Plan — $29.99</button>

<script src="https://secure.pandabase.io/sdk.js"></script>
<script>
  var currentCheckout = null;

  document.getElementById("buy").addEventListener("click", async function () {
    // clean up previous checkout if any
    if (currentCheckout) currentCheckout.destroy();

    var res = await fetch("/api/create-checkout", { method: "POST" });
    var data = await res.json();

    currentCheckout = Pandabase.checkout({
      storeId: data.storeId,
      sessionId: data.sessionId,
      mode: "modal",
      theme: "auto",
      onPaymentSuccess: function (e) {
        alert("Payment complete! Order: " + e.orderId);
        currentCheckout.close();
      },
      onPaymentFailed: function (e) {
        alert("Payment failed: " + e.error);
      },
    });

    currentCheckout.open();
  });
</script>
```

### React

Load the SDK script once, then use a hook to manage the checkout lifecycle.

```tsx
// hooks/use-checkout.ts
import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    Pandabase?: {
      checkout: (opts: PandabaseCheckoutOptions) => PandabaseCheckout;
    };
  }
}

interface PandabaseCheckoutOptions {
  storeId: string;
  sessionId: string;
  mode?: "modal" | "inline";
  container?: string | HTMLElement;
  theme?: "light" | "dark" | "auto";
  onLoaded?: (e: any) => void;
  onPaymentSuccess?: (e: any) => void;
  onPaymentProcessing?: () => void;
  onPaymentFailed?: (e: any) => void;
  onError?: (e: any) => void;
  onClose?: () => void;
}

interface PandabaseCheckout {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

const SDK_URL = "https://secure.pandabase.io/sdk.js";

let sdkLoaded = false;
let sdkPromise: Promise<void> | null = null;

function loadSdk(): Promise<void> {
  if (sdkLoaded) return Promise.resolve();
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.onload = () => {
      sdkLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Pandabase SDK"));
    document.head.appendChild(script);
  });

  return sdkPromise;
}

export function useCheckout() {
  const checkoutRef = useRef<PandabaseCheckout | null>(null);

  const open = useCallback(async (opts: PandabaseCheckoutOptions) => {
    await loadSdk();

    if (checkoutRef.current) {
      checkoutRef.current.destroy();
    }

    checkoutRef.current = window.Pandabase!.checkout({
      mode: "modal",
      theme: "auto",
      ...opts,
    });

    checkoutRef.current.open();
  }, []);

  const close = useCallback(() => {
    checkoutRef.current?.close();
  }, []);

  useEffect(() => {
    return () => {
      checkoutRef.current?.destroy();
    };
  }, []);

  return { open, close };
}
```

```tsx
// components/buy-button.tsx
import { useState } from "react";
import { useCheckout } from "@/hooks/use-checkout";

export function BuyButton() {
  const [loading, setLoading] = useState(false);
  const checkout = useCheckout();

  async function handleClick() {
    setLoading(true);

    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      const { storeId, sessionId } = await res.json();

      checkout.open({
        storeId,
        sessionId,
        onPaymentSuccess: (e) => {
          console.log("paid:", e.orderId);
          checkout.close();
          window.location.href = "/thank-you";
        },
        onPaymentFailed: (e) => {
          console.error("failed:", e.error);
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Buy Premium Plan — $29.99"}
    </button>
  );
}
```

For inline mode in React, pass a ref as the container:

```tsx
import { useRef, useEffect } from "react";
import { useCheckout } from "@/hooks/use-checkout";

export function InlineCheckout({ storeId, sessionId }: {
  storeId: string;
  sessionId: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkout = useCheckout();

  useEffect(() => {
    if (!containerRef.current) return;

    checkout.open({
      storeId,
      sessionId,
      mode: "inline",
      container: containerRef.current,
      onPaymentSuccess: (e) => {
        console.log("paid:", e.orderId);
      },
    });
  }, [storeId, sessionId]);

  return <div ref={containerRef} />;
}
```

## Return URL

Set a `return_url` when creating the session to redirect customers back to your site after payment. This applies to the full-page checkout (`/pay/` route) — the SDK handles post-payment via callbacks instead.

```json
{
  "items": [{ "product_id": "prd_xxx", "quantity": 1 }],
  "return_url": "https://yoursite.com/thank-you"
}
```
