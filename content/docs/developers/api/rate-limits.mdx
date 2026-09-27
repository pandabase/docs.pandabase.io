---
title: "Rate limits"
description: "Learn about API rate limits and how to work with them."
---

## Overview

To ensure fair usage and maintain the stability of our API, we implement intelligent rate limiting based on multiple factors.

### Rate Limiter Types

Pandabase uses three types of rate limiters, depending on the endpoint and resource being accessed:

1. **Global IP-based limiter** (`GlobalResource`): Applies to all requests from a specific IP address
2. **Account-based limiter** (`AccountResource`): Applies to requests authenticated with your API key
3. **Store-based limiter** (`StoreResource`): Applies to requests specific to a storefront/shop

### How It Works

We provide generous rate limits designed to accommodate normal usage patterns. The account-based rate limiter is generally stricter and more dynamic than the global IP-based limiter, but both are set at levels sufficient for most use cases.

<Callout type="warn">

Rate limits may change over time as we optimize our system. Always implement
retry logic and respect the rate limit headers in API responses.

</Callout>

## Rate Limit Headers

All API responses include the following headers to help you manage your request rate:

| Header                  | Description                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `X-RateLimit-Limit`     | The maximum number of requests permitted within the current rate limit window.              |
| `X-RateLimit-Remaining` | The number of requests remaining in the current rate limit window.                          |
| `X-RateLimit-Reset`     | The time at which the current rate limit window resets (UTC epoch seconds).                 |
| `X-RateLimit-Type`      | The type of rate limiter applied (`GlobalResource`, `AccountResource`, or `StoreResource`). |

## Handling Rate Limits

When you exceed the rate limit, the API returns a `429 Too Many Requests` response:

```json
{
  "ok": false,
  "error": "Rate limit exceeded. Please retry after the reset time."
}
```

### Best Practices

1. **Monitor headers**: Check `X-RateLimit-Remaining` to track available requests
2. **Implement exponential backoff**: When you receive a `429` response, wait before retrying
3. **Respect reset times**: Use `X-RateLimit-Reset` to determine when to retry
4. **Cache responses**: Reduce API calls by caching data when appropriate
5. **Batch requests**: Where possible, combine multiple operations into single requests

### Example Retry Logic

```javascript
async function makeRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.status === 429 && !data.ok) {
      const resetTime = response.headers.get("X-RateLimit-Reset");
      const waitTime = resetTime * 1000 - Date.now();

      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }
    }

    return { response, data };
  }
}

// Usage
const { response, data } = await makeRequestWithRetry(
  "https://api.pandabase.io/stores/[storeId]",
  {
    method: "GET",
    headers: {
      Authorization: "Bearer sk",
      "Content-Type": "application/json",
    },
  },
);

if (data.ok) {
  console.log("Success:", data.data);
} else {
  console.error("Error:", data.error);
}
```

## Rate Limit Variations

Be aware that rate limits may vary:

- Different endpoints have different rate limits based on their resource intensity
- Rate limits can change over time as we optimize our infrastructure
- Higher-tier plans may have increased rate limits

<Callout type="info">

Always rely on the headers returned in each API response to determine your
current rate limit status rather than hardcoding values.

</Callout>
