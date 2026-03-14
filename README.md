# Career Platform

A full-stack web application that helps tech candidates accelerate their job search and professional growth through data-driven insights.

## Overview

Career Platform combines job application tracking with market intelligence to give tech candidates a competitive edge. Track every application, identify skill gaps, and get personalized recommendations based on real market demand.

## Features

### ✅ MVP (Current)
- **Job Application Tracker** — log applications with status, source, salary, required skills and company details
- **Professional Profile** — skills inventory with experience levels, target role and career goals
- **Dashboard Analytics** — visualize your job search pipeline with charts and stats
- **Authentication** — secure JWT-based auth with email verification and password reset

### 🔄 In Progress
- **Job Market Analyzer** — aggregate real job market data by region and role
- **Skill Demand Trends** — track which technologies are growing

### 📋 Planned
- **Skill Gap Analysis** — compare your profile against market demand
- **Recommendation Engine** — personalized learning and project suggestions
- **Career Strategy** — AI-generated weekly improvement plans
- **Interview Preparation** — CV and portfolio optimization tips

## Tech Stack

### Backend
- **NestJS** — Node.js framework with TypeScript
- **PostgreSQL** — relational database
- **Prisma ORM** — type-safe database client
- **JWT** — authentication with httpOnly cookies
- **Nodemailer** — email verification and password reset
- **Docker** — containerized PostgreSQL for local development

### Frontend
- **Next.js 16** — React framework with Turbopack
- **TypeScript** — full type safety
- **Tailwind CSS v4** — utility-first styling
- **Recharts** — data visualization


## Getting Started

### Prerequisites
- Node.js 18+
- Docker Desktop

### Backend Setup
```bash
cd backend
npm install

# Start PostgreSQL
docker-compose up -d

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL to .env

# Run migrations
npx prisma migrate dev

# Seed the database
npm run seed

# Start development server
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000` and the API at `http://localhost:3001`.


## Roadmap

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | MVP — Profile, Job Tracker, Dashboard | ✅ Complete |
| 2 | Job Market Analyzer — skill demand by region | 🔄 In Progress |
| 3 | Skill Gap Analysis — profile vs market | 📋 Planned |
| 4 | Recommendation Engine — personalized learning | 📋 Planned |
| 5 | Automation — scheduled scraping and analysis | 📋 Planned |

## License

MIT
