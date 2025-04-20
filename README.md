# MLB Model Dashboard

A Next.js application for displaying MLB betting model results and analysis. The dashboard provides insights into game predictions, betting recommendations, and model performance metrics.

## Features

- Real-time game predictions and analysis
- Model performance tracking
- Admin portal with Supabase authentication
- Automated model refresh capabilities
- Beautiful UI with shadcn/ui components

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- N8N for automation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `N8N_WEBHOOK_URL`: URL for model refresh webhook

## Deployment

This project is configured for deployment on DigitalOcean App Platform. See `.do/app.yaml` for configuration details.
