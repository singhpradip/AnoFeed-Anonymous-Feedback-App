# Environment Variables

This document describes the environment variables used in the AnoFeed application.

## Required Variables

### `VITE_API_BASE_URL`
- **Description**: The base URL for the backend API
- **Type**: String
- **Default**: `http://localhost:3001/api`
- **Examples**:
  - Development: `http://localhost:3001/api`
  - Production: `https://api.anofeed.com/api`

## Optional Variables

### `VITE_APP_NAME`
- **Description**: The application name displayed in the UI
- **Type**: String
- **Default**: `AnoFeed`

### `VITE_APP_VERSION`
- **Description**: The application version
- **Type**: String
- **Default**: `1.0.0`

### `VITE_ENABLE_DEV_TOOLS`
- **Description**: Enable React Query DevTools and other development tools
- **Type**: Boolean
- **Default**: `true` in development, `false` in production
- **Values**: `true`, `false`, `1`, `0`

### `VITE_ENABLE_ANALYTICS`
- **Description**: Enable analytics tracking
- **Type**: Boolean
- **Default**: `false` in development, `true` in production
- **Values**: `true`, `false`, `1`, `0`

### `VITE_FEEDBACK_EDIT_TIMEOUT`
- **Description**: Time limit (in milliseconds) for editing feedback after submission
- **Type**: Number
- **Default**: `300000` (5 minutes)

## Environment Files

The application supports multiple environment files:

- `.env` - Default environment variables
- `.env.example` - Template file with all available variables
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables

## Usage

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the variables in `.env` according to your environment

3. The application will automatically validate required variables on startup

## Environment Configuration

Environment variables are managed through the `src/config/environment.ts` file, which provides:

- Type-safe access to environment variables
- Default values for optional variables
- Runtime validation
- Development logging

## Examples

### Development Setup
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=AnoFeed (Dev)
VITE_ENABLE_DEV_TOOLS=true
VITE_ENABLE_ANALYTICS=false
```

### Production Setup
```env
VITE_API_BASE_URL=https://api.anofeed.com/api
VITE_APP_NAME=AnoFeed
VITE_ENABLE_DEV_TOOLS=false
VITE_ENABLE_ANALYTICS=true
```

## Security Notes

- Never commit `.env` files to version control
- Use `.env.example` as a template for required variables
- Store sensitive values (API keys, secrets) in secure environment variable stores
- The `VITE_` prefix is required for Vite to expose variables to the client 