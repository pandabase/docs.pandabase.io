---
title: "Response Format"
description: "Learn how the Pandabase API structures responses and handles errors."
---

## Response Structure

All Pandabase API responses follow a consistent format that includes an `ok` field to indicate success or failure.

### Success Response

When a request succeeds, the API returns `ok: true` along with the requested data:

```json
{
  "ok": true,
  "data": {
    // Your requested data here
  }
}
```

**Response Fields:**

<ResponseField name="ok" type="boolean" required>

Always `true` for successful requests

</ResponseField>

<ResponseField name="data" type="object" required>

The requested resource or response data. The structure varies by endpoint.

</ResponseField>

### Error Response

When a request fails, the API returns `ok: false` along with error details:

```json
{
  "ok": false,
  "error": "Human-readable error message"
}
```

**Response Fields:**

<ResponseField name="ok" type="boolean" required>

Always `false` for failed requests

</ResponseField>

<ResponseField name="ok" type="string" required>

Human-readable error message explaining what went wrong

</ResponseField>

<Callout type="info">

Error messages are designed to not contain sensitive information and can be
safely displayed in user interfaces.

</Callout>

## HTTP Status Codes

The API uses standard HTTP status codes to indicate the general category of response:

| Status Code | Description                                              |
| ----------- | -------------------------------------------------------- |
| `200`       | **OK** - Request succeeded                               |
| `201`       | **Created** - Resource created successfully              |
| `400`       | **Bad Request** - Invalid request parameters             |
| `401`       | **Unauthorized** - Missing or invalid authentication     |
| `403`       | **Forbidden** - Authenticated but lacks permission       |
| `404`       | **Not Found** - Resource doesn't exist                   |
| `409`       | **Conflict** - Request conflicts with current state      |
| `422`       | **Unprocessable Entity** - Validation error              |
| `429`       | **Too Many Requests** - Rate limit exceeded              |
| `500`       | **Internal Server Error** - Server error                 |
| `503`       | **Service Unavailable** - Temporary service interruption |

## Handling Responses

Always check the `ok` field to determine if a request succeeded:

```javascript
const response = await fetch("https://api.pandabase.io/stores/{storeId}", {
  method: "GET",
  headers: {
    Authorization: "Bearer sk_xxx",
    "Content-Type": "application/json",
  },
});

const result = await response.json();

if (result.ok) {
  // Success - use result.data
  console.log("data:", result.data);
} else {
  // Error - handle result.error
  console.error(`error ${result.error.code}: ${result.error.message}`);
}
```

<Callout type="tip">

Use the `X-Request-Id` header from the response when reporting issues to
support. This helps us quickly identify and resolve problems.

</Callout>
