# Frontend - Users & Permissions Management

Modern, type-safe frontend for the Users & Permissions system with full authentication and role-based UI.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Bundler**: Vite 7
- **Styling**: Tailwind CSS 4
- **State Management / Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v7
- **HTTP Client**: Axios (with JWT + refresh token interceptors)

## Quick Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd frontend
pnpm install
```

### 2. Environment Variables

Create a .env.local file in the project root:

VITE_API_URL=http://localhost:3000/api

### 3. Start Development Server

```bash
pnpm dev
```

App will be available at: http://localhost:5173
