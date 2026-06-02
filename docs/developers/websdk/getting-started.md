---
title: "Getting Started"
description: "Low-level browser SDK for building custom checkout experiences."
---

<Callout type="info">

The WebSDK is in **Private Preview**. The API surface may change before
general availability. Reach out if you'd like access.

</Callout>

The WebSDK is a low-level alternative to the Checkout SDK. Use it when you want to build a fully custom checkout UI in the browser instead of redirecting to or embedding an iframe of the hosted checkout page.

## Installation

<CodeGroup>

```sh title="npm"
npm install @pandabase/websdk
# for React apps:
npm install @pandabase/react-websdk
```

```sh title="pnpm"
pnpm add @pandabase/websdk
# for React apps:
pnpm add @pandabase/react-websdk
```

```sh title="bun"
bun add @pandabase/websdk
# for React apps:
bun add @pandabase/react-websdk
```

</CodeGroup>

<Callout type="info">

For PCI compliance, the WebSDK runtime is always loaded from our CDN at
`https://js.pandabase.io/websdk-production.js` — the npm package is a thin
loader that fetches the same script. You can also include it directly:

```html
<script src="https://js.pandabase.io/websdk-production.js"></script>
```

Never self-host, bundle, or proxy the script. Doing so takes your application
out of PCI SAQ-A scope.

</Callout>

For full usage, contact us at [support@pandabase.io](mailto:support@pandabase.io).
