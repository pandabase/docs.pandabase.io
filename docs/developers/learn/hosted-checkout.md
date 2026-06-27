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

1. **Redirect**: send the customer to the checkout URL
2. **SDK embed**: drop the Pandabase Checkout SDK into your page to render checkout as a modal, drawer, overlay, or inline element
3. **Direct link**: share the checkout URL directly

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

The redirect only means the customer completed the flow. It does not
guarantee payment success. Always use
[webhooks](/developers/webhooks/overview) to confirm payments on your backend.

</Callout>

## Checkout SDK

<Callout type="info">

SDK v2 is in **public preview**. It's fairly stable and safe for production use,
but the API may still see minor changes before general availability.

</Callout>

The Pandabase Checkout SDK drops checkout into any website with a single script
tag. Checkout renders inside a sandboxed iframe, so card data never touches
your page, and is fully themeable to match your brand.

- **No framework required.** A vanilla `<script>` and a global `Pandabase` object.
- **Four presentations.** Modal, drawer, full-page overlay, or inline.
- **Themeable.** Colors, radius, fonts, and light/dark, all via tokens.

### Prerequisites

You need two things:

| Value       | Where it comes from                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| `storeId`   | Your store identifier (`shp_…`).                                                                            |
| `sessionId` | A checkout session created **server-side** (`cs_…`). It carries the cart, amounts, and `return_url`. Single-use. |

<Callout type="warn">

Always create the session from your backend, then pass its id to the SDK in the
browser. Never embed API secrets in the page.

</Callout>

### Installation

Add the SDK script to your page:

```html
<script src="https://secure.pandabase.io/v2/sdk.js"></script>
```

This exposes a global `Pandabase` with one method, `Pandabase.checkout(options)`,
which returns an instance with `open()`, `close()`, and `destroy()`.

<Callout type="warn">

Always load the SDK from `https://secure.pandabase.io/v2/sdk.js`. **Never**
self-host, bundle, vendor, or proxy this script. We push security and PCI-scope
updates to the hosted version continuously, so a self-hosted copy will go stale,
break the iframe's origin checks, and is unsupported.

</Callout>

### Quick start

Open checkout in a modal, which is the default presentation:

```html
<button id="pay">Checkout</button>

<script src="https://secure.pandabase.io/v2/sdk.js"></script>
<script>
  const checkout = Pandabase.checkout({
    storeId: "shp_abc123",
    sessionId: "cs_xyz789",
    on: {
      payment_success: (e) => {
        window.location.href = e.returnUrl ?? "/thank-you";
      },
    },
  });

  document.getElementById("pay").addEventListener("click", () => checkout.open());
</script>
```

### Presentation modes

Set `mode` to choose how checkout appears. Each mode has its own layout.

| Mode                  | Appearance                                                        | Open with     |
| --------------------- | ---------------------------------------------------------------- | ------------- |
| `modal` *(default)*   | Compact centered card over a dimmed backdrop                     | `.open()`     |
| `drawer`              | Panel that slides in from the right, full height                 | `.open()`     |
| `overlay`             | Full-page blurred backdrop, wide two-column (summary + form)     | `.open()`     |
| `inline`              | Mounts directly into an element on your page                     | auto-mounts   |

#### Modal, drawer & overlay

These three open imperatively. Call `open()` to show checkout and `close()` to
dismiss it.

```js
const checkout = Pandabase.checkout({
  storeId: "shp_abc123",
  sessionId: "cs_xyz789",
  mode: "overlay", // or "modal" | "drawer"
});

checkout.open();
// later: checkout.close();
```

#### Inline

Inline mounts immediately into the `container` you provide, so no `open()` is needed.

```html
<div id="checkout"></div>

<script src="https://secure.pandabase.io/v2/sdk.js"></script>
<script>
  Pandabase.checkout({
    storeId: "shp_abc123",
    sessionId: "cs_xyz789",
    mode: "inline",
    container: "#checkout", // CSS selector or an HTMLElement
  });
</script>
```

### Theming

Pass an `appearance` object to match your brand. All colors accept any CSS color
string; `radius` and `fontSizeBase` are numbers (px). The same tokens style both
the checkout UI and the payment fields, so everything stays consistent.

