<!-- TOC -->
  * [Next.js BetterAuth Integration](#nextjs-betterauth-integration)
    * [✏️ Overview](#-overview)
    * [🚀 Features](#-features)
    * [🛠 Tech️ Stack](#-tech-stack)
    * [📋 Prerequisites](#-prerequisites)
    * [📦 Quick Start](#-quick-start)
    * [❓ Troubleshooting](#-troubleshooting)
      * [Database Connection Issues](#database-connection-issues)
      * [Email Not Sending?](#email-not-sending)
    * [⚙️  Other platforms](#-other-platforms)
      * [Database](#database)
      * [Email Service](#email-service)
    * [🤝  Contributing](#-contributing)
<!-- TOC -->

## Next.js BetterAuth Integration

### ✏️ Overview

This project provides a comprehensive authentication system for **Next.js** applications, featuring user registration, email confirmation, password recovery, and secure login.

<p align="center">
  <img src="public/preview.jpg" alt="Preview" width="100%">
</p>

---

### 🚀 Features

- **User Registration** - Secure sign-up process with email/password
- **Email Confirmation** - Users must verify their email before accessing their account
- **Password Recovery** - Forgot password & reset password workflows
- **Secure Authentication** - Protected routes & session management
- **Modern UI** - Built with Tailwind CSS & shadcn/ui components
- **Email Templates** - Customizable email templates with JSX Email
- **Dockerized Services** - PostgreSQL database & Mailpit email testing

---

### 🛠 Tech️ Stack

- **Framework** - Next.js
- **Authentication** - Better Auth
- **Database** - PostgreSQL + Drizzle ORM
- **Email** - JSX Email, NodeMailer
- **UI** - Tailwind CSS, shadcn/ui
- **Infrastructure** - Docker

---

### 📋 Prerequisites

- **Node.js** `v22`
- **Docker**
- **GIT**

---

### 📦 Quick Start

**1. Clone the repository**

```bash
git clone https://github.com/ozariechniev/next-js-better-auth.git
cd next-js-better-auth
```

**2. Install dependencies**

```bash
npm install
```

**3. Create a `.env.local` file**

```bash
cp env.example .env.local
```

**4. Generate Better Auth secret key and update .env.local**

```bash
npx @better-auth/cli@latest secret
```

**5. Setup Docker container**

```bash
docker-compose up -d
```

This will start:

- **PostgreSQL** database
- **Mailpit** (email testing interface)

**6. Generate the database migration and apply it**

```bash
npm run db:db:generate
npm run db:migrate
```

OR push the schema directly to the database (optional)

```bash
npm run db:push
```

**7. Start the development server**

```bash
npm run dev
```

- ✅ The app will be running at: `https://localhost:3000`
- ✅ Mailpit will be running at: `http://localhost:8025/`
- ✅ Drizzle Studio will be running at: `https://local.drizzle.studio` [`npm run db:studio`] (optional)

---

### ❓ Troubleshooting

#### Database Connection Issues

- Ensure Docker is running
- Verify PostgreSQL container is up (`docker ps`)
- Check your `.env.local` `DATABASE_URL` matches the Docker configuration

#### Email Not Sending?

- Check Mailpit interface at `http://localhost:8025/`
- Verify SMTP settings in `.env.local`
- Ensure your email service is properly configured

---

### ⚙️  Other platforms

#### Database

Drizzle ORM configuration might need to be updated for other databases, adapters, or configurations

- `drizzle.config.ts`
- `src/db/drizzle.ts`

#### Email Service

Email service configuration might need to be updated for other providers

- `src/lib/send-email.ts`

---

### 🤝  Contributing

Contributions are welcome! Feel free to submit a PR or open an issue if you have any questions or suggestions.