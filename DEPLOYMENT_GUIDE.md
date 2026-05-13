# WishCraft - Setup & Deployment Guide

This guide provides step-by-step instructions for setting up the WishCraft project locally and deploying it to production using Render, Vercel, and MongoDB Atlas.

---

## 1. Local Development Setup

To run the project locally, follow these steps in order.

### Step 1.1: Clone the Repository
Open your terminal and clone the repository (or navigate to your project directory if already created).

```bash
cd /path/to/your/workspace
# If using git:
# git clone <your-repo-url>
cd greetings-app
```

### Step 1.2: Backend Setup
The backend runs on Node.js and Express.

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create the uploads directory (used for storing profile pictures locally):
   ```bash
   mkdir uploads
   ```
4. Set up the `.env` file (see the [Environment Variables](#2-environment-variables) section below for details).
   ```bash
   cp .env.example .env
   ```

### Step 1.3: Frontend Setup
The frontend runs on React and Vite.

1. Open a **new terminal window** and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file:
   ```bash
   cp .env.example .env
   ```

### Step 1.4: Running Both Together
You will need two terminal windows open.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
# Expected output: "🚀 Server running on http://localhost:5000"
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Expected output: "➜  Local:   http://localhost:5173/"
```

Open your browser and navigate to `http://localhost:5173`.

### Step 1.5: Seed the Database (Important)
Once your MongoDB connection is established (see Atlas section), populate the initial templates and the guest user.

In your backend terminal (or a third terminal in the `server` folder):
```bash
node config/seedTemplates.js
node config/seedGuest.js
```

---

## 2. Environment Variables

### Backend `.env` (`server/.env`)
Create a file named `.env` in the `server` folder and add the following:

```env
PORT=5000
# See MongoDB Atlas section on how to get this URI
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/greetings-app?retryWrites=true&w=majority
# Use a strong, random string in production
JWT_SECRET=super_secret_jwt_key_2024
NODE_ENV=development
# The URL of your frontend application
CLIENT_URL=http://localhost:5173
```

**How to generate a JWT Secret:**
You can generate a secure random string using Node.js in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend `.env` (`client/.env`)
Create a file named `.env` in the `client` folder and add the following:

```env
# URL where your backend is running
VITE_API_URL=http://localhost:5000
```
*Note: In Vite, environment variables must start with `VITE_` to be accessible in the browser.*

---

## 3. MongoDB Atlas Setup

We use MongoDB Atlas to host our database in the cloud.

### Step 3.1: Create an Account and Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Once logged in, click **"Build a Database"**.
3. Choose the **Free (M0)** tier.
4. Select a cloud provider (e.g., AWS) and a region close to you.
5. Click **"Create Cluster"**.

### Step 3.2: Configure Network Access (Whitelist IP)
1. On the left sidebar, click **"Network Access"**.
2. Click **"Add IP Address"**.
3. Choose **"Allow Access from Anywhere"** (this sets the IP to `0.0.0.0/0`). This is necessary for Render to communicate with your database.
4. Click **"Confirm"**.

### Step 3.3: Create a Database User
1. On the left sidebar, click **"Database Access"**.
2. Click **"Add New Database User"**.
3. Choose **"Password"** authentication.
4. Enter a Username (e.g., `wishcraftuser`) and generate a secure Password. **Save this password somewhere safe.**
5. Click **"Add User"**.

### Step 3.4: Get the Connection String
1. Go back to **"Database"** on the left sidebar.
2. Click the **"Connect"** button on your cluster.
3. Choose **"Connect your application"** (Drivers).
4. Copy the provided connection string.
5. Paste it into your `server/.env` file under `MONGO_URI`.
6. **Important:** Replace `<password>` in the URI with the password you created in Step 3.3 (do not include the `< >` brackets).

---

## 4. Backend Deployment on Render

Render is a cloud platform for hosting web services.

### Step 4.1: Push Code to GitHub
Ensure your entire `greetings-app` project is pushed to a GitHub repository.

### Step 4.2: Create a Web Service
1. Create a free account on [Render](https://render.com/).
2. Click **"New"** and select **"Web Service"**.
3. Connect your GitHub account and select your `greetings-app` repository.

### Step 4.3: Configure the Web Service
Fill in the following details:
- **Name:** `wishcraft-api` (or similar)
- **Root Directory:** `server` (Important: This tells Render to look in the server folder)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Step 4.4: Add Environment Variables
Scroll down to the **Environment Variables** section and add:
- `MONGO_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: A secure random string.
- `NODE_ENV`: `production`
- `CLIENT_URL`: `https://your-frontend-url.vercel.app` (You can update this after deploying the frontend).

### Step 4.5: Deploy
1. Click **"Create Web Service"**.
2. Render will now build and deploy your backend.
3. Once deployed, copy the **Render URL** (e.g., `https://wishcraft-api.onrender.com`). You will need this for the frontend setup.

**Common Render Issue:** 
Render's free tier spins down after 15 minutes of inactivity. Initial requests might take 30-50 seconds to respond as the server "wakes up".

---

## 5. Frontend Deployment on Vercel

Vercel is optimized for frontend frameworks like Vite.

### Step 5.1: Import Project
1. Create an account on [Vercel](https://vercel.com/) and connect your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Import your `greetings-app` repository.

### Step 5.2: Configure Build Settings
1. In the configuration screen, change the **Root Directory** to `client`.
2. The framework should automatically be detected as **Vite**.
3. The Build Command (`npm run build`) and Output Directory (`dist`) should be correct by default.

### Step 5.3: Add Environment Variables
Expand the **Environment Variables** section and add:
- **Name:** `VITE_API_URL`
- **Value:** Your deployed Render backend URL (e.g., `https://wishcraft-api.onrender.com`). Make sure there is no trailing slash.

### Step 5.4: Deploy
1. Click **"Deploy"**.
2. Vercel will build and publish your frontend.
3. Once complete, click **"Continue to Dashboard"** to get your Vercel URL.

### Step 5.5: Final Configurations
1. Go back to your **Render dashboard** for the backend.
2. Update the `CLIENT_URL` environment variable to match your new Vercel URL (e.g., `https://wishcraft.vercel.app`).
3. This ensures CORS is properly configured to allow your Vercel frontend to communicate with your Render backend.

---

## 6. Final Testing Checklist

Once deployed, verify the following:
- [ ] **Registration:** Can I create a new account?
- [ ] **Login:** Can I log in with the new account and as a Guest?
- [ ] **Profile Update:** Can I upload a profile photo and change my name?
- [ ] **Templates Fetching:** Are the templates visible on the home page?
- [ ] **Live Overlay:** When clicking a template, does my photo and name appear in the correct position?
- [ ] **Customization:** Can I change the text, font size, and color in the preview?
- [ ] **Download:** Does the download button generate a valid PNG image with the overlays intact?
- [ ] **Premium Lock:** Clicking a premium template shows the subscription modal.
- [ ] **Responsive Design:** Does the app look good on a mobile device?

---

## 7. Interview Preparation Section

Be ready to discuss these architectural decisions:

### Why MERN Stack?
"MERN (MongoDB, Express, React, Node) was chosen because it allows for a unified language (JavaScript) across the entire stack. MongoDB's flexible schema was particularly helpful because each template requires unique metadata (like positional coordinates for overlays) which might evolve over time. React's component-based architecture made building the dynamic preview canvas straightforward."

### How does the Image Overlay work?
"This is the core feature. Instead of hardcoding positions, each template document in MongoDB stores metadata for `profilePosition` (top/left/size) and `namePosition` (top/left). On the frontend, these values are applied as inline CSS to absolutely positioned elements over the background image. To generate the final downloadable image, I used `html2canvas`, which traverses the DOM tree of the preview container and renders it onto an HTML5 canvas element, which is then converted to a downloadable PNG URL."

### How does Authentication work?
"I implemented stateless authentication using JSON Web Tokens (JWT). When a user logs in, the backend verifies credentials using `bcrypt` and generates a signed JWT containing the user's ID. This token is sent to the client and stored in `localStorage`. For protected routes (like updating the profile), the client attaches this JWT in the `Authorization` header as a Bearer token. The backend middleware verifies the signature to ensure authenticity before proceeding."

### Challenges Faced
"Handling CORS during deployment was initially tricky. The frontend runs on Vercel and the backend on Render, so the browser blocked requests by default. I had to explicitly configure the `cors` middleware in Express to accept requests from the Vercel URL. Another challenge was ensuring `html2canvas` correctly captured external images (like profile pictures); this required configuring `crossOrigin="anonymous"` on image tags and ensuring proper CORS headers on the backend."

### Future Scalability
"For scalability, the first step would be moving image storage from local disk (Multer) to a cloud provider like AWS S3 or Cloudinary. This is crucial for stateless deployments (like on Render) where local disk data is lost on restart. We could also implement Redis for caching template data since it changes infrequently but is read constantly."
