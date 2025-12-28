# 🚀 Quick Cast

**A real-time web application** built with a modern full-stack monorepo architecture, combining **Next.js**, **NestJS**, **Socket.IO**, and **Redis** to deliver instant updates without page refreshes.

---

## 📦 Repository Structure

```
quick-cast/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # NestJS backend
├── packages/
│   └── shared/           # Shared types & utilities
├── docker-compose.yml    # Redis Stack container
├── package.json          # Monorepo root config
└── README.md
```

---

## 🧱 Tech Stack

| Layer         | Technology                | Purpose                                  |
| ------------- | ------------------------- | ---------------------------------------- |
| **Frontend**  | Next.js + TypeScript      | Server-side rendering & modern React     |
| **State**     | Zustand                   | Lightweight client-side state management |
| **Real-time** | Socket.IO Client          | Live bidirectional communication         |
| **Backend**   | NestJS + TypeScript       | Scalable Node.js framework               |
| **API**       | REST + Socket.IO Gateway  | Commands via REST, updates via WebSocket |
| **Database**  | Redis Stack (JSON module) | In-memory data store with JSON support   |
| **Infra**     | Docker Compose            | Containerized Redis deployment           |
| **Monorepo**  | npm Workspaces            | Unified dependency management            |

---

## 🧠 Architecture Overview

```
┌─────────┐    REST API     ┌─────────┐    Redis     ┌───────┐
│ Next.js │ ─────────────> │ NestJS  │ ──────────> │ Redis │
│ Client  │ <───────────── │ Backend │ <────────── │ Stack │
└─────────┘   Socket.IO    └─────────┘              └───────┘
     │                           │
     └── Zustand Store ──────────┘
```

- **REST APIs** handle commands (create, join, fetch)
- **Socket.IO** pushes real-time updates to all connected clients
- **Redis** stores application state in-memory with persistence
- **Zustand** synchronizes frontend state with backend events

---

## ⚙️ Local Setup

### 1️⃣ Clone & Install

```bash
git clone <repo-url>
cd quick-cast
npm install
```

This installs dependencies for root, frontend, backend, and shared packages.

### 2️⃣ Start Redis

```bash
npm run redis:up
```

Launches Redis Stack container with JSON module enabled.

### 3️⃣ Start Development Servers

```bash
npm run dev
```

Starts both Next.js frontend and NestJS backend concurrently.

---

## 📜 Essential Scripts

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `npm install`        | Install all workspace dependencies   |
| `npm run dev`        | Start frontend + backend in parallel |
| `npm run dev:web`    | Start Next.js frontend only          |
| `npm run dev:api`    | Start NestJS backend only            |
| `npm run build`      | Production build for both apps       |
| `npm run build:web`  | Build Next.js frontend               |
| `npm run build:api`  | Build NestJS backend                 |
| `npm run redis:up`   | Start Redis container                |
| `npm run redis:down` | Stop Redis container                 |

---

## 🌐 Development URLs

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:3001 |
| Redis    | localhost:6379        |

---

## 🔄 Real-Time Data Flow

1. **Client** sends REST request to backend
2. **Backend** updates Redis state
3. **Backend** emits Socket.IO event to all connected clients
4. **Frontend** receives event via Socket.IO
5. **Zustand** updates UI state instantly
6. **React** re-renders affected components

> **Why Socket.IO?** REST alone requires polling or manual refresh. Socket.IO enables instant, bidirectional updates.

---

## 🐳 Docker Configuration

The `docker-compose.yml` provides Redis Stack with JSON support:

```yaml
version: "3.9"
services:
  redis:
    image: redis/redis-stack
    ports:
      - "6379:6379"
    restart: unless-stopped
```

---

## 🛡️ Design Principles

- **Event-Driven Architecture** – Real-time updates through Socket.IO
- **Separation of Concerns** – Frontend, backend, and shared code isolated
- **Stateless Backend** – All state stored in Redis
- **Centralized State Management** – Zustand synchronizes with backend
- **Infrastructure as Code** – Docker Compose for reproducible environments

---

## 🚀 Production Build

```bash
npm run build
```

Builds optimized production bundles for both frontend and backend.
