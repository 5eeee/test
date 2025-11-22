# YooKassa Integration Guide for Studio <4:30/> Telegram Mini App

## Overview

This document explains how to integrate YooKassa payment system with the Studio <4:30/> Telegram Mini App.

## Frontend Integration

The frontend components for YooKassa are already implemented:

- Payment form in `/src/pages/Cart.tsx`
- Payment confirmation modal
- Success/error handling UI

## Backend Implementation Required

YooKassa requires a backend service to handle payment creation and confirmation. Here's how to implement it:

### 1. Create Payment Endpoint

```javascript
// Example Node.js/Express endpoint
app.post('/create-payment', async (req, res) => {
  try {
    const { amount, description, orderId } = req.body;
    
    const payment = await yookassa.createPayment({
      amount: {
        value: amount,
        currency: 'RUB'
      },
      confirmation: {
        type: 'redirect',
        return_url: 'https://your-app.com/payment-success'
      },
      description: description,
      metadata: {
        order_id: orderId
      }
    });
    
    res.json({ paymentId: payment.id, confirmationUrl: payment.confirmation.confirmation_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 2. Payment Confirmation Endpoint

```javascript
// Handle payment confirmation
app.post('/payment-confirmation/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const paymentInfo = await yookassa.getPayment(paymentId);
    
    if (paymentInfo.status === 'succeeded') {
      // Process successful payment
      // Update order status, send notifications, etc.
      res.json({ status: 'success' });
    } else {
      res.json({ status: paymentInfo.status });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 3. Webhook Handler

Set up a webhook to receive payment status updates from YooKassa:

```javascript
app.post('/yookassa-webhook', async (req, res) => {
  const { event, object } = req.body;
  
  if (event === 'payment.succeeded') {
    const payment = object;
    // Update order status in your database
    // Send confirmation to customer
    // Notify admin
  } else if (event === 'payment.canceled') {
    // Handle canceled payment
  }
  
  res.status(200).end();
});
```

## Frontend Connection

Connect the frontend to your backend endpoints by updating the payment functions in `/src/pages/Cart.tsx`:

```typescript
const handlePayment = async () => {
  try {
    setLoading(true);
    
    // Call your backend to create payment
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        description: 'Studio <4:30/> services',
        orderId: orderId
      })
    });
    
    const data = await response.json();
    
    // Redirect to YooKassa payment page
    window.location.href = data.confirmationUrl;
  } catch (error) {
    console.error('Payment error:', error);
    setError('Payment failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

## Environment Variables

Add these to your backend environment:

```env
YOOKASSA_SHOP_ID=your_shop_id
YOOKASSA_SECRET_KEY=your_secret_key
YOOKASSA_API_URL=https://api.yookassa.ru/v3
```

## Testing

### 1. Sandbox Mode

YooKassa provides a test mode. Use test cards for development:
- 1111 1111 1111 1111 (success)
- 4444 4444 4444 4444 (success)
- Other test cards: https://yookassa.ru/en/developers/testing/payments#test_cards

### 2. Test Backend

```javascript
// In your backend, conditionally use test or live credentials
const yookassa = new YooKassa({
  shopId: process.env.NODE_ENV === 'production' 
    ? process.env.YOOKASSA_SHOP_ID 
    : process.env.YOOKASSA_TEST_SHOP_ID,
  secretKey: process.env.NODE_ENV === 'production'
    ? process.env.YOOKASSA_SECRET_KEY
    : process.env.YOOKASSA_TEST_SECRET_KEY
});
```

## Security Considerations

1. Never expose secret keys in frontend code
2. Always validate payment amounts on backend
3. Verify payment status before delivering services
4. Implement proper error handling
5. Log all payment-related events for audit

## Error Handling

Common YooKassa errors and how to handle them:

- `payment_method.rejected`: Payment method declined
- `insufficient_funds`: Insufficient funds on payment method
- `cvc_check_failed`: Incorrect CVC code
- `call_issuer`: Contact card issuer (blocked card)

## Frontend Payment Flow

1. User clicks "Pay" in cart
2. Frontend calls backend `/create-payment`
3. Backend creates YooKassa payment and returns confirmation URL
4. Frontend redirects user to YooKassa payment page
5. User completes payment
6. YooKassa redirects back to return URL
7. YooKassa sends webhook to backend
8. Backend updates order status
9. Backend sends notification to user and admin

## Troubleshooting

### Payment Not Working
- Check that webhook URL is accessible from internet
- Verify shop ID and secret key
- Ensure HTTPS is enabled
- Check that amount is properly formatted (e.g., "100.00")

### Webhook Not Receiving Updates
- Verify webhook URL in YooKassa dashboard
- Check that endpoint accepts POST requests
- Ensure server is accessible from internet
- Check server logs for errors

## Resources

- YooKassa API Documentation: https://yookassa.ru/en/developers/api
- YooKassa SDK for Node.js: https://github.com/yoomoney/yookassa-sdk-nodejs
- Test card numbers: https://yookassa.ru/en/developers/testing/payments