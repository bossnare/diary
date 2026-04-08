# Talor - Note-Taking & Sharing App

A modern note-taking application built to create, manage, and share ideas online with secure authentication and real-time synchronization.

## 🏗️ Architecture

### Frontend
- **React** with TypeScript
- **Vite** - Fast build tool with HMR (Hot Module Replacement)
- **React Compiler** enabled for optimized performance

### Backend (Migration in Progress)
- **NestJS** - Progressive Node.js framework for scalable server-side applications
- **Prisma** - Type-safe ORM for database interactions
- **PostgreSQL** - Robust relational database
- *Previous stack: Drizzle ORM + ElysiaJS (being migrated to Prisma + NestJS)*

### Authentication & Database
- **Supabase** - Auth and database management
- **OAuth Providers**: Google, GitHub
- **User Management**: Supabase Auth with profiles table synced to auth.users

## 🔐 Authentication Flow

```
1. Users authenticate via Supabase (Google/GitHub OAuth)
2. Supabase auth.users table stores user credentials
3. PostgreSQL profiles table references auth.users.id
4. Automatic sync via Supabase triggers and functions
```

## 📁 Project Structure

```
talor/
├── apps/
│   ├── frontend/          # React + Vite frontend
│   └── backend/           # NestJS + Prisma backend
├── libs/                  # Shared utilities
├── diary.notes.md         # Project notes and roadmap
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Bun runtime
- PostgreSQL
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bossnare/talor.git
cd talor
```

2. Install dependencies:
```bash
npm install
# or with Bun
bun install
```

3. Set up environment variables:
```bash
# Create .env files with:
# - Supabase URL
# - Supabase Public Anon Key
# - Database credentials
```

4. Run the application:
```bash
# Development
npm run dev

# Build
npm run build
```

## 🔄 Database Schema

### Users Table (via Supabase Auth)
- Managed by Supabase at `auth.users`
- Synced with local `profiles` table via triggers

### Profiles Table
- References `auth.users.id`
- Stores additional user metadata
- Auto-created via Supabase function & trigger

## 📝 Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite |
| Backend | NestJS + Prisma |
| Database | PostgreSQL |
| Auth | Supabase (Google/GitHub OAuth) |
| Runtime | Bun |

## 🔄 Recent Changes

- ✅ Migration from Drizzle/ElysiaJS to Prisma/NestJS completed
- ✅ Improved type safety with TypeScript
- ✅ Better scalability with NestJS architecture

## 📚 Documentation

- [React Compiler Guide](https://react.dev/learn/react-compiler)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Guide](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev)

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests for improvements and bug fixes.

## 📄 License

This project is licensed under the MIT License.