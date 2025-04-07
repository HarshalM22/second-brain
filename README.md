# 🧠 Second Brain – Note Organization Web App

A **Second Brain** web app to capture, organize, and retrieve your ideas and knowledge using a beautifully simple interface. Built using **React** for the frontend and **Node.js** (Express) for the backend.

---

## ✨ Features

- 📝 Create, edit, and delete notes
- 🔍 Full-text search functionality
- 🗃 Organize notes with tags and folders
- 🔄 Auto-save and real-time syncing
- 🧠 Linked notes and bidirectional references
- 🔐 User authentication (JWT-based)
- 📁 Markdown support with live preview

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Context API
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Others**: Markdown-it, dotenv

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/second-brain-app.git
cd second-brain-app
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Add your MongoDB URI and JWT_SECRET to .env
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🔐 Environment Variables (server/.env)

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/secondbrain
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## 🧪 Running Tests

```bash
# Backend
cd server
npm test

# Frontend
cd client
npm test
```

---

## 📁 Folder Structure

```
second-brain-app/
├── client/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── context/
├── server/           # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
```

---

## 🚀 Future Enhancements

- AI-powered note suggestions
- Graph view of linked notes
- Mobile app version
- Integration with Notion/Google Drive

---

## 📄 License

MIT License. See `LICENSE` file for details.

---

## 👨‍💻 Author

Made with ❤️ by [Your Name](https://github.com/yourusername)
