# DevScoop 🚀

A sleek SaaS-style platform built with React & MongoDB to explore and manage developer resources.

---

## 🌐 Live Demo  
🔗 [Live Link](https://devscoop-509dd.web.app/)

---

## 🛠️ Technology Stack

### Frontend  
- **React** ^18.2.0  
- **react-router-dom** ^6.11.1  
- **tailwindcss** ^3.4.0  
- **daisyui** ^2.51.7  
- **firebase** ^10.16.0  
- **react-icons** ^4.10.1  
- **react-hot-toast** ^2.4.1  
- **lottie-react** ^2.3.2  
- **framer-motion** ^10.12.16 *(for animations)*

### Backend  
- **Node.js** ^20.7.0  
- **Express.js** ^4.18.2  
- **MongoDB (mongoose)** ^7.7.0  
- **dotenv** ^16.3.0  
- **jsonwebtoken** ^9.0.2  

---

## ✨ Main Features

- ✍️ User signup/login with **JWT** authentication  
- 🔐 Protected routes using **react-router**  
- 🧰 CRUD operations for developer resources  
- 📥 Firebase email/password & Google authentication  
- 🚨 Notifications via `react-hot-toast`  
- 🎨 Responsive UI with **Tailwind** + **DaisyUI**  
- 🎬 Lottie & Framer motion for smooth animations  

---
## 📁 Project Structure

DevScoop/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── server.js
└── README.md

## 📸 Screenshots

[All Blogs Screenshot](https://i.ibb.co/jkLLFMfD/Screenshot-2025-06-25-155648.png)

[Recommended Blogs Screenshot](https://i.ibb.co/fzHVWLxs/Screenshot-2025-06-25-155722.png)

[Tips Subscribe Page Screenshot](https://i.ibb.co/d06crV0Q/Screenshot-2025-06-25-155748.png)


## ⚙️ Running Locally

1. **Frontend**  
   bash
   cd frontend
   npm install
   # add .env:
   #   VITE_FIREBASE_API_KEY=...
   npm run dev
 2. **Backend**
bash
cd backend
npm install
# add .env:
#   MONGODB_URI=your_mongo_uri
#   JWT_SECRET=your_secret_key
npm start
