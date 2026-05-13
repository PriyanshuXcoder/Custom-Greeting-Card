# WishCraft — Personalized Greetings & Wishes
Demo Video- https://drive.google.com/file/d/1ttKbaPGSe7qXxzA8Zu0sS68tIzJHZPfV/view?usp=sharing

Welcome to **WishCraft**, a full-stack MERN application that allows users to create beautifully customized greeting cards by instantly overlaying their photo and name onto premium templates.

This application is built for seamless local development, featuring an auto-configured **in-memory database** that requires zero setup to get started!

---

## 🚀 Features

- **Guest Login Available**: Instantly test the app without registering using the auto-seeded Guest account.
- **Dynamic Image Generation**: Uses `html2canvas` to render personalized text and profile images directly onto a canvas, which can be downloaded instantly.
- **Categorized Templates**: Browse 20+ templates (Free & Premium) across categories like Birthday, Wedding, Festival, Diwali, Eid, Christmas, Anniversary, and more!
- **Auto-Seeding Database**: Starts up with an in-memory MongoDB database and auto-populates it with templates and users so you don't have to manually seed anything.
- **Full Authentication**: Secure JWT-based authentication for registering and logging into real accounts.
- **Responsive Design**: Beautiful UI built from scratch using Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Image Processing**: `html2canvas` for client-side rendering and exporting

### Backend
- **Framework**: Node.js & Express.js
- **Database**: MongoDB (Mongoose) + `mongodb-memory-server` for instant local development
- **Authentication**: JWT (JSON Web Tokens) & `bcryptjs`
- **File Uploads**: `multer` for handling profile picture uploads

---

## 💻 Full Setup Instructions

Because this project is configured with an in-memory fallback database, you do **not** need to set up a real MongoDB cluster to test it locally. It works right out of the box!

### 1. Clone the Repository

```bash
git clone https://github.com/PriyanshuXcoder/Custom-Greeting-Card.git
cd Custom-Greeting-Card
```

### 2. Backend Setup & Run

Open a terminal and navigate to the `server` directory:

```bash
cd server
npm install
```

Start the backend server:

```bash
npm run dev
# OR
node index.js
```

> **Note**: The backend will automatically detect that no real MongoDB URI is provided and will spin up an **in-memory database**. It will then automatically seed the Guest user and all the templates.

### 3. Frontend Setup & Run

Open a **new** terminal window and navigate to the `client` directory:

```bash
cd client
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The app will now be running at **http://localhost:5173**. 

---

## 🌍 Connecting a Real Database (Optional)

If you want your users and data to persist after you stop the server, you can connect a real MongoDB database:

1. Go to `server/.env` (or create one by copying `server/.env.example`)
2. Replace the `MONGO_URI` with your actual MongoDB connection string (e.g., from MongoDB Atlas):
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/greetings-app
   ```
3. Restart the backend. The app will automatically detect the real URI, connect to it, and seed your live database with the default templates.

---

## 📂 Project Structure

```text
Custom-Greeting-Card/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── api/             # Axios API config
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # AuthContext
│   │   ├── pages/           # Application Routes
│   │   └── App.jsx          # Main App Component
│   └── vite.config.js       # Vite Configuration
│
└── server/                  # Node.js Backend
    ├── config/              # Database connection logic
    ├── controllers/         # Route business logic
    ├── middleware/          # JWT Auth & Upload Middlewares
    ├── models/              # Mongoose Schemas (User, Template)
    ├── routes/              # Express API Routes
    ├── seeder.js            # Auto-injection script for templates
    └── index.js             # Server Entry Point
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
