# Deployment Guide for Studio <4:30/> Telegram Mini App

## Prerequisites

- Node.js 18+ installed
- Telegram Bot Token (from @BotFather)
- Web server with HTTPS support for hosting the Mini App

## Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd studio-mini-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To run the app in development mode:
```bash
npm run dev
```

## Building for Production

To create a production build:
```bash
npm run build
```

This will create a `dist` folder with all the necessary files to deploy.

## Deployment to Telegram

### 1. Host the Application

Upload the contents of the `dist` folder to a web server with HTTPS support. You can use:
- Vercel
- Netlify
- GitHub Pages with custom domain and HTTPS
- Any web server with HTTPS

### 2. Configure BotFather

1. Open @BotFather in Telegram
2. Use `/mybots` to select your bot
3. Use `/newapp` to create a new Mini App
4. Enter the URL where you hosted your `dist` folder

### 3. Set up Webhook (Optional)

If you need backend functionality, set up a webhook for your bot:
```bash
curl -F "url=https://yourdomain.com/webhook" https://api.telegram.org/bot<BOT_TOKEN>/setWebhook
```

## YooKassa Integration

The frontend is prepared for YooKassa integration. To complete the payment system:

### 1. Backend Setup Required

Create a backend service that:
- Connects to YooKassa API
- Handles payment creation and confirmation
- Processes payment callbacks

### 2. Environment Variables

Add your YooKassa credentials to your backend:
- `YOOKASSA_SHOP_ID` - Your shop ID
- `YOOKASSA_API_KEY` - Your secret API key

### 3. Frontend Integration

The payment form in `/src/pages/Cart.tsx` is prepared with the necessary UI elements to connect to your backend payment endpoint.

## Configuration

### Telegram Bot Configuration

Update the bot token in your environment if needed. The app uses `@twa-dev/sdk` to interface with Telegram.

### Environment Variables

Create a `.env` file in the root directory:
```
VITE_YOOKASSA_SHOP_ID=your_shop_id
VITE_YOOKASSA_API_KEY=your_api_key
```

## Troubleshooting

### App Not Loading in Telegram
- Ensure HTTPS is enabled on your hosting
- Check that the URL in BotFather matches exactly
- Verify that the domain is whitelisted for Mini Apps

### Payment Issues
- Verify backend integration with YooKassa
- Check API credentials
- Ensure proper error handling

## Customization

### Theme Colors
- Modify CSS variables in `/src/App.css`
- Colors are also dynamically set based on Telegram theme

### Content Updates
- Update services in `/src/data/services.json` (you may need to create this)
- Modify portfolio items in `/src/data/portfolio.json` (you may need to create this)

## Technologies Used

- React 19
- TypeScript
- Vite
- @twa-dev/sdk (Telegram Web Apps SDK)
- Framer Motion (animations)
- React Router DOM (navigation)