```js
Pandabase.checkout({
  storeId,
  sessionId,
  theme: "auto", // "light" | "dark" | "auto" (default)
  appearance: {
    accent: "#6d28d9",
    accentForeground: "#ffffff",
    background: "#ffffff",
    foreground: "#0a0a0a",
    muted: "#f4f4f5",
    border: "#e5e5e5",
    summaryBackground: "#f5f3ff",
    radius: 10,
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    summaryPosition: "left", // overlay only: "left" | "right" | "top"

    // Optional: ship a distinct dark palette, applied when the resolved
    // scheme is dark (system preference, `theme: "dark"`, or colorScheme).
    dark: {
      background: "#0b0b12",
      foreground: "#e0e7ff",
      muted: "#17171f",
      border: "#262633",
      summaryBackground: "#101019",
    },
  },
});
```

#### Appearance tokens

| Token                 | Type                  | Description                                                  |
| --------------------- | --------------------- | ----------------------------------------------------------- |
| `colorScheme`         | `"light" \| "dark"`   | Force a scheme regardless of system/`theme`.                |
| `accent`              | color                 | Primary action color (buttons, focus, selected).            |
| `accentForeground`    | color                 | Text/icon on top of `accent`.                               |
| `background`          | color                 | Page/surface background.                                    |
| `foreground`          | color                 | Primary text.                                               |
| `muted`               | color                 | Subtle/secondary surface.                                   |
| `mutedForeground`     | color                 | Secondary text.                                             |
| `secondary`           | color                 | Secondary button/surface.                                   |
| `secondaryForeground` | color                 | Text on `secondary`.                                        |
| `card`                | color                 | Card surface.                                               |
| `cardForeground`      | color                 | Text on cards.                                              |
| `popover`             | color                 | Dropdown/popover surface.                                   |
| `popoverForeground`   | color                 | Text in dropdowns/popovers.                                 |
| `ring`                | color                 | Focus-ring color.                                           |
| `border`              | color                 | Borders, dividers, input outlines.                          |
| `input`               | color                 | Input field background.                                     |
| `danger`              | color                 | Error/danger color.                                         |
| `summaryBackground`   | color                 | Order-summary panel background.                             |
| `radius`              | number (px)           | Corner radius for inputs/buttons/cards.                     |
| `fontFamily`          | string                | Sans font stack.                                            |
| `fontMono`            | string                | Monospace font stack.                                       |
| `fontSizeBase`        | number (px)           | Base font size for payment fields.                          |
| `summaryPosition`     | `"left" \| "right" \| "top"` | Summary placement (overlay only).                    |
| `logo`                | string (URL)          | Override the merchant logo in the summary.                  |
| `dark`                | object                | Any of the above (except `colorScheme`/`summaryPosition`), applied in dark scheme. |

Scheme precedence: `appearance.colorScheme` → `theme` option → system
preference. Tokens you omit fall back to the default light/dark theme.

### Handling results & redirects

<Callout type="warn">

For inline, modal, and drawer, handle `payment_success` to send the buyer
onward. Card payments that complete in-place do **not** auto-redirect.

</Callout>

```js
Pandabase.checkout({
  storeId,
  sessionId,
  on: {
    payment_success: (e) => {
      window.location.href = e.returnUrl ?? "/thank-you";
    },
  },
});
```

Behavior depends on the payment type:

- **Redirect-based methods** (Cash App, bank debits, some 3-D Secure) bounce the
  buyer off-site and back; the embed auto-redirects them to your `return_url`.
  Nothing extra to do.
- **In-page card success** fires `payment_success` (with `returnUrl`) and leaves
  the navigation to you. The SDK never takes over the merchant's page.

### SDK options

```js
Pandabase.checkout(options) → instance
```

