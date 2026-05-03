# my/trckr

A full-stack web application that helps tech candidates accelerate their job search and professional growth through data-driven insights from the real job market.

🔗 **Live demo:** [mytrckr.vercel.app](https://mytrckr.vercel.app)

---

## Overview

mytrckr combines job application tracking with real market intelligence to give tech candidates a competitive edge. Track every application, identify your skill gaps against actual market demand, and get personalized learning recommendations based on data from thousands of real job listings.

## Features

### Job Application Tracker

Log every job you apply to with status, source, salary range, required skills, work mode, company type and more. Filter, sort and visualize your pipeline.

### Professional Profile

Build your skills inventory with experience levels, target role, location and career goals. Your profile drives personalized insights across the entire app.

### Market Insights

Real-time analytics on the European tech job market powered by Adzuna. See which skills are most demanded by region, role distribution, work mode trends and average salaries. Updated weekly from real listings.

### Skill Gap Analysis

Compare your profile against actual market demand. See exactly which skills you have, which ones you're missing, and your overall coverage percentage for your target role.

### Personalized Recommendations

AI-driven learning path tailored to your profile and market data. Each recommendation includes priority level, market demand stats and curated learning resources (docs, courses, tutorials, roadmaps). Track your progress and add learned skills to your profile in one click.

### Dashboard Analytics

Visualize your entire job search pipeline with charts: applications by status, source and company type, plus an at-a-glance view of your next learning step and market coverage.

### Authentication & Security

- Secure JWT-based auth with httpOnly cookies
- Email verification on signup
- Password reset via email
- Change password from profile
- Account deletion

## Coming Soon

- **AI CV Analyzer** — upload your CV and get personalized feedback
- **AI Cover Letter Generator** — tailored letters per job offer
- **Interview Simulator** — practice with role-specific questions
- **Smart Job Parser** — paste a job link and auto-fill all the data
- **Career Coach** — AI mentor based on your profile and market trends

## Tech Stack

**Frontend**

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Recharts for data visualization
- Lucide icons

**Backend**

- NestJS with TypeScript
- PostgreSQL (Supabase in production)
- Prisma ORM
- JWT authentication with httpOnly cookies
- Brevo for transactional emails
- Adzuna API for market data
- Cron jobs for scheduled data syncs

**Deployment**

- Frontend: Vercel
- Backend: Render
- Database: Supabase

## Getting Started

### Prerequisites

- Node.js 18+
- Docker Desktop (for local PostgreSQL)

### Backend Setup

```bash
cd backend
npm install

# Start PostgreSQL locally
docker-compose up -d

# Set up environment variables
cp .env.example .env
# Add DATABASE_URL, JWT_SECRET, BREVO_API_KEY, ADZUNA_API_KEY

# Run migrations
npx prisma migrate dev

# Seed the database
npm run seed

# Start dev server
npm run start:dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## License

MIT
