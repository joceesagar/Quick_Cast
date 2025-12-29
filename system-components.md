# 🏗️ System Components & Technology Choices

This document explains **each technology used in the system**, **why it was chosen**, and **its advantages over traditional approaches**.  
It serves as a **quick revision guide, project README, and defense-ready reference**.

---

## 1. Frontend – Next.js (React + TypeScript)

### What it is

Next.js is a React framework that provides a structured, optimized, and production-ready frontend environment.

### Why we use it

- Built-in routing system
- High performance rendering
- Excellent support for real-time applications
- Strong TypeScript integration

### Advantages over traditional frontend (Plain HTML/CSS/JS)

| Traditional Approach | Next.js                             |
| -------------------- | ----------------------------------- |
| Manual routing       | File-based routing                  |
| Slower rendering     | Optimized rendering                 |
| Hard to scale        | Scalable architecture               |
| Runtime errors       | Compile-time checks with TypeScript |

### Role in our system

- Displays poll user interface
- Sends REST API requests
- Listens to real-time Socket.IO events

---

## 2. State Management – Zustand

### What it is

Zustand is a lightweight, hook-based state management library for React.

### Why we use it

- Minimal boilerplate
- Simple and readable code
- Efficient for real-time updates
- No reducers or actions required

### Advantages over traditional approaches

| Traditional (useState / Redux) | Zustand       |
| ------------------------------ | ------------- |
| Prop drilling                  | Global state  |
| Redux boilerplate              | Minimal setup |
| Complex logic                  | Simple hooks  |

### Example Usage

```typescript
import { create } from "zustand";

export const usePollStore = create((set) => ({
  poll: null,
  setPoll: (data) => set({ poll: data }),
}));
```

### Role in our system

- Stores poll state globally
- Updates UI instantly when Socket.IO emits events

---

## 3. Backend – NestJS (Node.js + TypeScript)

### What it is

NestJS is a backend framework built on Node.js that enforces a modular and scalable architecture.

### Why we use it

- Clean code structure
- Dependency Injection
- Built-in REST & WebSocket support
- Type safety using TypeScript

### Advantages over traditional Express.js

| Express.js       | NestJS                  |
| ---------------- | ----------------------- |
| Unstructured     | Modular architecture    |
| Hard to maintain | Scalable & maintainable |
| Manual patterns  | Built-in best practices |

### Role in our system

- Exposes REST APIs
- Manages Socket.IO server
- Communicates with Redis database

---

## 4. REST API

### What it is

REST (Representational State Transfer) is a stateless HTTP-based communication protocol.

### Why we use it

REST is ideal for non-real-time and one-time operations.

### Use cases in our system

- Create poll
- Join poll
- Rejoin poll
- Generate poll authorization token

### Limitation of REST

- ❌ Server cannot push updates
- ❌ Client must refresh or poll

---

## 5. WebSockets – Socket.IO

### What it is

Socket.IO enables persistent, bidirectional, real-time communication between client and server.

### Why we use it

- Real-time vote updates
- Low latency
- Server can push data instantly

### Advantages over REST-only approach

| REST             | Socket.IO      |
| ---------------- | -------------- |
| Request–response | Real-time push |
| Refresh required | No refresh     |
| Polling overhead | Efficient      |

### Role in our system

- Broadcast live poll results
- Synchronize votes among users instantly

---

## 6. Database – Redis (NoSQL, In-Memory)

### What it is

Redis is an in-memory NoSQL data store optimized for speed.

### Why we use Redis

- Extremely fast read/write operations
- Ideal for real-time applications
- Supports automatic expiration (TTL)

### Advantages over traditional SQL databases

| SQL Database   | Redis                |
| -------------- | -------------------- |
| Disk-based     | Memory-based         |
| Slower queries | Ultra-fast           |
| Manual cleanup | Auto-expiry with TTL |

### Role in our system

- Stores poll data
- Handles vote counters
- Automatically deletes polls after 2 hours

---

## 7. Redis Data Storage: Plain Redis vs Redis JSON

### 7.1 Plain Redis (String-based storage)

**Example:**

```redis
SET poll:123 "{ \"question\": \"Best language?\", \"A\": 10, \"B\": 5 }"
```

**Problems:**

- Whole object must be read and rewritten
- Risk of race conditions
- Poor structure handling

### 7.2 Redis JSON Module

**What it is:**  
Redis JSON allows Redis to store structured JSON documents and manipulate them atomically.

**Example:**

```redis
JSON.SET poll:123 $ '{
  "question": "Best language?",
  "options": {
    "A": 10,
    "B": 5
  }
}'
```

**Atomic update example:**

```redis
JSON.NUMINCRBY poll:123 $.options.A 1
```

**Advantages of Redis JSON:**

- ✅ Partial updates
- ✅ Atomic operations
- ✅ No race conditions
- ✅ Clean data structure

---

## 8. Data Expiration (TTL)

### Why it is needed

Polls are temporary and should not consume memory permanently.

**Example:**

```redis
EXPIRE poll:123 7200
```

**After 2 hours:**

- Poll is automatically deleted
- No cleanup logic required

---

## 9. Docker

### What it is

Docker is a containerization platform that packages applications and dependencies together.

### Why we use it

- Consistent development environment
- Easy Redis setup
- Simplified deployment

### Advantages over traditional setup

| Traditional         | Docker            |
| ------------------- | ----------------- |
| Manual installation | One-command setup |
| OS dependent        | Portable          |
| Hard to reproduce   | Consistent        |

---

## 10. Overall Architecture Justification

### Why this architecture?

- **REST** for poll lifecycle operations
- **Socket.IO** for real-time updates
- **Redis** for fast, temporary data storage

### Key Benefits

- ✅ Real-time experience
- ✅ Scalable architecture
- ✅ Clean separation of concerns
- ✅ Low latency
