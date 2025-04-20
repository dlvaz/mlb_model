# MLB Betting Model Dashboard

A modern web application that displays MLB betting model results with an admin panel for reviewing and publishing picks.

## Features

- Display top 3 picks from the most recent model run
- View all published games with detailed statistics
- Admin panel for reviewing and publishing picks
- Protected admin routes with basic authentication
- Real-time model refresh via N8N webhook
- Mobile-first, responsive design

## Tech Stack

- Next.js 14 (App Router)
- Supabase for data storage
- ShadcnUI components
- Tailwind CSS for styling
- TypeScript for type safety

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables template:
   ```bash
   cp .env.local.example .env.local
   ```
4. Update the environment variables in `.env.local` with your values:
   - Supabase configuration
   - Admin credentials
   - N8N webhook URL

5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `ADMIN_USERNAME`: Username for admin panel access
- `ADMIN_PASSWORD`: Password for admin panel access
- `N8N_WEBHOOK_URL`: URL to trigger model refresh

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage with top picks and all games
│   └── admin/
│       ├── page.tsx          # Admin dashboard
│       └── actions.ts        # Server actions for admin functions
├── components/
│   ├── game-card.tsx        # Game display component
│   └── ui/                  # ShadcnUI components
├── lib/
│   ├── supabase.ts         # Supabase client and queries
│   └── transforms.ts       # Data transformation utilities
└── types/
    └── mlb.ts             # TypeScript type definitions
```

## Data Model

The application uses a Supabase table `mlb_model_output` with the following key fields:

- Game information (IDs, teams, pitchers)
- Pitcher statistics (ERA, FIP, WHIP)
- Team statistics (OPS, bullpen stats)
- Model predictions and betting information
- Publication status and metadata

## Admin Features

The admin panel is protected by basic authentication and provides:

- List of unpublished games
- Ability to mark games as reviewed
- Publishing functionality with timestamp
- Manual model refresh trigger

## Development

1. Make sure to have Node.js installed
2. Install dependencies with `npm install`
3. Set up your environment variables
4. Run `npm run dev` for development
5. Access the admin panel at `/admin`

## Deployment

The application can be deployed to any platform that supports Next.js applications (Vercel, Netlify, etc.).

Make sure to:
1. Set up all environment variables
2. Configure build settings if needed
3. Set up any necessary redirects or rewrites
4. Configure your deployment platform's authentication if needed
