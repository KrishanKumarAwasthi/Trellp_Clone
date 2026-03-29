# 📋 Trello Clone — Full-Stack Kanban Board

A production-ready Kanban board application inspired by Trello, built with **Next.js** (frontend) and **Express + Prisma** (backend). Features drag-and-drop cards, multi-board support, labels, checklists, and a fully responsive design across mobile, tablet, and desktop.

### 🔗 [Live Demo → trellp-clone.vercel.app](https://trellp-clone.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-4.19-000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwind-css&logoColor=white)
![Live](https://img.shields.io/badge/Status-Live-brightgreen)

---

## ✨ Features

- **Multi-Board Management** — Create, switch, and manage multiple Kanban boards
- **Drag & Drop** — Reorder cards within lists and move cards across lists
- **Labels & Colors** — Color-coded labels for card categorization
- **Checklists** — Nested todo items inside cards with progress tracking
- **Members** — Assign team members to cards
- **Card Details** — Rich card modal with description, due date, labels, checklists, and archive
- **Search & Filter** — Filter cards by text, label, member, or due date
- **Responsive Design** — Fully optimized for mobile (375px+), tablet (768px+), and desktop (1024px+)
- **Collapsible Sidebar** — Toggle board navigation with smooth animations
- **Dark Theme** — Modern dark UI with glassmorphism effects

---

## 🏗️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2.1 | React framework (App Router) |
| **React** | 19.2.4 | UI library |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS styling |
| **PostCSS** | 8.5.8 | CSS processing |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Express.js** | 4.19.2 | REST API server |
| **Prisma ORM** | 5.x | Database ORM & migrations |
| **PostgreSQL** | 15+ | Relational database |
| **Zod** | 3.23.8 | Request validation |
| **dotenv** | 16.4.5 | Environment variable management |
| **CORS** | 2.8.5 | Cross-origin resource sharing |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **Neon** | Serverless PostgreSQL hosting |
| **Render** | Backend API deployment |
| **Vercel** | Frontend deployment |

---

## 📁 Project Structure

```
trello-clone/
├── frontend/                   # Next.js frontend application
│   ├── app/
│   │   ├── board/[id]/page.js  # Dynamic board view (Kanban)
│   │   ├── lib/api.js          # API client (all backend calls)
│   │   ├── globals.css         # Global styles & responsive utilities
│   │   ├── layout.js           # Root layout with meta tags
│   │   └── page.js             # Home page (redirects to board)
│   ├── components/
│   │   ├── Header.js           # Top navigation bar
│   │   ├── Sidebar.js          # Board switcher sidebar
│   │   ├── BoardHeader.js      # Board title, filters, members
│   │   ├── KanbanList.js       # List column with drag-and-drop
│   │   ├── KanbanCard.js       # Card component with detail modal
│   │   └── BottomNav.js        # Mobile bottom navigation
│   ├── package.json
│   ├── tailwind.config.js
│   └── next.config.mjs
│
├── src/                        # Express backend application
│   ├── app.js                  # Express app configuration & routing
│   ├── server.js               # Server entry point
│   ├── routes/
│   │   ├── board.routes.js     # /api/v1/boards
│   │   ├── list.routes.js      # /api/v1/lists
│   │   ├── card.routes.js      # /api/v1/cards
│   │   ├── label.routes.js     # /api/v1/labels
│   │   ├── member.routes.js    # /api/v1/members
│   │   └── checklist.routes.js # /api/v1/checklists
│   ├── controllers/            # Route handlers
│   ├── services/               # Business logic
│   ├── middlewares/             # Auth, error handling
│   ├── config/                 # Environment config
│   └── utils/                  # Helpers
│
├── prisma/
│   ├── schema.prisma           # Database schema (7 models)
│   ├── migrations/             # SQL migration files
│   └── seed.js                 # Database seeder
│
├── package.json                # Backend dependencies
└── .env                        # Environment variables (not tracked)
```

---

## 🚀 Running Locally

Follow these steps to run the full application on your machine.

### Prerequisites

- **Node.js** ≥ 18.x ([download](https://nodejs.org/))
- **npm** ≥ 9.x (comes with Node.js)
- **PostgreSQL** database — you can use:
  - A local PostgreSQL installation
  - A free hosted DB from [Neon](https://neon.tech), [Supabase](https://supabase.com), or [ElephantSQL](https://elephantsql.com)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/KrishanKumarAwasthi/Trellp_Clone.git
cd Trellp_Clone
```

---

### Step 2 — Setup & Start the Backend

```bash
# Install backend dependencies
npm install
```

Create a **`.env`** file in the project root:

```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST:5432/YOUR_DB_NAME?sslmode=require"
PORT=3001
```

> ⚠️ Replace the `DATABASE_URL` with your actual PostgreSQL connection string. If using [Neon](https://neon.tech), copy the connection string from your Neon dashboard.

```bash
# Push the database schema to your PostgreSQL instance
npx prisma db push

# Generate the Prisma client
npx prisma generate

# (Optional) Seed the database with sample boards and cards
npx prisma db seed

# Start the backend dev server
npm run dev
```

✅ Backend is now running at **http://localhost:3001**

---

### Step 3 — Setup & Start the Frontend

Open a **new terminal** (keep the backend running):

```bash
# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install
```

Create a **`.env.local`** file inside the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

```bash
# Start the frontend dev server
npm run dev
```

✅ Frontend is now running at **http://localhost:3000**

---

### Step 4 — Open the App

Open your browser and go to:

```
http://localhost:3000
```

The app will automatically load the first available board. If you ran the seed command, you'll see sample boards with cards ready to use.

---

### Quick Reference

| What | Command | Where |
|------|---------|-------|
| Install backend | `npm install` | Project root |
| Setup database | `npx prisma db push` | Project root |
| Seed sample data | `npx prisma db seed` | Project root |
| Start backend | `npm run dev` | Project root |
| Install frontend | `npm install` | `frontend/` |
| Start frontend | `npm run dev` | `frontend/` |

---

## 🌐 Live Deployment

| Layer | Platform | URL |
|-------|----------|-----|
| **Frontend** | Vercel | [trellp-clone.vercel.app](https://trellp-clone.vercel.app) |
| **Backend API** | Render | Hosted on [Render](https://render.com) |
| **Database** | Neon | Serverless PostgreSQL on [Neon](https://neon.tech) |

### Deploying Your Own Fork

If you fork this repo and want to deploy your own instance:

**Backend** — Deploy on [Render](https://render.com):
1. Create a new **Web Service** on Render
2. Connect your GitHub repo
3. Set **Build Command** → `npm install && npx prisma generate`
4. Set **Start Command** → `npm start`
5. Add environment variables: `DATABASE_URL` and `PORT`

**Database** — Set up on [Neon](https://neon.tech):
1. Create a free Neon project
2. Copy the PostgreSQL connection string from your dashboard
3. Use it as the `DATABASE_URL` in your backend environment

**Frontend** — Deploy on [Vercel](https://vercel.com):
1. Import the repo on [vercel.com/new](https://vercel.com/new)
2. Set **Root Directory** → `frontend`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = `https://your-render-backend-url.onrender.com/api/v1`
4. Deploy

---

## 📡 API Endpoints

All endpoints are prefixed with `/api/v1`.

### Boards
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/boards` | List all boards with their lists and cards |
| `GET` | `/boards/:id` | Get a single board by ID |
| `POST` | `/boards` | Create a new board |

### Lists
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/lists?boardId=` | Get lists for a board |
| `POST` | `/lists` | Create a new list |
| `PUT` | `/lists/:id` | Update list title/position |
| `DELETE` | `/lists/:id` | Delete a list |
| `PUT` | `/lists/reorder` | Reorder lists within a board |

### Cards
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/cards?listId=` | Get cards for a list |
| `GET` | `/cards/search` | Search/filter cards |
| `POST` | `/cards` | Create a new card |
| `PUT` | `/cards/:id` | Update card details |
| `DELETE` | `/cards/:id` | Delete a card |
| `PUT` | `/cards/:id/archive` | Archive/unarchive a card |
| `PUT` | `/cards/reorder` | Reorder cards in a list |
| `PUT` | `/cards/move` | Move card to another list |
| `POST` | `/cards/:id/labels` | Add label to card |
| `DELETE` | `/cards/:id/labels/:labelId` | Remove label from card |
| `POST` | `/cards/:id/members` | Assign member to card |
| `DELETE` | `/cards/:id/members/:memberId` | Remove member from card |

### Labels
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/labels` | List all labels |
| `POST` | `/labels` | Create a label |
| `DELETE` | `/labels/:id` | Delete a label |

### Members
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/members` | List all members |
| `POST` | `/members` | Create a member |
| `DELETE` | `/members/:id` | Delete a member |

### Checklists
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/checklists` | Create a checklist for a card |
| `POST` | `/checklists/:id/items` | Add item to checklist |
| `PUT` | `/checklists/items/:id` | Toggle item completion |
| `DELETE` | `/checklists/items/:id` | Delete checklist item |

---

## 🗄️ Database Schema

The database consists of **7 models** with the following relationships:

```
Board (1) ──→ (N) List (1) ──→ (N) Card
                                    │
                         ┌──────────┼──────────┐
                         │          │          │
                   CardLabel   CardMember  Checklist
                      ↕            ↕          │
                    Label       Member   ChecklistItem
```

| Model | Description |
|-------|-------------|
| `Board` | Kanban board container |
| `List` | Column within a board (position-ordered) |
| `Card` | Task card within a list |
| `Label` | Color-coded tag (many-to-many with Card) |
| `Member` | Team member (many-to-many with Card) |
| `Checklist` | Todo list within a card |
| `ChecklistItem` | Individual todo item |

---

## 📐 Assumptions Made

1. **Single User / No Authentication** — The app uses mock authentication. All boards and data are shared globally. In a production app, user auth (e.g., OAuth, JWT) would scope data per user/workspace.

2. **Mock Auth Middleware** — A `mockAuth` middleware injects a default user context. This simplifies development but should be replaced with real auth for production.

3. **Float-Based Positioning** — List and card positions use `Float` values (e.g., 1000, 2000) to allow inserting between items without reordering the entire list. This is a common pattern in Kanban apps.

4. **Client-Side Drag & Drop** — Drag-and-drop is implemented using the native HTML5 Drag and Drop API (no external library like `react-beautiful-dnd`). This keeps the bundle size small but may have minor UX differences across browsers.

5. **CORS Open** — The backend allows all origins (`cors()` with no restrictions). For production, this should be restricted to the frontend domain only.

6. **No Real-Time Sync** — Changes are not pushed to other clients in real time. Each client fetches fresh data on page load. WebSocket support could be added for real-time collaboration.

7. **PostgreSQL Required** — The app requires PostgreSQL specifically (not MySQL/SQLite) due to Prisma's PostgreSQL-specific features used in the schema.

8. **Cascade Deletes** — Deleting a Board cascades to all its Lists → Cards → Labels/Members/Checklists. This is intentional for clean data management.

---

## 🧪 Running Tests

```bash
# Backend API tests (via Postman collection)
# Import trello_clone.postman_collection.json into Postman

# Or use the REST client file
# Open rest_tests.http in VS Code with REST Client extension
```

---

## 📄 License

This project is for educational and portfolio purposes.