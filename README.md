Here’s a **polished and professional README.md** version, fully ready for your GitHub repository — formatted properly with your `.env` details, modern layout, and consistent Markdown styling.

````{"id":"53291","variant":"standard","title":"README for Code Editor Platform"}
# 💻 Code Editor Platform

A **full-stack web application** featuring a real-time code editor with collaborative capabilities, secure authentication, and project management tools.

---

## 🌟 Features

### 🖥 Frontend
- **Code Editor** — Monaco Editor integration with syntax highlighting  
- **Real-time Collaboration** — Multiple users can code together simultaneously  
- **Project Management** — Create, edit, and manage multiple coding projects  
- **Responsive UI** — Optimized for both desktop and tablet devices  
- **User Authentication** — Secure login and signup functionality  

### ⚙️ Backend
- **RESTful API** — Built using Express.js  
- **Authentication** — JWT-based authentication system  
- **Database** — MongoDB with Mongoose ODM  
- **WebSockets** — For live collaboration and code updates  

---

## 🛠 Tech Stack

### Frontend
- React 19  
- React Router v7  
- Monaco Editor  
- Axios (HTTP client)  
- Lucide React (icons)  
- CSS Modules (styling)

### Backend
- Node.js with Express.js  
- MongoDB + Mongoose  
- JSON Web Tokens (JWT)  
- Bcrypt (password hashing)  
- CORS enabled  
- Nodemon (development server)

---

## 📁 Project Structure

```
CipherSchools/
├── backend/                 
│   ├── Config/              
│   ├── Controllers/         
│   │   ├── ApiController.js 
│   │   ├── Auth.js          
│   │   └── AuthMiddelware.js 
│   ├── Models/              
│   │   └── User.js          
│   ├── Routes/              
│   │   ├── ApiRoute.js      
│   │   └── AuthRoute.js     
│   ├── ConnectDb.js         
│   └── Server.js            
│
└── frontend/                
    ├── public/              
    └── src/
        ├── components/      
        │   ├── Header.js    
        │   ├── Dashboard.js 
        │   ├── IDE.js       
        │   └── CodeEditor.js 
        ├── App.js           
        └── index.js         
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or later)
- **npm** or **yarn**
- **MongoDB** (local instance or cloud)

---

### 🧩 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following:
   ```env
   PORT=3001
   MONGO_URL=mongodb://127.0.0.1:27017/IDE
   JWT_SECRET=secretkey
   COOKIE_NAME=token
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

---

### 🎨 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

4. Start the frontend server:
   ```bash
   npm start
   ```

5. Open the application in your browser at:  
   👉 [http://localhost:3000](http://localhost:3000)

---

## 📚 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login existing user |
| GET  | `/api/auth/me` | Get current logged-in user (Protected) |

### 🗂 Projects
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/projects` | Get all projects (Protected) |
| POST | `/api/projects` | Create a new project (Protected) |
| GET | `/api/projects/:id` | Get a specific project (Protected) |
| PUT | `/api/projects/:id` | Update project details (Protected) |
| DELETE | `/api/projects/:id` | Delete a project (Protected) |

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new feature branch  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes  
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push the branch  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request 🎉

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)  
- [React](https://react.dev/)  
- [Express.js](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/)

---

**Made with ❤️ by Mansi Chaudhary**
````

Would you like me to add **badges** (for Node, React, MongoDB, etc.) at the top of the README to make it look more professional on GitHub?
