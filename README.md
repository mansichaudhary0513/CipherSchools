# Code Prev
A full-stack web application featuring a **real-time code editor** with **collaborative capabilities**, **secure authentication**, and **project management tools**.

---

## ✨ Features

### Frontend

* **Code Editor**: **Monaco Editor** integration with syntax highlighting for various languages.
* **Real-time Collaboration**: Multiple users can code together simultaneously with live updates (powered by WebSockets).
* **Project Management**: Create, edit, and manage multiple personal coding projects.
* **Responsive UI**: Optimized for desktop and tablet devices using modern CSS practices.
* **User Authentication**: Secure login and signup functionality.

### Backend

* **RESTful API**: Built using **Express.js** for handling all client requests.
* **Authentication**: Secure **JWT** (JSON Web Token) based authentication system.
* **Database**: **MongoDB** with **Mongoose ODM** for flexible and efficient data management.
* **WebSockets**: Utilized for live collaboration and instantaneous project updates.

---

## 💻 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React 19, React Router v7** | Modern JavaScript library and routing for a fast single-page application. |
| | **Monaco Editor** | The core code editing component. |
| | **Axios, Lucide React** | HTTP client for API calls and high-quality, customizable icons. |
| **Backend** | **Node.js with Express.js** | Fast, unopinionated, minimal web framework for the backend. |
| | **MongoDB + Mongoose** | NoSQL database and an elegant MongoDB object modeling tool. |
| | **JSON Web Tokens (JWT), Bcrypt** | For secure, stateless authentication and password hashing. |
| | **CORS, Nodemon** | Cross-Origin Resource Sharing and a development server tool. |

---

## 📂 Project Structure

The project is divided into two main parts: `backend` (Express.js API) and `frontend` (React application).
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


---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (v16 or later)
* **npm** or **yarn**
* **MongoDB** (a local instance or a cloud service like MongoDB Atlas)

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a file named `.env` in the `backend` directory and add your configuration variables:
    ```env
    PORT=3001
    MONGO_URL=mongodb://127.0.0.1:27017/IDE
    JWT_SECRET=secretkey
    COOKIE_NAME=token
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3001`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a file named `.env` in the `frontend` directory:
    ```env
    REACT_APP_API_URL=http://localhost:3001
    ```
4.  Start the frontend server:
    ```bash
    npm start
    ```
    The application should open automatically in your browser at `http://localhost:3000`.

---

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user. |
| **POST** | `/api/auth/login` | Log in an existing user. |
| **GET** | `/api/auth/me` | Get current logged-in user details (Protected). |

### Projects

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/projects` | Get all projects for the logged-in user (Protected). |
| **POST** | `/api/projects` | Create a new project (Protected). |
| **GET** | `/api/projects/:id` | Get a specific project by ID (Protected). |
| **PUT** | `/api/projects/:id` | Update project details (Protected). |
| **DELETE**| `/api/projects/:id` | Delete a project (Protected). |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the repository.
2.  Create your feature branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  Commit your changes:
    ```bash
    git commit -m "Add some AmazingFeature"
    ```
4.  Push the branch:
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  Open a Pull Request.

---

## 📄 License

Distributed under the **ISC License**. See the `LICENSE` file for more information.

---

## 🎉 Acknowledgments

* [Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [React](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)

Made with ❤️ by [Mansi Chaudhary]