| Option       | Type                                          | Default   | Notes                                                        |
| ------------ | --------------------------------------------- | --------- | ------------------------------------------------------------ |
| `storeId`    | string                                        | —         | **Required.**                                                |
| `sessionId`  | string                                        | —         | **Required.**                                                |
| `mode`       | `"modal" \| "drawer" \| "overlay" \| "inline"` | `"modal"` |                                                              |
| `container`  | string \| HTMLElement                         | —         | **Required for `inline`.** CSS selector or element.          |
| `theme`      | `"light" \| "dark" \| "auto"`                 | `"auto"`  |                                                              |
| `appearance` | object                                        | —         | See [Theming](#theming).                                     |
| `locale`     | string                                        | —         | BCP-47 (e.g. `"en"`, `"fr-FR"`); localizes payment fields.   |
| `on`         | object                                        | —         | Event handlers, see [Events](#events).                       |

### SDK methods

| Method               | Description                                          |
| -------------------- | --------------------------------------------------- |
| `checkout.open()`    | Open (modal/drawer/overlay). No-op for inline.      |
| `checkout.close()`   | Close (modal/drawer/overlay). No-op for inline.     |
| `checkout.destroy()` | Remove listeners and all DOM created by the instance. |

### Events

Supply event handlers as `on: { … }`.

| Event                 | Payload                    | Fires when                                  |
| --------------------- | -------------------------- | ------------------------------------------- |
| `loaded`              | `{ sessionId }`            | The checkout iframe loaded.                 |
| `ready`               | —                          | The checkout UI is mounted.                 |
| `payment_success`     | `{ orderId?, returnUrl? }` | Payment confirmed.                          |
| `payment_processing`  | —                          | Async payment is pending.                   |
| `payment_failed`      | `{ error? }`               | Payment failed.                             |
| `error`               | `{ error }`                | Session/load error (incl. iframe failed to load). |
| `close`               | —                          | The buyer closed the checkout.              |

```js
Pandabase.checkout({
  storeId,
  sessionId,
  on: {
    loaded: (e) => console.log("loaded", e.sessionId),
    ready: () => console.log("ready"),
    payment_success: (e) => (window.location.href = e.returnUrl ?? "/done"),
    payment_processing: () => console.log("processing"),
    payment_failed: (e) => console.warn("failed:", e.error),
    error: (e) => console.error(e.error),
    close: () => console.log("closed"),
  },
});
```

<Callout type="info">

Legacy flat callbacks (`onPaymentSuccess`, `onClose`, …) are still accepted for
backwards compatibility, but the grouped `on` object is preferred.

</Callout>

### Full example

```html
<!doctype html>
<html>
  <body>
    <button id="buy">Buy now</button>

    <script src="https://secure.pandabase.io/v2/sdk.js"></script>
    <script>
      const checkout = Pandabase.checkout({
        storeId: "shp_abc123",
        sessionId: "cs_xyz789",
        mode: "overlay",
        theme: "auto",
        locale: "en",
        appearance: {
          accent: "#0284c7",
          radius: 10,
          summaryPosition: "left",
          dark: { background: "#071726", foreground: "#e0f2fe" },
        },
        on: {
          payment_success: (e) => {
            window.location.href = e.returnUrl ?? "/thank-you";
          },
          payment_failed: (e) => alert(e.error ?? "Payment failed"),
          error: (e) => console.error(e.error),
        },
      });

      document.getElementById("buy").addEventListener("click", () => checkout.open());
    </script>
  </body>
</html>
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

type CheckoutMode = "modal" | "drawer" | "overlay" | "inline";

interface PandabaseCheckoutOptions {
  storeId: string;
  sessionId: string;
  mode?: CheckoutMode;
  container?: string | HTMLElement;
  theme?: "light" | "dark" | "auto";
  appearance?: Record<string, unknown>;
  locale?: string;
  on?: {
    loaded?: (e: { sessionId: string }) => void;
    ready?: () => void;
    payment_success?: (e: { orderId?: string; returnUrl?: string }) => void;
    payment_processing?: () => void;
    payment_failed?: (e: { error?: string }) => void;
    error?: (e: { error: unknown }) => void;
    close?: () => void;
  };
}

interface PandabaseCheckout {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

const SDK_URL = "https://secure.pandabase.io/v2/sdk.js";

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
        mode: "overlay",
        on: {
          payment_success: (e) => {
            window.location.href = e.returnUrl ?? "/thank-you";
          },
          payment_failed: (e) => console.error("failed:", e.error),
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

interface InlineCheckoutProps {
  storeId: string;
  sessionId: string;
}

export function InlineCheckout({ storeId, sessionId }: InlineCheckoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const checkout = useCheckout();

  useEffect(() => {
    if (!containerRef.current) return;

    checkout.open({
      storeId,
      sessionId,
      mode: "inline",
      container: containerRef.current,
      on: {
        payment_success: (e) => console.log("paid:", e.orderId),
      },
    });
  }, [storeId, sessionId]);

  return <div ref={containerRef} />;
}
```

## Notes & limits

- **`summaryPosition`** (`left`/`right`) only applies to the **overlay** mode,
  which is wide enough for two columns; other modes stack the summary on top.
- **Cleanup:** call `destroy()` if you remove the checkout (e.g. on an SPA route
  change) to detach listeners and DOM.
- **Multiple instances:** each `checkout()` call is independent; don't open two
  modals at once.

## Return URL

Set a `return_url` when creating the session to redirect customers back to your
site after payment. It applies to the full-page checkout (`/pay/` route) and to
redirect-based methods in the embed. For in-page card success, the SDK hands the
`returnUrl` to your `payment_success` handler so you control the navigation.

```json
{
  "items": [{ "product_id": "prd_xxx", "quantity": 1 }],
  "return_url": "https://yoursite.com/thank-you"
}
```
