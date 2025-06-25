# 🚀 DevScoop – A Developer-Focused Blogging Platform

**DevScoop** is a full-stack blogging platform tailored for developers. It empowers users to write, read, update, and explore technical blogs. Users can also comment, save favorites to a wishlist, and manage their content—all with a responsive and elegant UI. It uses Firebase authentication and secure backend integration using Firebase ID tokens.

---

## 🔗 Live Site

🌐 [Live Demo](https://devscoop-509dd.web.app/)  
_← Replace with your deployed project link_

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- React Router DOM
- Firebase Authentication
- Axios
- Lottie React
- Framer Motion
- Tailwind CSS

### 🔸 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Firebase Admin SDK
- JWT (via Firebase ID Token verification)

---

## ✨ Features

- 🔐 **User Authentication**
  - Google sign-in with Firebase
  - Secure routes using Firebase ID tokens

- 📝 **Blog Management**
  - Add, update, and delete personal blogs
  - View all blogs in a beautiful card layout
  - Rich text formatting and full blog details

- 💬 **Comment System**
  - Comment on blog posts
  - Comments include user's name, email & photo
  - Real-time comment display

- 💖 **Wishlist**
  - Save blogs to revisit later
  - Wishlist protected by Firebase authentication
  - Delete items from wishlist securely

- 🎨 **Modern UI/UX**
  - Fully responsive (mobile-first design)
  - Lottie animations
  - Framer Motion transitions
  - Developer-focused aesthetic

---

## 🔒 Security

- 🔐 Firebase Authentication used on client
- 🔐 Firebase Admin SDK used on backend to verify ID tokens
- 🔒 Protected API endpoints using Bearer Token
- 🔒 Only blog owners can update/delete their own blogs

---

## 🧾 API Endpoints (Protected with Firebase Token)

| Method | Endpoint                     | Description              |
|--------|------------------------------|--------------------------|
| GET    | `/blogs`                     | Get all blogs            |
| GET    | `/blogs/:id`                 | Get blog details         |
| POST   | `/blogs`                     | Add a new blog           |
| PUT    | `/blogs/:id`                 | Update a blog            |
| DELETE | `/blogs/:id`                 | Delete a blog            |
| GET    | `/comments/:blogId`          | Fetch blog comments      |
| POST   | `/comments`                  | Submit a comment         |
| GET    | `/wishlist`                  | Get user wishlist        |
| POST   | `/wishlist`                  | Add to wishlist          |
| DELETE | `/wishlist/:id`              | Remove from wishlist     |

---

## 📁 Folder Structure


---

## 🧪 Tested Features

- ✅ Firebase Authentication works
- ✅ Blog Add / Update / Delete functional
- ✅ Comments stored and retrieved successfully
- ✅ Wishlist working with secure Firebase token
- ✅ Mobile responsiveness tested
- ✅ Protected routes only accessible by authorized users
- ✅ Toast notifications for success & errors

---

## 📸 Screenshots

> _(Add your project screenshots here)_  
> You can include:
> - Homepage
> - Add Blog Form
> - Blog Details with Comments
> - Wishlist Page

---

## 🔮 Future Improvements

- 🔍 Search & Filter blogs by tag/category
- 💬 Nested comment replies
- 🧑‍💼 User profile with blog history
- 📊 Blog view counters / likes
- 🌐 Dark mode toggle
- 📁 Image uploads via cloud storage

---

## 👨‍💻 Developer

**Khayer Hossain**  
📧 Email: your@email.com  
🔗 GitHub: [@yourgithub](https://github.com/dashboard)

---

## 📄 License

This project is licensed under the **MIT License** – you're free to use, modify, and distribute it.

---

## 🚀 Deployment Tips

- Use **Vercel** or **Netlify** for frontend
- Use **Render** or **Railway** for backend
- Make sure to add Firebase credentials and MongoDB URI in `.env` (both client & server)

