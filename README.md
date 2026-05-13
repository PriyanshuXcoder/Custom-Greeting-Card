# WishCraft — Custom Greetings & Wishes App

A full-stack MERN application where users can browse personalized greeting templates, overlay their own photo and name in real-time, and download or share the result.

---

## Features

- 🔐 JWT Authentication (Register / Login / Guest)
- 👤 Profile setup with photo upload
- 🎨 14+ greeting templates across 8 categories
- 🖼️ **Live personalized preview** — your photo + name overlaid on every card
- 🔒 Premium templates with subscription modal
- ⬇️ Download as PNG (html2canvas)
- 🔗 Native Share API
- 🔍 Search + category filter
- 🔥 Trending section

---

## Tech Stack

| Layer     | Technology                             |
|-----------|----------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS v4        |
| Backend   | Node.js, Express.js                    |
| Database  | MongoDB Atlas + Mongoose               |
| Auth      | JWT (stored in localStorage)           |
| Upload    | Multer (disk storage)                  |
| Export    | html2canvas                            |
| Notifs    | react-hot-toast                        |

---

## Project Structure

```
greetings-app/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── api/             # Axios instance
│       ├── components/      # Navbar, TemplateCard, PremiumModal, ProtectedRoute
│       ├── context/         # AuthContext (Context API)
│       ├── pages/           # Home, Login, Register, Profile, TemplateDetail
│       └── App.jsx
│
└── server/                  # Express backend
    ├── config/              # db.js, seedTemplates.js
    ├── controllers/         # authController, templateController, userController
    ├── middleware/          # authMiddleware, uploadMiddleware
    ├── models/              # User.js, Template.js
    ├── routes/              # authRoutes, templateRoutes, userRoutes
    ├── uploads/             # uploaded profile images
    └── index.js
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)

### 1. Backend setup

```bash
cd server
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET in .env
npm install
npm run dev
```

### 2. Seed the database

```bash
cd server
node config/seedTemplates.js
```

### 3. Frontend setup

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

App runs at **http://localhost:5173**

---

## API Endpoints

| Method | Route                 | Auth     | Description              |
|--------|-----------------------|----------|--------------------------|
| POST   | /api/auth/register    | No       | Create account           |
| POST   | /api/auth/login       | No       | Login                    |
| GET    | /api/auth/me          | Yes      | Get current user         |
| GET    | /api/templates        | No       | List templates           |
| GET    | /api/templates/:id    | No       | Single template          |
| POST   | /api/templates        | Yes      | Create template (admin)  |
| PUT    | /api/user/profile     | Yes      | Update name + photo      |

---

## Environment Variables

**server/.env**
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/greetings-app
JWT_SECRET=your_secret_here
NODE_ENV=development
```

**client/.env**
```
VITE_API_URL=http://localhost:5000
```

---

## Deployment

### Backend (Render)
1. Push `server/` folder to GitHub
2. Create a new **Web Service** on Render
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables (MONGO_URI, JWT_SECRET, NODE_ENV=production)

### Frontend (Vercel)
1. Push `client/` folder to GitHub
2. Import on Vercel, framework: **Vite**
3. Set env variable: `VITE_API_URL=https://your-render-backend.onrender.com`
4. Update CORS origin in `server/index.js` to your Vercel URL

---

## MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com
2. Create a free M0 cluster
3. Add a database user (remember password)
4. Whitelist IP: `0.0.0.0/0` (for Render)
5. Click **Connect → Connect your application**
6. Copy the connection string and add to `.env`
7. Run `node config/seedTemplates.js` to populate templates

---

## Interview Talking Points

1. **Why MERN?** — Popular, JavaScript end-to-end, easy to learn and scale
2. **Why Vite?** — Faster dev server than CRA, native ESM support
3. **JWT vs Sessions** — Stateless auth, works well with mobile apps too
4. **Overlay logic** — Each template stores its own `profilePosition` and `namePosition` as percentage-based values, making overlays responsive to any card size
5. **html2canvas** — Captures the DOM node including CSS overlays into a canvas, then downloads as PNG
6. **Context API** — Simpler than Redux for auth state; avoids prop drilling
7. **Multer** — Handles multipart/form-data, saves images to server disk (could be extended to S3)

---

## Known Limitations & Future Improvements

- [ ] Cloud image storage (AWS S3 or Cloudinary) instead of local disk
- [ ] Real Razorpay/Stripe payment integration for premium
- [ ] Admin dashboard to add/edit templates
- [ ] Image compression before upload
- [ ] Email verification on register
- [ ] Dark mode
- [ ] More template customization (background color, stickers)
- [ ] Template favorites / saved cards

---

## Common Issues

| Issue | Fix |
|-------|-----|
| CORS error | Make sure backend CORS origin matches frontend URL exactly |
| Images not loading on download | Add `crossOrigin="anonymous"` to all `<img>` tags |
| "Token invalid" after restart | JWT_SECRET changed — clear localStorage and login again |
| Multer "file too large" | Client already checks 2MB but server limit is also 2MB |
| Templates not showing | Run `node config/seedTemplates.js` first |
